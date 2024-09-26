import {
  View,
  Text,
  SafeAreaView,
  TextInput,
  Pressable,
  ScrollView,
  TouchableOpacity,
} from "react-native"
import React, { useEffect, useState } from "react"
import BackButton from "../../components/BackButton"
import supabase from "../../../lib/supabase"
import showAlert from "../../utilFunctions/showAlert"
import { useAuth } from "../../supabaseFunctions/authcontext"
import { NavigationType, RootStackParamList } from "../../@types/navigation"
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native"
import showAlertFunc from "../../utilFunctions/showAlertFunc"
import * as ImagePicker from "expo-image-picker"
import { FunctionsHttpError } from "@supabase/supabase-js"
import { Communities, CommunityMember } from "../../@types/supabaseTypes"
import * as FileSystem from "expo-file-system"
import { decode } from "base64-arraybuffer"
import getCommunityMembersType from "../../supabaseFunctions/getFuncs/getCommunityMemberArrayType"
import NewPhoto from "../../components/NewPhoto"

const sendNotification = async (
  token: string,
  title: string,
  body: string,
  community: Communities
) => {
  const { data, error } = await supabase.functions.invoke("push", {
    body: {
      token,
      titleWords: title,
      bodyWords: `${community.community_title} says ${body}`,
      data: { type: "news", community: community },
    },
  })

  if (error && error instanceof FunctionsHttpError) {
    const errorMessage = await error.context.json()
    console.log("Function returned an error", errorMessage)
  }

  console.log("Notification sent:", data)
}

const sendChannelNotification = async (
  communityId: number,
  titleWords: string,
  bodyWords: string
) => {
  const { data, error } = await supabase
    .from("community_members")
    .select("expo_push_token")
    .eq("community_id", communityId)

  if (error) throw error

  const tokens = data
    .filter((member) => member.expo_push_token !== null)
    .map((member) => member.expo_push_token)

  const { data: communityData, error: fetchError } = await supabase
    .from("communities")
    .select("*")
    .eq("id", communityId)
    .select()

  if (fetchError) throw fetchError

  const community = communityData[0]

  console.log("Sending notification to", tokens)

  tokens.forEach(async (token) => {
    await sendNotification(token, titleWords, bodyWords, community)
  })
}

const CreateNewsPost = () => {
  const { userProfile } = useAuth()
  const [tokens, setTokens] = useState<string[] | null>(null)
  const [newsPic, setNewsPic] = useState<ImagePicker.ImagePickerAsset>(
    {} as ImagePicker.ImagePickerAsset
  )
  const [loading, setLoading] = useState<boolean>(false)
  const [title, setTitle] = useState<string>("")
  const [content, setContent] = useState<string>("")
  const [communityMembers, setCommunityMembers] = useState<
    CommunityMember[] | null
  >(null)
  const route = useRoute<RouteProp<RootStackParamList, "CreateNewsPost">>()
  const communityId = route.params.communityId
  const communityTitle = route.params.communityTitle
  const navigation = useNavigation<NavigationType>()

  useEffect(() => {
    getCommunityMembersType(setLoading, communityId, setCommunityMembers)
  }, [communityId])

  useEffect(() => {
    if (communityMembers) {
      const validTokens = communityMembers
        .map((member) => member.expo_push_token)
        .filter((token): token is string => token !== null)
      setTokens(validTokens)
    }
  }, [communityMembers])

  const handleCreateNewsPost = async () => {
    if (title === "" || content === "" || !userProfile) {
      showAlert({
        title: "Error creating news post",
        message: "Please fill out all fields before creating a news post.",
        buttonText: "OK",
      })
      return
    }

    let filePath: string | null = null

    if (newsPic) {
      const base64 = await FileSystem.readAsStringAsync(newsPic.uri, {
        encoding: "base64",
      })
      filePath = `news/${communityId}/${new Date().getTime()}.${
        newsPic.type === "image"
      }`
      const contentType = "image/png"
      await supabase.storage.from("photos").upload(filePath, decode(base64), {
        contentType: contentType,
      })
    }

    const lastName = userProfile.last_name ? userProfile.last_name : ""
    const createdAt = new Date().toISOString()
    const { error } = await supabase.from("news_posts").insert([
      {
        title: title,
        content: content,
        created_at: createdAt,
        community_id: communityId,
        author: userProfile.id,
        author_name: userProfile.first_name + " " + lastName,
        news_image: filePath ? filePath : null,
      },
    ])

    if (error) {
      showAlert({
        title: "Error creating news post",
        message: "There was an error creating the news post. Please try again.",
        buttonText: "OK",
      })
      console.error("Error creating news post:", error)
      return
    }

    showAlert({
      title: "News post created",
      message: "You have successfully created a news post.",
      buttonText: "OK",
    })

    if (tokens !== null) {
      await sendChannelNotification(communityId, communityTitle, title)
    }

    navigation.goBack()
  }

  return (
    <SafeAreaView className="flex-1 bg-primary-900">
      <View className="flex flex-row justify-between items-center mx-1">
        <BackButton size={24} colour="white" />
        <View>
          <Text className="text-xl font-bold text-white">Create News Post</Text>
        </View>

        <View />
      </View>

      <ScrollView>
        <View className="mx-2">
          <Text className="text-lg text-white font-bold">Title</Text>
          <View>
            <TextInput
              className="h-8 px-1 bg-white border-4 rounded-md"
              onChangeText={(text) => setTitle(text)}
            />
          </View>
        </View>

        <View className="mx-2">
          <Text className="text-lg text-white font-bold">Content</Text>
          <View className="border rounded-md">
            <TextInput
              multiline={true}
              onChangeText={(text) => setContent(text)}
              className="h-56 bg-white border-4 px-1 rounded-md"
            />
          </View>
        </View>

        <View>
          <NewPhoto
            heightProp={200}
            widthProp={200}
            setProfilePic={setNewsPic}
          />
        </View>
      </ScrollView>
      <View className="flex flex-row justify-center">
        <TouchableOpacity
          onPress={() =>
            showAlertFunc({
              title: "Create News Post",
              message: "Are you sure you want to create this news post?",
              buttons: [
                {
                  text: "Yes",
                  onPress: () => handleCreateNewsPost(),
                  style: "default",
                },
                {
                  text: "No",
                  onPress: () => console.log("Cancel Pressed"),
                  style: "destructive",
                },
              ],
            })
          }
          className={`bg-white p-2 rounded-md mx-2 mt-2 w-56`}
        >
          <Text className="text-black text-center text-xl font-bold">
            Create News Post
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

export default CreateNewsPost
