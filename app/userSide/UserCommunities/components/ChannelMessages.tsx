import React, {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react"
import {
  View,
  Text,
  Pressable,
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
import { FontAwesome6 } from "@expo/vector-icons"
import {
  CommunityChannelMessages,
  Profile,
} from "../../../@types/supabaseTypes"
import { useAuth } from "../../../supabaseFunctions/authcontext"
import supabase from "../../../../lib/supabase"
import useCurrentUser from "../../../supabaseFunctions/getFuncs/useCurrentUser"
import getChannelSessionMessages from "../../../supabaseFunctions/getFuncs/getChannelMessages"
import sendChannelMessage from "../../../supabaseFunctions/addFuncs/sendChannelMessage"
import upsertCommunitySession from "../../../supabaseFunctions/updateFuncs/updateCommunitySession"
import BackButton from "../../../components/BackButton"
import { BottomSheetModal } from "@gorhom/bottom-sheet"
import ChannelBottomModal from "./ChannelBottomModal"

import MessageInput from "../../../components/MessageInput"
import MessageComponent from "../../../components/MessageCard"
import MessageSkeleton from "./MessagesSkeleton"
import sendChannelNotification from "../../../utilFunctions/sendChannelNotifcation"

const ChannelMessageScreen = () => {
  const [initialLoading, setInitialLoading] = useState(true)
  const [loading, setLoading] = useState(false)
  const route = useRoute<RouteProp<RootStackParamList, "ChannelScreen">>()
  const channel = route.params.channelId

  const [serverMessages, setServerMessages] = useState<
    CommunityChannelMessages[] | null
  >([])
  const [currentUser, setCurrentUser] = useState<Profile | null>(null)
  const [page, setPage] = useState(0)
  const [endOfData, setEndOfData] = useState(false)
  const { user } = useAuth()
  const bottomSheetModalRef = useRef<BottomSheetModal>(null)
  const snapPoints = useMemo(() => ["1%", "99%"], [])

  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present()
  }, [])
  const handleSheetChanges = useCallback((index: number) => {
    console.log("handleSheetChanges", index)
  }, [])

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
      !currentUser ||
      !channel
    ) {
      console.log(message)
      return
    }
    await sendChannelMessage(
      message,
      image,
      user?.id,
      channel.id,
      currentUser?.first_name +
        (currentUser?.last_name ? " " + currentUser?.last_name : " "),
      currentUser?.profile_pic,
      setLoadingSentMessage,
      setImage,
      setMessageToSend
    )

    await upsertCommunitySession(
      channel.id,
      currentUser?.first_name + " " + currentUser?.last_name,
      message || "Sent an Image"
    )

    if (!channel.private) {
      if (!channel) {
        console.log("no channel data")
        return
      }

      console.log("sending notification from channel", channel)
      sendChannelNotification(
        channel.community,
        currentUser.id,
        currentUser.expo_push_token,
        `New Message in ${channel.channel_title}` || "New Message in Channel",
        message,
        channel,
        false
      )
    } else {
      if (!channel) {
        console.log("no channel data")
        return
      }
      console.log("sending notification from channel", channel)
      sendChannelNotification(
        channel.community,
        currentUser.id,
        currentUser.expo_push_token,
        `New Message in ${channel.channel_title}` || "New Message in Channel",
        message,
        channel,
        true
      )
    }
  }

  useEffect(() => {
    if (!user) return
    useCurrentUser(user?.id, setCurrentUser)
  }, [user])

  useEffect(() => {
    const getChannelSessionMessagesFunc = async () => {
      setInitialLoading(true)
      await getChannelSessionMessages(
        channel.id,
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
            table: "community_channel_messages",
            filter: `channel_id=eq.${channel.id}`,
          },
          (payload) => {
            setServerMessages(
              (prevMessages: CommunityChannelMessages[] | null) =>
                prevMessages
                  ? [payload.new as CommunityChannelMessages, ...prevMessages]
                  : [payload.new as CommunityChannelMessages]
            )
          }
        )
        .subscribe((status, error) => {
          console.log("Subscription status:", status, error)
        })

      return () => {
        supabase.removeChannel(channelSubscription)
      }
    }
    getChannelSessionMessagesFunc()
    setInitialLoading(false)
  }, [channel])

  const handleLoadMore = () => {
    if (!loading && !endOfData) {
      setPage((prevPage) => prevPage + 1)
    }
  }

  useEffect(() => {
    if (page > 0) {
      getChannelSessionMessages(
        channel.id,
        setServerMessages,
        page,
        setEndOfData,
        true,
        setLoading
      )
    }
  }, [page])

  const renderMessage = useCallback(
    ({ item }: { item: CommunityChannelMessages }) => {
      return (
        <MessageComponent
          eventId={item.eventId}
          communityId={item.community_id}
          isLink={item.community_or_event_link}
          sentAt={item.sent_at}
          message={item.message}
          id={item.sender_id}
          name={item.sender_name}
          imageUrl={item.image}
          senderProfilePic={item.sender_profile_pic}
        />
      )
    },
    []
  )

  const messageKeyExtractor = useCallback(
    (item: CommunityChannelMessages, index: number) =>
      item.id + index.toString(),
    []
  )

  return (
    <SafeAreaView className="flex-1">
      <View className="mx-1">
        <BackButton size={24} />
      </View>

      <Pressable
        onPress={() => {
          handlePresentModalPress()
        }}
      >
        <View className="flex flex-row justify-center items-center">
          <View className="flex flex-row items-center">
            <Text className="font-bold text-lg mb-1 underline mx-1">
              {channel?.channel_title || "Channel"}
            </Text>
            <FontAwesome6 name="chevron-right" size={20} color="black" />
          </View>
        </View>
      </Pressable>

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
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{
                flexGrow: 1,
                justifyContent: "flex-end",
              }}
              className="mx-1"
              data={serverMessages}
              onEndReached={handleLoadMore}
              onEndReachedThreshold={0.5}
              initialNumToRender={10}
              inverted={true}
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
        chatSessionId={channel.id}
      />
      <BottomSheetModal
        enablePanDownToClose={true}
        ref={bottomSheetModalRef}
        index={1}
        snapPoints={snapPoints}
        onChange={handleSheetChanges}
      >
        <ChannelBottomModal
          channel={channel}
          userId={user?.id}
          setLoading={setLoading}
        />
      </BottomSheetModal>
    </SafeAreaView>
  )
}

export default ChannelMessageScreen
