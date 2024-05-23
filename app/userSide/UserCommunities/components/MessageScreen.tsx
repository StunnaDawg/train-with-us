import React, { useEffect, useState } from "react"
import {
  View,
  Text,
  TextInput,
  Pressable,
  KeyboardAvoidingView,
  Platform,
  FlatList,
  TouchableWithoutFeedback,
  Keyboard,
  ActivityIndicator,
  SafeAreaView,
} from "react-native"
import SinglePic from "../../../components/SinglePic"
import { RootStackParamList } from "../../../@types/navigation"
import { RouteProp, useRoute } from "@react-navigation/native"
import { get } from "mongoose"
import getAllUserChatSessions from "../../../supabaseFunctions/getFuncs/getAllUserChatSessions"
import { Messages, Profile } from "../../../@types/supabaseTypes"
import getChatSessionMessages from "../../../supabaseFunctions/getFuncs/getChatSessionMessages"
import { useAuth } from "../../../supabaseFunctions/authcontext"
import sendMessage from "../../../supabaseFunctions/addFuncs/sendMessage"
import supabase from "../../../../lib/supabase"
import useCurrentUser from "../../../supabaseFunctions/getFuncs/useCurrentUser"
import sendNotification from "../../../utilFunctions/sendNotification"
import upsertChatSession from "../../../supabaseFunctions/updateFuncs/updateChatSession"

type UserMessage = {
  message: string | null
}

const UserMessage = ({ message }: UserMessage) => {
  return (
    <View className="flex flex-row justify-end mt-2 mx-1">
      <View>
        <View className="rounded-2xl border bg-blue-500 p-2">
          <Text className="text-lg">{message}</Text>
        </View>
        <View className="flex flex-row justify-end"></View>
      </View>
    </View>
  )
}

type MatchesMessageProps = {
  message: string | null
  name: string | null | undefined
}

const MatchesMessage = ({ message, name }: MatchesMessageProps) => {
  const [loading, setLoading] = useState<boolean>(false)

  return (
    <View>
      <View className="flex flex-row justify-start items-center m-1">
        <View>
          <View>
            <Text className="text-start font-semibold text-lg">
              {name ? name : "Name"}
            </Text>
          </View>
          <View className="bg-slate-300 border-2 rounded-2xl p-2 max-w-3/4 shadow">
            <Text className="text-lg">{message}</Text>
          </View>
        </View>
      </View>
    </View>
  )
}

const MessageScreen = () => {
  const route = useRoute<RouteProp<RootStackParamList, "MessagingScreen">>()
  const chatSession = route.params.chatSession

  const [serverMessages, setServerMessages] = useState<Messages[] | null>([])
  const [messageToSend, setMessageToSend] = useState("")
  const [currentUser, setCurrentUser] = useState<Profile | null>(null)
  const [imageFiles, setImageFiles] = useState<string[] | null | undefined>([])
  const { user } = useAuth()

  const otherUserId =
    chatSession.user1 === user?.id ? chatSession.user2 : chatSession.user1

  useEffect(() => {
    if (!user || !otherUserId) return
    useCurrentUser(otherUserId, setCurrentUser)
  }, [user, otherUserId])

  useEffect(() => {
    if (currentUser?.photos_url) {
      setImageFiles(currentUser?.photos_url)
    }
  }, [currentUser])

  useEffect(() => {
    const subscription = supabase
      .channel("messages")
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "messages",
          filter: `chat_session=eq.${chatSession.id}`,
        },
        (payload) => {
          getChatSessionMessages(chatSession.id, setServerMessages)
        }
      )
      .subscribe()

    return () => {
      subscription.unsubscribe()
    }
  }, [chatSession.id])

  const sendMessageAction = async () => {
    if (messageToSend.trim().length === 0 || !user?.id) {
      return
    }
    await sendMessage(messageToSend, user?.id, chatSession.id)
    setMessageToSend("")
    await upsertChatSession(chatSession.id, messageToSend)
    getChatSessionMessages(chatSession.id, setServerMessages)

    if (currentUser?.expo_push_token) {
      sendNotification(
        currentUser?.expo_push_token,
        `Message from ${currentUser?.first_name}`,
        messageToSend
      )
    }
  }

  useEffect(() => {
    getChatSessionMessages(chatSession.id, setServerMessages)
  }, [chatSession])

  useEffect(() => {
    if (!serverMessages) return
    console.log(serverMessages)
  }, [serverMessages])

  return (
    <SafeAreaView className="flex-1">
      <View className="flex flex-row justify-center border-b">
        <View className="items-center">
          <View className="mb-2">
            <SinglePic
              size={55}
              avatarRadius={100}
              noAvatarRadius={100}
              item={currentUser?.profile_pic}
            />
          </View>
          <Text className="font-bold text-md">{currentUser?.first_name}</Text>
        </View>
      </View>

      <KeyboardAvoidingView
        className="flex-1"
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 5 : 0}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <FlatList
            className="m-2"
            data={serverMessages}
            inverted={true}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) =>
              item.sender === user?.id ? (
                <UserMessage message={item.message} />
              ) : (
                <MatchesMessage
                  name={currentUser?.first_name}
                  message={item.message}
                />
              )
            }
          />
        </TouchableWithoutFeedback>

        <View className="flex flex-row mx-1 items-center">
          <TextInput
            placeholder="Send a Message"
            className="flex-1 border rounded-xl h-8 w-64 p-2"
            value={messageToSend}
            onChangeText={setMessageToSend}
          />
          <Pressable className="mx-2" onPress={() => sendMessageAction()}>
            <Text className="text-xl font-bold">Send</Text>
          </Pressable>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

export default MessageScreen
