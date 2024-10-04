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
import { FlashList } from "@shopify/flash-list"

export interface CommunityChannelMessageWithProfile
  extends CommunityChannelMessages {
  sender_profile: {
    profile_pic: string | null
  }
}

// I actually think I can just load all the profile pics from the channel members and load them, then attach them to the messages
// I think the best thing to do is to load all the channel members, then load all the messages, then load the profile pics for each sender
// I can do this by getting the channel members from the channel, then getting the profile pics from the profiles table
// I can use the useEffect to load the profile pics for each sender, then attach them to the messages
// Can I only read the profile pic once ?

const LoadingIndicator = () => {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <ActivityIndicator size="large" color="#0000ff" />
    </View>
  )
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

const getChannelMembersProfilePics = async (
  communityId: number,
  setChannelMembersProfilePics: Dispatch<SetStateAction<ProfilePic[]>>
) => {
  try {
    const { data: channelMembersData, error: channelMembersError } =
      await supabase
        .from("community_members")
        .select("*")
        .eq("community_id", communityId)

    if (channelMembersError) {
      console.error("Error fetching channel members:", channelMembersError)
      return null
    }
    console.log("channelMembersData", channelMembersData)

    const channelMembers = channelMembersData.map((member) => member.user_id)

    console.log("channelMembers", channelMembers)

    const { data: profilePics, error: profilePicError } = await supabase
      .from("profiles")
      .select("id, profile_pic")
      .in("id", channelMembers)

    if (profilePicError) {
      console.error("Error fetching profile pics:", profilePicError)
      return null
    }

    console.log("profilePics being read", profilePics.length)

    console.log("profilePics", profilePics)

    const channelMembersProfilePics = await Promise.all(
      profilePics.map(async (pic) => {
        const image = await readImage(pic.profile_pic)

        return {
          id: pic.id as string,
          profile_pic: image as string,
        }
      })
    )

    console.log("channelMembersProfilePics", channelMembersProfilePics)

    setChannelMembersProfilePics(channelMembersProfilePics)
  } catch (error) {
    console.error("Unexpected error in getChannelMembersProfilePics:", error)
    return null
  }
}

const ChannelMessageScreen = () => {
  const [initialLoading, setInitialLoading] = useState(true)
  const [loading, setLoading] = useState(false)
  const route = useRoute<RouteProp<RootStackParamList, "ChannelScreen">>()
  const channel = route.params.channelId
  const [channelMembersProfilePics, setChannelMembersProfilePics] = useState<
    ProfilePic[]
  >([])
  const [serverMessages, setServerMessages] = useState<
    CommunityChannelMessageWithProfile[] | null
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

    console.log(currentUser.profile_pic)
    await sendChannelMessage(
      message,
      image,
      user?.id,
      channel,
      currentUser?.first_name +
        (currentUser?.last_name ? " " + currentUser?.last_name : " "),
      setLoadingSentMessage,
      setImage,
      setMessageToSend
    )

    await upsertCommunitySession(
      channel.id,
      `${currentUser?.first_name}${
        currentUser?.last_name ? ` ${currentUser.last_name}` : ""
      }`,
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
        currentUser?.profile_pic,
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
        currentUser?.profile_pic,
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
      try {
        await getChannelMembersProfilePics(
          channel.community,
          setChannelMembersProfilePics
        )
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
            async (payload) => {
              const { data: senderProfile } = await supabase
                .from("profiles")
                .select("profile_pic")
                .eq("id", payload.new.sender_id)
                .single()

              const newMessage: CommunityChannelMessageWithProfile = {
                ...(payload.new as CommunityChannelMessages),
                sender_profile: {
                  profile_pic: senderProfile?.profile_pic || null,
                },
              }
              setServerMessages(
                (prevMessages: CommunityChannelMessageWithProfile[] | null) =>
                  prevMessages ? [newMessage, ...prevMessages] : [newMessage]
              )
            }
          )
          .subscribe((status, error) => {
            console.log("Subscription status:", status, error)
          })

        return () => {
          supabase.removeChannel(channelSubscription)
        }
      } catch (error) {
        console.error("Error loading initial data:", error)
      } finally {
        setInitialLoading(false)
      }
    }
    getChannelSessionMessagesFunc()
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
    ({ item }: { item: CommunityChannelMessageWithProfile }) => {
      console.log("channelMembersProfilePics", channelMembersProfilePics)
      const profilePic = channelMembersProfilePics?.find(
        (pic) => pic.id === item.sender_id
      )

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
          senderProfilePic={profilePic?.profile_pic || null}
        />
      )
    },
    [channelMembersProfilePics]
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
