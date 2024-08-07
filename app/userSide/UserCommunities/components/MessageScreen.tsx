import React, { useEffect, useState } from "react"
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

const MessageScreen = () => {
  const route = useRoute<RouteProp<RootStackParamList, "MessagingScreen">>()
  const chatSession = route.params.chatSession
  const [page, setPage] = useState(0)
  const [endOfData, setEndOfData] = useState(false)
  const [loading, setLoading] = useState(false)
  const [serverMessages, setServerMessages] = useState<Messages[] | null>([])
  const [messageToSend, setMessageToSend] = useState("")
  const [currentUser, setCurrentUser] = useState<Profile | null>(null)
  const { user, userProfile } = useAuth()

  const otherUserId =
    chatSession.user1 === user?.id ? chatSession.user2 : chatSession.user1

  useEffect(() => {
    if (!user || !otherUserId) return
    useCurrentUser(otherUserId, setCurrentUser)
  }, [user, otherUserId])

  useEffect(() => {
    getChatSessionMessages(
      chatSession.id,
      setServerMessages,
      page,
      setEndOfData
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
          console.log("Message received: ", payload)
          getChatSessionMessages(
            chatSession.id,
            setServerMessages,
            page,
            setEndOfData
          )
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

  const handleLoadMore = () => {
    if (!loading && !endOfData) {
      setPage((prevPage) => prevPage + 1)
    }
  }

  const sendMessageAction = async (image: string | null) => {
    if ((messageToSend.trim().length === 0 && image === null) || !user?.id) {
      return
    }
    await sendMessage(
      messageToSend,
      image,
      user?.id,
      chatSession.id,
      userProfile!.profile_pic,
      userProfile!.first_name + " " + userProfile!.last_name
    )

    await upsertChatSession(chatSession.id, messageToSend || "Sent an image")
    getChatSessionMessages(
      chatSession.id,
      setServerMessages,
      page,
      setEndOfData
    )

    if (currentUser?.expo_push_token) {
      sendNotification(
        currentUser?.expo_push_token,
        `Message from ${currentUser?.first_name}`,
        messageToSend,
        chatSession
      )
    }
    setMessageToSend("")
  }

  useEffect(() => {
    if (page > 0) {
      getChatSessionMessages(
        chatSession.id,
        setServerMessages,
        page,
        setEndOfData
      )
    }
  }, [page])
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
            onEndReached={handleLoadMore}
            onEndReachedThreshold={0.1}
            ListFooterComponent={
              loading && !endOfData ? <ActivityIndicator size="small" /> : null
            }
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
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
            )}
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
