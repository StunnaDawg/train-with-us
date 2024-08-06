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
import { RootStackParamList } from "../../../@types/navigation"
import { RouteProp, useRoute } from "@react-navigation/native"
import {
  Communities,
  Events,
  Messages,
  Profile,
} from "../../../@types/supabaseTypes"
import getChatSessionMessages from "../../../supabaseFunctions/getFuncs/getChatSessionMessages"
import { useAuth } from "../../../supabaseFunctions/authcontext"
import sendMessage from "../../../supabaseFunctions/addFuncs/sendMessage"
import supabase from "../../../../lib/supabase"
import useCurrentUser from "../../../supabaseFunctions/getFuncs/useCurrentUser"
import sendNotification from "../../../utilFunctions/sendNotification"
import upsertChatSession from "../../../supabaseFunctions/updateFuncs/updateChatSession"
import BackButton from "../../../components/BackButton"
import getSingleEvent from "../../../supabaseFunctions/getFuncs/getSingleEvent"
import EventCard from "../../Events/components/EventCard"
import getSingleCommunity from "../../../supabaseFunctions/getFuncs/getSingleCommunity"
import CommunityMessageCard from "./CommunityMessageCard"
import SinglePicCommunity from "../../../components/SinglePicCommunity"
import { FontAwesome6 } from "@expo/vector-icons"
import MessageInput from "../../../components/MessageInput"
import { Image } from "expo-image"

type UserMessage = {
  message: string | null
  isLink: boolean
  eventId: number | null
  communityId: number | null
  imageUrl: string | null
}

const UserMessage = ({
  message,
  isLink,
  eventId,
  communityId,
  imageUrl,
}: UserMessage) => {
  const [event, setEvent] = useState<Events | null>(null)
  const [community, setCommunity] = useState<Communities | null>(null)
  const [loading, setLoading] = useState<boolean>(false)
  const { user } = useAuth()

  useEffect(() => {
    if (!eventId || isLink === false) return
    getSingleEvent(setLoading, eventId, setEvent)
  }, [eventId])

  useEffect(() => {
    if (!communityId || isLink === false) return
    getSingleCommunity(setLoading, communityId, setCommunity)
  }, [communityId])

  return (
    <View className="flex flex-row justify-end mt-2 mr-4 ml-36">
      {isLink && event ? (
        <View>
          <View className="rounded-xl bg-blue-500/80 p-2 mb-1">
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
      ) : isLink && community ? (
        <View>
          <View className="rounded-xl bg-blue-500/80 p-2 mb-1">
            <Text className="font-bold text-xs">{message}</Text>
          </View>
          <CommunityMessageCard community={community} userId={user?.id} />
        </View>
      ) : imageUrl ? (
        <View>
          <SinglePicCommunity
            size={150}
            item={imageUrl}
            avatarRadius={10}
            noAvatarRadius={10}
          />
          {message !== "" ? (
            <View className="rounded-xl bg-blue-500/80 p-2 mt-2">
              <Text className="font-bold text-xs">{message}</Text>
            </View>
          ) : null}
        </View>
      ) : (
        <View className="rounded-xl bg-blue-500/80 p-2 mt-2">
          <Text className="font-bold text-xs">{message}</Text>
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
  communityId: number | null
  imageUrl: string | null
}

const MatchesMessage = ({
  message,
  name,
  isLink,
  eventId,
  communityId,
  imageUrl,
}: MatchesMessageProps) => {
  const [event, setEvent] = useState<Events | null>({} as Events)
  const [loading, setLoading] = useState<boolean>(false)
  const [community, setCommunity] = useState<Communities | null>(null)

  useEffect(() => {
    if (!eventId || isLink === false) return
    getSingleEvent(setLoading, eventId, setEvent)
  }, [eventId])

  useEffect(() => {
    if (!communityId || isLink === false) return
    getSingleCommunity(setLoading, communityId, setCommunity)
  }, [communityId])
  return (
    <View className="flex flex-row justify-start mt-2 ml-4 mr-36">
      <View>
        <View className="rounded-xl bg-slate-400/60 p-2">
          {isLink && event ? (
            <EventCard
              title={event?.event_title}
              eventCoverPhoto={event.event_cover_photo}
              eventId={event.id}
              eventPrice={event.price}
              date={event.date}
              communityId={event.community_host}
            />
          ) : isLink && community ? (
            <View>
              <View className="rounded-xl bg-blue-500/80 p-2 mb-1">
                <Text className="font-bold text-xs">{message}</Text>
              </View>
              <View className=" rounded-xl py-1">
                <Text>{community.community_title}</Text>
              </View>
            </View>
          ) : imageUrl ? (
            <View>
              <SinglePicCommunity
                size={150}
                item={imageUrl}
                avatarRadius={10}
                noAvatarRadius={10}
              />
              {message !== "" ? (
                <Text className=" text-xs text-black font-bold">{message}</Text>
              ) : null}
            </View>
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

  const sendMessageAction = async (image: string | null) => {
    if ((messageToSend.trim().length === 0 && image === null) || !user?.id) {
      return
    }
    await sendMessage(messageToSend, image, user?.id, chatSession.id)
    setMessageToSend("")
    await upsertChatSession(chatSession.id, messageToSend)
    getChatSessionMessages(chatSession.id, setServerMessages)

    if (currentUser?.expo_push_token) {
      sendNotification(
        currentUser?.expo_push_token,
        `Message from ${currentUser?.first_name}`,
        messageToSend,
        chatSession
      )
    }
  }
  return (
    <SafeAreaView className="flex-1 bg-slate-300/05">
      <View className="flex flex-row justify-between">
        <View className="mx-1">
          <BackButton size={24} />
        </View>
        <View className="mb-2">
          <SinglePicCommunity
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
                  communityId={item.community_id}
                  imageUrl={item.image}
                />
              ) : (
                <MatchesMessage
                  name={currentUser?.first_name}
                  message={item.message}
                  isLink={item.community_or_event_link}
                  eventId={item.eventId}
                  communityId={item.community_id}
                  imageUrl={item.image}
                />
              )
            }
          />
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
      <MessageInput
        messageToSend={messageToSend}
        setMessageToSend={setMessageToSend}
        sendMessageAction={sendMessageAction}
        chatSessionId={chatSession.id}
      />
    </SafeAreaView>
  )
}

export default MessageScreen
