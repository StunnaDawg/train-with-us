import React, { useCallback, useEffect, useState } from "react"
import {
  View,
  Text,
  KeyboardAvoidingView,
  Platform,
  FlatList,
  TouchableWithoutFeedback,
  Keyboard,
  SafeAreaView,
  ActivityIndicator,
} from "react-native"
import { RootStackParamList } from "../../../@types/navigation"
import { RouteProp, useRoute } from "@react-navigation/native"
import { Messages, Profile } from "../../../@types/supabaseTypes"
import getChatSessionMessages from "../../../supabaseFunctions/getFuncs/getChatSessionMessages"
import { useAuth } from "../../../supabaseFunctions/authcontext"
import sendMessage from "../../../supabaseFunctions/addFuncs/sendMessage"
import supabase from "../../../../lib/supabase"
import useCurrentUser from "../../../supabaseFunctions/getFuncs/useCurrentUser"
import sendNotification from "../../../utilFunctions/sendNotification"
import upsertChatSession from "../../../supabaseFunctions/updateFuncs/updateChatSession"
import BackButton from "../../../components/BackButton"

import SinglePicCommunity from "../../../components/SinglePicCommunity"
import MessageInput from "../../../components/MessageInput"
import MessageComponent from "../../../components/MessageCard"
import MessageSkeleton from "./MessagesSkeleton"
import { cacheStorage } from "../../../utilFunctions/mmkvStorage"
import { useNewMessage } from "../../../context/NewMessage"

const MessageScreen = () => {
  const route = useRoute<RouteProp<RootStackParamList, "MessagingScreen">>()
  const chatSession = route.params.chatSession
  const { setNewMessage } = useNewMessage()
  const [initialLoading, setInitialLoading] = useState(true)
  const [page, setPage] = useState(0)
  const [endOfData, setEndOfData] = useState(false)
  const [loading, setLoading] = useState(false)
  const [serverMessages, setServerMessages] = useState<Messages[] | null>([])
  const [currentUser, setCurrentUser] = useState<Profile | null>(null)
  const { user, userProfile } = useAuth()
  // const cacheKey = `chatSession:${chatSession.id}:page:${page}`

  const otherUserId =
    chatSession.user1 === user?.id ? chatSession.user2 : chatSession.user1

  useEffect(() => {
    if (!user || !otherUserId) return
    useCurrentUser(otherUserId, setCurrentUser)
  }, [user, otherUserId])

  useEffect(() => {
    const fetchMessages = async () => {
      setNewMessage(false)
      setInitialLoading(true)
      await getChatSessionMessages(
        chatSession.id,
        setServerMessages,
        page,
        setEndOfData,
        false,
        setLoading
      )
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
            setServerMessages((prevMessages: Messages[] | null) =>
              prevMessages
                ? [payload.new as Messages, ...prevMessages]
                : [payload.new as Messages]
            )
            // cacheStorage.set(cacheKey, JSON.stringify(serverMessages))
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
    }
    fetchMessages()
    setInitialLoading(false)
  }, [chatSession])

  const handleLoadMore = () => {
    if (!loading && !endOfData) {
      setPage((prevPage) => prevPage + 1)
    }
  }

  const sendMessageAction = async (image: string | null, message: string) => {
    if (
      (message.trim().length === 0 && image === null) ||
      !user?.id ||
      !chatSession.id ||
      !otherUserId
    ) {
      console.log("No message or image")
      return
    }
    await sendMessage(
      message,
      image,
      user?.id,
      chatSession,
      userProfile!.profile_pic,
      userProfile!.first_name + " " + userProfile!.last_name,
      otherUserId
    )

    await upsertChatSession(chatSession.id, message || "Sent an image")

    if (currentUser?.expo_push_token) {
      sendNotification(
        currentUser?.expo_push_token,
        `Message from ${currentUser?.first_name}`,
        message,
        chatSession
      )
    }
  }

  useEffect(() => {
    if (page > 0) {
      getChatSessionMessages(
        chatSession.id,
        setServerMessages,
        page,
        setEndOfData,
        true,
        setLoading
      )
    }
  }, [page])

  const renderMessage = useCallback(({ item }: { item: Messages }) => {
    return (
      <MessageComponent
        eventId={item.eventId}
        communityId={item.community_id}
        isLink={item.community_or_event_link}
        sentAt={item.sent_at}
        message={item.message}
        id={item.sender}
        name={item.sender_name}
        imageUrl={item.image}
        senderProfilePic={item.sender_profile_pic}
      />
    )
  }, [])

  const messageKeyExtractor = useCallback((item: Messages, index: number) => {
    return item.id + index.toString()
  }, [])

  return (
    <SafeAreaView className="flex-1 bg-slate-300/05">
      <View className="flex flex-row justify-between mx-1">
        <View>
          <BackButton size={24} />
        </View>
        <View className=" items-center mb-2">
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

      {initialLoading ? (
        <MessageSkeleton />
      ) : (
        <KeyboardAvoidingView
          className="flex-1 border-transparent bg-white rounded-3xl mx-2"
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 0}
        >
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <FlatList
              initialNumToRender={10}
              maxToRenderPerBatch={5}
              windowSize={5}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{
                flexGrow: 1,
                justifyContent: "flex-end",
              }}
              inverted={true}
              className="mx-1"
              data={serverMessages}
              ListHeaderComponent={<View className="h-2" />}
              onEndReached={handleLoadMore}
              onEndReachedThreshold={0.5}
              ListFooterComponent={
                loading && !endOfData ? (
                  <ActivityIndicator size="large" />
                ) : null
              }
              keyExtractor={messageKeyExtractor}
              renderItem={renderMessage}
            />
          </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
      )}

      <MessageInput
        sendMessageAction={sendMessageAction}
        chatSessionId={chatSession.id}
      />
    </SafeAreaView>
  )
}

export default MessageScreen
