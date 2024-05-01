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
import { Messages } from "../../../@types/supabaseTypes"
import getChatSessionMessages from "../../../supabaseFunctions/getFuncs/getChatSessionMessages"
import { useAuth } from "../../../supabaseFunctions/authcontext"
import sendMessage from "../../../supabaseFunctions/addFuncs/sendMessage"
import supabase from "../../../../lib/supabase"

type UserMessage = {
  message: string | null
}

const UserMessage = ({ message }: UserMessage) => {
  return (
    <View className="flex flex-row justify-end mt-2 mx-1">
      <View>
        <View className="rounded-2xl border bg-blue p-2">
          <Text className="text-xs">{message}</Text>
        </View>
        <View className="flex flex-row justify-end"></View>
      </View>
    </View>
  )
}

type MatchesMessageProps = {
  message: string | null
}

const MatchesMessage = ({ message }: MatchesMessageProps) => {
  const [loading, setLoading] = useState<boolean>(false)

  return (
    <View>
      <View className="mx-3">
        <Text className="font-bold">
          {!loading ? "Jordan" : <ActivityIndicator />}
        </Text>
      </View>
      <View className="flex flex-row justify-start flex-wrap mt-2 items-center m-1 my-2">
        <SinglePic size={30} avatarRadius={150} noAvatarRadius={10} />
        <View className="rounded-2xl border mx-1 bg-slate-200 p-2">
          <Text className="text-xs">{message}</Text>
        </View>
      </View>
    </View>
  )
}

const MessageScreen = () => {
  const route = useRoute<RouteProp<RootStackParamList, "MessagingScreen">>()
  const chatId = route.params.chatId
  const { user } = useAuth()

  const [serverMessages, setServerMessages] = useState<Messages[] | null>([])

  const [messageToSend, setMessageToSend] = useState("")

  supabase
    .channel("messages")
    .on(
      "postgres_changes",
      { event: "INSERT", schema: "public", table: "messages" },
      (payload) => {
        getChatSessionMessages(chatId, setServerMessages)
      }
    )
    .subscribe()

  const sendMessageAction = () => {
    if (messageToSend.trim().length === 0 || !user?.id) {
      return
    }
    sendMessage(messageToSend, user?.id, chatId)
    setMessageToSend("")
  }

  useEffect(() => {
    getChatSessionMessages(chatId, setServerMessages)
  }, [chatId])

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
              item={imageFiles?.[0]}
            />
          </View>
          <Text className="font-bold text-md">Jordan Forbes</Text>
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
            keyExtractor={(item) => item.id}
            renderItem={({ item }) =>
              item.sender === user?.id ? (
                <UserMessage message={item.message} />
              ) : (
                <MatchesMessage message={item.message} />
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
