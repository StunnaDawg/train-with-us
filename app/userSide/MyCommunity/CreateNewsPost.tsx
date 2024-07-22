import { View, Text, SafeAreaView, TextInput, Pressable } from "react-native"
import React, { useState } from "react"
import BackButton from "../../components/BackButton"
import supabase from "../../../lib/supabase"
import showAlert from "../../utilFunctions/showAlert"
import { useAuth } from "../../supabaseFunctions/authcontext"
import { NavigationType, RootStackParamList } from "../../@types/navigation"
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native"
import showAlertFunc from "../../utilFunctions/showAlertFunc"
import { FunctionsHttpError } from "@supabase/supabase-js"

const sendNewsNotification = async (
  communityId: number,
  communityTitle: string,
  title: string,
  body: string,
  tokens: string[]
) => {
  console.log("Sending notification to", tokens)

  const sendNotification = async (token: string) => {
    const { data, error } = await supabase.functions.invoke("push", {
      body: {
        token,
        titleWords: title,
        bodyWords: body,
        data: { communityId, communityTitle, type: "community_news" },
      },
    })

    if (error && error instanceof FunctionsHttpError) {
      const errorMessage = await error.context.json()
      console.log("Function returned an error", errorMessage)
    } else {
      console.log("Notification sent:", data)
    }
  }

  for (const token of tokens) {
    await sendNotification(token)
  }
}

const CreateNewsPost = () => {
  const { userProfile } = useAuth()
  const [title, setTitle] = useState<string>("")
  const [content, setContent] = useState<string>("")
  const [createButtonPressed, setCreateButtonPressed] = useState<boolean>(false)
  const route = useRoute<RouteProp<RootStackParamList, "CreateNewsPost">>()
  const communityId = route.params.communityId
  const communityTitle = route.params.communityTitle
  const navigation = useNavigation<NavigationType>()

  const handleCreateNewsPost = async () => {
    if (title === "" || content === "" || !userProfile) {
      showAlert({
        title: "Error creating news post",
        message: "Please fill out all fields before creating a news post.",
        buttonText: "OK",
      })
      return
    }

    console.log("Creating news post", title, content, userProfile, communityId)
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

      <View className="flex flex-row justify-center">
        <Pressable
          onPressIn={() => setCreateButtonPressed(true)}
          onPressOut={() => setCreateButtonPressed(false)}
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
          className={`${
            createButtonPressed ? "opacity-80" : "bg-slate-500"
          } p-2 rounded-md mx-2 mt-2 w-48`}
        >
          <Text className="text-black text-center text-xl font-bold">
            Create News Post
          </Text>
        </Pressable>
      </View>
    </SafeAreaView>
  )
}

export default CreateNewsPost
