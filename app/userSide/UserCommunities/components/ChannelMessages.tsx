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
import { NavigationType, RootStackParamList } from "../../../@types/navigation"
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native"
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
import SinglePicCommunity from "../../../components/SinglePicCommunity"
import upsertCommunitySession from "../../../supabaseFunctions/updateFuncs/updateCommunitySession"

type UserMessage = {
  message: string | null
}

const UserMessage = ({ message }: UserMessage) => {
  return (
    <View className="flex flex-row justify-end mt-2 mr-4 mb-1 ml-36">
      <View>
        <View className="rounded-2xl bg-blue-500/80 p-2">
          <Text className="font-bold text-sm">{message}</Text>
        </View>
      </View>
    </View>
  )
}

type OthersMessageProps = {
  message: string | null
  name: string | null | undefined
  id: string | null
}

const OthersMessage = ({ message, name, id }: OthersMessageProps) => {
  const navigation = useNavigation<NavigationType>()

  return (
    <Pressable
      onPress={() => {
        navigation.navigate("ViewRequestProfile", {
          userId: id,
        })
      }}
      className="mt-2 mb-1"
    >
      <Text className="font-bold mb-1">{name}</Text>
      <View className="flex flex-row justify-start ml-2 mr-36">
        <View>
          <View className="rounded-2xl bg-slate-400/60 p-2">
            <Text className="font-bold text-sm">{message}</Text>
          </View>
        </View>
      </View>
    </Pressable>
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

  const sendMessageAction = async () => {
    if (messageToSend.trim().length === 0 || !user?.id) {
      return
    }
    await sendChannelMessage(messageToSend, user?.id, channel.id)
    await upsertCommunitySession(channel.id, messageToSend)
    setMessageToSend("")
    getChannelSessionMessages(channel.id, setServerMessages)
  }

  useEffect(() => {
    console.log("Channel id: ", `channel_id=eq.${channel.id}`)
    getChannelSessionMessages(channel.id, setServerMessages)
    const channelSubscription = supabase
      .channel("schema-db-changes")
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "community_channel_messages",
          filter: `channel_id=eq.${channel.id}`,
        },
        (payload) => {
          console.log("Message received: ", payload)
          getChannelSessionMessages(channel.id, setServerMessages)
        }
      )
      .subscribe((status, error) => {
        console.log("Subscription status:", status, error)
      })

    return () => {
      supabase.removeChannel(channelSubscription)
    }
  }, [channel])

  return (
    <SafeAreaView className="flex-1">
      <View className="flex flex-row justify-center ">
        <View className="items-center">
          <View className="mb-2">
            <SinglePicCommunity
              size={55}
              avatarRadius={100}
              noAvatarRadius={100}
              item={channel.channel_pic}
            />
          </View>
          <Text className="font-bold text-xl mb-1">
            {channel.channel_title}
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
            className="mx-1"
            data={serverMessages}
            inverted={true}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) =>
              item.sender_id === user?.id ? (
                <UserMessage message={item.mesage} />
              ) : (
                <OthersMessage
                  message={item.mesage}
                  id={item.sender_id}
                  name={item.sender_name}
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

export default ChannelMessageScreen
