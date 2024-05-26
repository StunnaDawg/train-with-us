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
    <View className="flex flex-row justify-end mt-2 mr-4 ml-36">
      <View>
        <View className="rounded-2xl bg-blue-500/80 p-2">
          <Text className="font-bold text-sm">{message}</Text>
        </View>
      </View>
    </View>
  )
}

type MatchesMessageProps = {
  message: string | null
  name: string | null | undefined
}

const MatchesMessage = ({ message, name }: MatchesMessageProps) => {
  return (
    <View className="flex flex-row justify-start mt-2 ml-4 mr-36">
      <View>
        <View className="rounded-2xl bg-slate-400/60 p-2">
          <Text className=" text-sm text-black font-bold">{message}</Text>
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
    <SafeAreaView className="flex-1 bg-slate-300/05">
      <View className="flex flex-row justify-center ">
        <View className="items-center">
          <View className="mb-2">
            <SinglePic
              size={55}
              avatarRadius={100}
              noAvatarRadius={100}
              item={currentUser?.profile_pic}
            />
          </View>
          <Text className="font-bold text-xl mb-1">
            {currentUser?.first_name}
          </Text>
        </View>
      </View>

      <KeyboardAvoidingView
        className="flex-1 border-transparent bg-white rounded-3xl mx-2"
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 0}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <FlatList
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
              flexGrow: 1,
              justifyContent: "flex-end",
            }}
            inverted={true}
            className="mx-1"
            data={serverMessages}
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
      </KeyboardAvoidingView>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 0}
      >
        <View className="flex flex-row mx-1 p-2 bg-slate-300/05 items-center">
          <TextInput
            placeholder="Send a Message"
            className="flex-1 border bg-white rounded-full h-8 w-64 p-2"
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
