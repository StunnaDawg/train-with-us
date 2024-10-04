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
import { FlashList } from "@shopify/flash-list"

export interface EventChatMessageWithProfile extends EventChatMessages {
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

const getEventChatMembersProfilePics = async (
  eventChatId: string,
  setEventChatProfilePics: Dispatch<SetStateAction<ProfilePic[]>>
) => {
  try {
    const { data: channelMembersData, error: channelMembersError } =
      await supabase
        .from("events_users")
        .select("*")
        .eq("event_chat", eventChatId)

    if (channelMembersError) {
      console.error("Error fetching channel members:", channelMembersError)
      return null
    }

    const channelMembers = channelMembersData.map((member) => member.user_id)

    const { data: profilePics, error: profilePicError } = await supabase
      .from("profiles")
      .select("id, profile_pic")
      .in("id", channelMembers)

    if (profilePicError) {
      console.error("Error fetching profile pics:", profilePicError)
      return null
    }

    const channelMembersProfilePics = await Promise.all(
      profilePics.map(async (pic) => {
        const image = await readImage(pic.profile_pic)

        return {
          id: pic.id as string,
          profile_pic: image as string,
        }
      })
    )

    setEventChatProfilePics(channelMembersProfilePics)
  } catch (error) {
    console.error("Unexpected error in getChannelMembersProfilePics:", error)
    return null
  }
}

const EventChat = () => {
  const [page, setPage] = useState(0)

  const [initialLoading, setInitialLoading] = useState(true)
  const [endOfData, setEndOfData] = useState(false)
  const [loading, setLoading] = useState(false)
  const [serverMessages, setServerMessages] = useState<
    EventChatMessageWithProfile[] | null
  >([])
  const [eventChatProfilePics, setEventChatProfilePics] = useState<
    ProfilePic[]
  >([])
  const { user, userProfile } = useAuth()
  const route = useRoute<RouteProp<RootStackParamList, "EventChat">>()
  const eventChat = route.params.eventChat
  const navigation = useNavigation<NavigationType>()

  useEffect(() => {
    const fetchMessages = async () => {
      setInitialLoading(true)
      if (!eventChat.id) {
        showAlert({
          title: "Error",
          message: "No chat for this event",
        })
        navigation.goBack()
        return
      }

      try {
        await getEventChatMembersProfilePics(
          eventChat.id,
          setEventChatProfilePics
        )
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
            async (payload) => {
              const newMessage: EventChatMessageWithProfile = {
                ...(payload.new as EventChatMessages),
                sender_profile: {
                  profile_pic:
                    eventChatProfilePics.find(
                      (pic) => pic.id === payload.new.sender_id
                    )?.profile_pic || null,
                },
              }
              setServerMessages((prevMessages) =>
                prevMessages ? [newMessage, ...prevMessages] : [newMessage]
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
      } catch (error) {
        console.error("Error fetching profile pictures:", error)
      } finally {
        setInitialLoading(false)
      }
    }
    fetchMessages()
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
      eventChat.event_id,
      userProfile?.first_name || ""
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

  const renderMessage = useCallback(
    ({ item }: { item: EventChatMessages }) => {
      const senderProfilePic = eventChatProfilePics.find(
        (pic) => pic.id === item.sender_id
      )?.profile_pic
      return (
        <MessageCard
          sentAt={item.sent_at}
          message={item.message}
          id={item.sender_id}
          name={item.sender_name}
          imageUrl={item.image}
          senderProfilePic={senderProfilePic || null}
        />
      )
    },
    [eventChatProfilePics]
  )

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
            <FlashList
              estimatedItemSize={120}
              showsVerticalScrollIndicator={false}
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
