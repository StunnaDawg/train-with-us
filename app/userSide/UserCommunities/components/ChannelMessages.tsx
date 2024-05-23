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
import {
  CommunityChannelMessages,
  Messages,
  Profile,
} from "../../../@types/supabaseTypes"
import { useAuth } from "../../../supabaseFunctions/authcontext"
import sendMessage from "../../../supabaseFunctions/addFuncs/sendMessage"
import supabase from "../../../../lib/supabase"
import useCurrentUser from "../../../supabaseFunctions/getFuncs/useCurrentUser"
import getChannelSessionMessages from "../../../supabaseFunctions/getFuncs/getChannelMessages"
import sendChannelMessage from "../../../supabaseFunctions/addFuncs/sendChannelMessage"

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

type OthersMessageProps = {
  message: string | null
}

const OthersMessage = ({ message }: OthersMessageProps) => {
  const [loading, setLoading] = useState<boolean>(false)

  return (
    <View>
      <View className="mx-3">
        <Text className="font-bold">
          {!loading ? "Jordan" : <ActivityIndicator />}
        </Text>
      </View>
      <View className="flex flex-row justify-start flex-wrap mt-2 items-center m-1 my-2">
        {/* <SinglePic
          size={55}
          avatarRadius={100}
          noAvatarRadius={100}
        /> */}
        <View className="rounded-2xl border mx-1 bg-slate-200 p-2">
          <Text className="text-xs">{message}</Text>
        </View>
      </View>
    </View>
  )
}

const ChannelMessageScreen = () => {
  const route = useRoute<RouteProp<RootStackParamList, "ChannelScreen">>()
  const channel = route.params.channelId

  const [serverMessages, setServerMessages] = useState<
    CommunityChannelMessages[] | null
  >([])
  const [messageToSend, setMessageToSend] = useState("")
  const { user } = useAuth()

  useEffect(() => {
    const subscription = supabase
      .channel("community_channel_messages")
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "community_channel_messages",
          filter: `chat_session=eq.${channel.id}`,
        },
        (payload) => {
          getChannelSessionMessages(channel.id, setServerMessages)
        }
      )
      .subscribe()

    return () => {
      subscription.unsubscribe()
    }
  }, [channel.id])

  const sendMessageAction = async () => {
    if (messageToSend.trim().length === 0 || !user?.id) {
      return
    }
    await sendChannelMessage(messageToSend, user?.id, channel.id)
    setMessageToSend("")
    getChannelSessionMessages(channel.id, setServerMessages)
  }

  useEffect(() => {
    getChannelSessionMessages(channel.id, setServerMessages)
  }, [channel])

  useEffect(() => {
    if (!serverMessages) return
    console.log(serverMessages)
  }, [serverMessages])

  return (
    <SafeAreaView className="flex-1">
      <View className="flex flex-row justify-center border-b">
        <View className="items-center">
          <Text className="font-bold text-md">{channel.channel_title}</Text>
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
              item.sender_id === user?.id ? (
                <UserMessage message={item.mesage} />
              ) : (
                <OthersMessage message={item.mesage} />
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

export default ChannelMessageScreen
