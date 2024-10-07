import {
  View,
  Text,
  SafeAreaView,
  TextInput,
  Pressable,
  ScrollView,
  TouchableOpacity,
  Switch,
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
import {
  Communities,
  CommunityMember,
  Events,
} from "../../@types/supabaseTypes"
import * as FileSystem from "expo-file-system"
import { decode } from "base64-arraybuffer"
import getCommunityMembersType from "../../supabaseFunctions/getFuncs/getCommunityMemberArrayType"
import NewPhoto from "../../components/NewPhoto"
import getCommunityEvents from "../../supabaseFunctions/getFuncs/getCommunityEvent"
import { FontAwesome6 } from "@expo/vector-icons"

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
  const [eventSwitch, setEventSwitch] = useState<boolean>(false)
  const [communityMembers, setCommunityMembers] = useState<
    CommunityMember[] | null
  >(null)
  const [events, setEvents] = useState<Events[] | null>(null)
  const [eventSelected, setEventSelected] = useState<number | null>(null)
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

    if (newsPic.uri) {
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
        event_link: eventSelected ? eventSelected : null,
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
    <SafeAreaView className="flex-1 bg-gray-900">
      <View className="flex-row justify-between items-center px-4 py-3 ">
        <BackButton size={24} colour="white" />
        <Text className="text-xl font-bold text-white">Create News Post</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView className="flex-1 px-4 py-6">
        <View className="space-y-6">
          <View>
            <Text className="text-lg text-white font-bold mb-2">Title</Text>
            <TextInput
              className="bg-white px-4 py-3 rounded-lg"
              onChangeText={(text) => setTitle(text)}
              placeholder="Enter title"
              placeholderTextColor="#9CA3AF"
            />
          </View>

          <View>
            <Text className="text-lg text-white font-bold mb-2">Content</Text>
            <TextInput
              multiline={true}
              numberOfLines={6}
              onChangeText={(text) => setContent(text)}
              className="bg-white px-4 py-3 rounded-lg"
              textAlignVertical="top"
              placeholder="Enter content"
              placeholderTextColor="#9CA3AF"
            />
          </View>

          <View>
            <Text className="text-lg text-white font-bold mb-2">
              Link an Event
            </Text>
            <View className="flex-row items-center">
              <Switch
                value={eventSwitch}
                onValueChange={(value) => {
                  setEventSwitch(value)
                  if (!value) setEventSelected(null)
                  if (value && events === null) {
                    getCommunityEvents(setLoading, communityId, setEvents)
                  }
                }}
              />
              <Text className="text-white ml-2">
                {eventSwitch
                  ? "Event linking enabled"
                  : "Event linking disabled"}
              </Text>
            </View>
          </View>

          {eventSwitch && events && (
            <View>
              <Text className="text-lg text-white font-bold mb-2">
                Select an Event
              </Text>
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {events.map((event) => (
                  <TouchableOpacity
                    key={event.id}
                    onPress={() => setEventSelected(event.id)}
                    className={`mr-4 p-3 rounded-lg ${
                      eventSelected === event.id ? "bg-blue-600" : "bg-gray-700"
                    }`}
                  >
                    <Text className="text-white font-semibold">
                      {event.event_title}
                    </Text>
                    {eventSelected === event.id && (
                      <FontAwesome6
                        name="check"
                        size={16}
                        color="white"
                        style={{ marginTop: 4 }}
                      />
                    )}
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>
          )}

          <View>
            <Text className="text-lg text-white font-bold mb-2">Add Photo</Text>
            <NewPhoto
              heightProp={200}
              widthProp={200}
              setProfilePic={setNewsPic}
            />
          </View>
        </View>
      </ScrollView>

      <View className="px-4 py-3 ">
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
                  style: "cancel",
                },
              ],
            })
          }
          className="bg-blue-600 p-4 rounded-lg active:bg-blue-700"
        >
          <Text className="text-white text-center text-lg font-bold">
            Create News Post
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

export default CreateNewsPost
