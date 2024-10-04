import React, {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from "react"
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
import { useNewMessage } from "../../../context/NewMessage"
import { FlashList } from "@shopify/flash-list"

export interface MessageWithProfile extends Messages {
  sender_profile: {
    profile_pic: string | null
  }
}

type ProfilePic = {
  id: string
  profile_pic: string | null
}

const readImage = async (item: string) => {
  try {
    const { data, error } = await supabase.storage
      .from("photos")
      .download(`${item}`, {
        transform: {
          quality: 20,
        },
      })
    if (error) {
      throw error
    }
    return new Promise((resolve, reject) => {
      const fr = new FileReader()
      fr.onload = () => {
        const imageDataUrl = fr.result as string
        resolve(imageDataUrl)
      }
      fr.onerror = () => {
        reject(new Error("Failed to read file"))
      }
      fr.readAsDataURL(data!)
    })
  } catch (error) {
    throw error
  }
}

const getDirectMessagesProfilePics = async (
  setDirectMessagesProfilePics: Dispatch<SetStateAction<ProfilePic[]>>,
  sessionIds: string[]
) => {
  try {
    if (!sessionIds) return
    const { data: profilePics, error: profilePicError } = await supabase
      .from("profiles")
      .select("id, profile_pic")
      .in("id", sessionIds)

    if (profilePicError) {
      console.error("Error fetching profile pics:", profilePicError)
      return null
    }

    const ProfilePics = await Promise.all(
      profilePics.map(async (pic) => {
        const image = await readImage(pic.profile_pic)

        return {
          id: pic.id as string,
          profile_pic: image as string,
        }
      })
    )

    setDirectMessagesProfilePics(ProfilePics)
  } catch (error) {
    console.error("Unexpected error in getChannelMembersProfilePics:", error)
    return null
  }
}

const MessageScreen = () => {
  const route = useRoute<RouteProp<RootStackParamList, "MessagingScreen">>()
  const chatSession = route.params.chatSession
  const [directMessagesProfilePics, setDirectMessagesProfilePics] = useState<
    ProfilePic[]
  >([])
  const [initialLoading, setInitialLoading] = useState(true)
  const [appending, setAppending] = useState(false)
  const [page, setPage] = useState(0)
  const [endOfData, setEndOfData] = useState(false)
  const [loading, setLoading] = useState(false)
  const [serverMessages, setServerMessages] = useState<
    MessageWithProfile[] | null
  >([])
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
      if (otherUserId && user?.id) {
        try {
          await getDirectMessagesProfilePics(setDirectMessagesProfilePics, [
            otherUserId,
            user?.id,
          ])
        } catch (error) {
          console.error("Error fetching profile pictures:", error)
        }
      }

      try {
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
            async (payload) => {
              const { data: senderProfile } = await supabase
                .from("profiles")
                .select("profile_pic")
                .eq("id", payload.new.sender)
                .single()

              const newMessage: MessageWithProfile = {
                ...(payload.new as Messages),
                sender_profile: {
                  profile_pic: senderProfile?.profile_pic || null,
                },
              }

              setServerMessages((prevMessages: MessageWithProfile[] | null) =>
                prevMessages ? [newMessage, ...prevMessages] : [newMessage]
              )
            }
          )
          .subscribe()

        return () => {
          supabase.removeChannel(channelSubscription)
        }
      } catch (error) {
        console.error("Error loading initial data:", error)
      } finally {
        setInitialLoading(false)
      }
    }
    fetchMessages()
  }, [chatSession])

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
      userProfile!.first_name +
        (userProfile?.last_name ? " " + userProfile.last_name : ""),
      otherUserId,
      currentUser?.expo_push_token,
      setLoadingSentMessage,
      setImage,
      setMessageToSend
    )

    await upsertChatSession(chatSession.id, message || "Sent an image")
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

  const renderMessage = useCallback(
    ({ item }: { item: MessageWithProfile }) => {
      const profilePic = directMessagesProfilePics?.find(
        (pic) => pic.id === item.sender
      )
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
          senderProfilePic={profilePic?.profile_pic || null}
        />
      )
    },
    [directMessagesProfilePics]
  )

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
            <FlashList
              estimatedItemSize={120}
              showsVerticalScrollIndicator={false}
              inverted={true}
              className="mx-1"
              contentContainerStyle={{}}
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
