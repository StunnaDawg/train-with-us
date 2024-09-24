import {
  View,
  Text,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  FlatList,
  ActivityIndicator,
} from "react-native"
import React, {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from "react"
import { NavigationType, RootStackParamList } from "../../../@types/navigation"
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native"
import { useAuth } from "../../../supabaseFunctions/authcontext"
import { EventChatMessages, Messages } from "../../../@types/supabaseTypes"
import { useNewMessage } from "../../../context/NewMessage"
import supabase from "../../../../lib/supabase"
import MessageCard from "../../../components/MessageCard"
import BackButton from "../../../components/BackButton"
import getEventChatMessages from "../../../supabaseFunctions/getFuncs/getEventChatMessages"
import MessageSkeleton from "./MessagesSkeleton"
import MessageInput from "../../../components/MessageInput"
import showAlert from "../../../utilFunctions/showAlert"
import sendEventChatMessage from "../../../supabaseFunctions/addFuncs/sendEventChatMessage"
import upsertEventChatSession from "../../../supabaseFunctions/updateFuncs/updateEventChat"
import sendEventChannelNotification from "../../../utilFunctions/sendEventChannelNotification"

const EventChat = () => {
  const [page, setPage] = useState(0)
  const { setNewMessage } = useNewMessage()
  const [initialLoading, setInitialLoading] = useState(true)
  const [endOfData, setEndOfData] = useState(false)
  const [loading, setLoading] = useState(false)
  const [serverMessages, setServerMessages] = useState<
    EventChatMessages[] | null
  >([])
  const { user, userProfile } = useAuth()
  const route = useRoute<RouteProp<RootStackParamList, "EventChat">>()
  const eventChat = route.params.eventChat
  const navigation = useNavigation<NavigationType>()

  useEffect(() => {
    const fetchMessages = async () => {
      setNewMessage(false)
      setInitialLoading(true)
      if (!eventChat.id) {
        showAlert({
          title: "Error",
          message: "No chat for this event",
        })
        navigation.goBack()
        return
      }
      await getEventChatMessages(
        eventChat.id,
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
            table: "event_messages",
            filter: `event_chat=eq.${eventChat.id}`,
          },
          (payload) => {
            setServerMessages((prevMessages: EventChatMessages[] | null) =>
              prevMessages
                ? [payload.new as EventChatMessages, ...prevMessages]
                : [payload.new as EventChatMessages]
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
  }, [eventChat])

  const handleLoadMore = () => {
    if (!loading && !endOfData) {
      setPage((prevPage) => prevPage + 1)
    }
  }

  const sendMessageAction = async (
    image: string | null,
    message: string,
    setLoadingSentMessage: Dispatch<SetStateAction<boolean>>,
    setImage: Dispatch<SetStateAction<string>>,
    setMessageToSend: Dispatch<SetStateAction<string>>
  ) => {
    if (
      (message.trim().length === 0 && image === null) ||
      !user?.id ||
      !eventChat.id
    ) {
      console.log("No message or image")
      return
    }
    await sendEventChatMessage(
      message,
      image,
      user.id,
      eventChat.id,
      eventChat.event_id,
      userProfile?.profile_pic || "",
      userProfile?.first_name || "",
      setLoadingSentMessage,
      setImage,
      setMessageToSend
    )

    await upsertEventChatSession(
      eventChat.id,
      message || "Sent an image",
      eventChat.event_id
    )

    sendEventChannelNotification(
      user.id,
      userProfile?.profile_pic || "",
      "New Message in Event" + eventChat.event_chat_name + "Chat",
      message,
      eventChat
    )
  }

  useEffect(() => {
    if (page > 0) {
      if (eventChat.id) {
        getEventChatMessages(
          eventChat.id,
          setServerMessages,
          page,
          setEndOfData,
          false,
          setLoading
        )
      } else {
        showAlert({
          title: "Error",
          message: "No chat for this event",
        })
        navigation.goBack()
      }
    }
  }, [page])

  const renderMessage = useCallback(({ item }: { item: EventChatMessages }) => {
    return (
      <MessageCard
        sentAt={item.sent_at}
        message={item.message}
        id={item.sender_id}
        name={item.sender_name}
        imageUrl={item.image}
        senderProfilePic={item.sender_profile_pic}
      />
    )
  }, [])

  const messageKeyExtractor = useCallback(
    (item: EventChatMessages, index: number) => {
      return item.id + index.toString()
    },
    []
  )

  return (
    <SafeAreaView className="flex-1 bg-slate-300/05">
      <View className="flex flex-row justify-between mx-1">
        <View>
          <BackButton size={24} />
        </View>
        <View className=" items-center mb-2">
          <Text className="font-bold text-lg mb-1">
            {eventChat.event_chat_name}
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
        chatSessionId={eventChat.id || ""}
      />
    </SafeAreaView>
  )
}

export default EventChat
