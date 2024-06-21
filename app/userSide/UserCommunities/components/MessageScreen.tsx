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
import { Events, Messages, Profile } from "../../../@types/supabaseTypes"
import getChatSessionMessages from "../../../supabaseFunctions/getFuncs/getChatSessionMessages"
import { useAuth } from "../../../supabaseFunctions/authcontext"
import sendMessage from "../../../supabaseFunctions/addFuncs/sendMessage"
import supabase from "../../../../lib/supabase"
import useCurrentUser from "../../../supabaseFunctions/getFuncs/useCurrentUser"
import sendNotification from "../../../utilFunctions/sendNotification"
import upsertChatSession from "../../../supabaseFunctions/updateFuncs/updateChatSession"
import BackButton from "../../../components/BackButton"
import { get } from "mongoose"
import getSingleEvent from "../../../supabaseFunctions/getFuncs/getSingleEvent"
import EventCard from "../../Events/components/EventCard"

type UserMessage = {
  message: string | null
  isLink: boolean
  eventId: number | null
}

const UserMessage = ({ message, isLink, eventId }: UserMessage) => {
  const [event, setEvent] = useState<Events | null>(null)
  const [loading, setLoading] = useState<boolean>(false)

  useEffect(() => {
    if (!eventId || isLink === false) return
    getSingleEvent(setLoading, eventId, setEvent)
  }, [eventId])
  return (
    <View className="flex flex-row justify-end mt-2 mr-4 ml-36">
      {isLink && event ? (
        <View>
          <View className="rounded-2xl bg-blue-500/80 p-2 mb-1">
            <Text className="font-bold text-xs">{message}</Text>
          </View>
          <View className="bg-black rounded-xl py-1">
            <EventCard
              title={event?.event_title}
              eventCoverPhoto={event.event_cover_photo}
              eventId={event.id}
              eventPrice={event.price}
              date={event.date}
              communityId={event.community_host}
            />
          </View>
        </View>
      ) : (
        <View>
          <View className="rounded-2xl bg-blue-500/80 p-2">
            <Text className="font-bold text-xs">{message}</Text>
          </View>
        </View>
      )}
    </View>
  )
}

type MatchesMessageProps = {
  message: string | null
  name: string | null | undefined
  isLink: boolean
  eventId: number | null
}

const MatchesMessage = ({
  message,
  name,
  isLink,
  eventId,
}: MatchesMessageProps) => {
  const [event, setEvent] = useState<Events | null>({} as Events)
  const [loading, setLoading] = useState<boolean>(false)

  useEffect(() => {
    if (!eventId || isLink === false) return
    getSingleEvent(setLoading, eventId, setEvent)
  }, [eventId])
  return (
    <View className="flex flex-row justify-start mt-2 ml-4 mr-36">
      <View>
        <View className="rounded-2xl bg-slate-400/60 p-2">
          {isLink && event ? (
            <EventCard
              title={event?.event_title}
              eventCoverPhoto={event.event_cover_photo}
              eventId={event.id}
              eventPrice={event.price}
              date={event.date}
              communityId={event.community_host}
            />
          ) : (
            <Text className=" text-xs text-black font-bold">{message}</Text>
          )}
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
  const { user } = useAuth()

  const otherUserId =
    chatSession.user1 === user?.id ? chatSession.user2 : chatSession.user1

  useEffect(() => {
    if (!user || !otherUserId) return
    useCurrentUser(otherUserId, setCurrentUser)
  }, [user, otherUserId])

  useEffect(() => {
    getChatSessionMessages(chatSession.id, setServerMessages)
    const channelSubscription = supabase
      .channel("schema-db-changes")
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "messages",
          filter: `chat_session=eq.${chatSession.id}`,
        },
        (payload) => {
          console.log("Message received: ", payload)
          getChatSessionMessages(chatSession.id, setServerMessages)
        }
      )
      .subscribe((status, error) => {
        console.log("Subscription status:", status)
        if (error) {
          console.error("Subscription error:", error)
        }
      })

    return () => {
      supabase.removeChannel(channelSubscription)
    }
  }, [chatSession])

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
        messageToSend,
        chatSession.id
      )
    }
  }
  return (
    <SafeAreaView className="flex-1 bg-slate-300/05">
      <View className="flex flex-row justify-between">
        <View className="mx-1">
          <BackButton size={32} />
        </View>
        <View className="mb-2">
          <SinglePic
            size={55}
            avatarRadius={100}
            noAvatarRadius={100}
            item={currentUser?.profile_pic}
          />

          <Text className="font-bold text-lg mb-1">
            {currentUser?.first_name}
          </Text>
        </View>

        <View />
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
                <UserMessage
                  message={item.message}
                  isLink={item.community_or_event_link}
                  eventId={item.eventId}
                />
              ) : (
                <MatchesMessage
                  name={currentUser?.first_name}
                  message={item.message}
                  isLink={item.community_or_event_link}
                  eventId={item.eventId}
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
            lineBreakStrategyIOS="hangul-word"
            multiline={true}
            placeholder="Send a Message"
            className="flex-1 border bg-white rounded-xl w-64 p-2 max-h-64"
            value={messageToSend}
            onChangeText={setMessageToSend}
          />
          <Pressable className="mx-2" onPress={() => sendMessageAction()}>
            <Text className="text-lg font-bold">Send</Text>
          </Pressable>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

export default MessageScreen
