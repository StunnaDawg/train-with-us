import {
  View,
  Text,
  Pressable,
  ActivityIndicator,
  ScrollView,
  Alert,
} from "react-native"
import React, { useCallback, useEffect, useState } from "react"
import supabase from "../../../../lib/supabase"
import {
  CommunityChannel,
  EventChat,
  Profile,
} from "../../../@types/supabaseTypes"
import getUserPinnedChannels from "../../../supabaseFunctions/getFuncs/getUserPinnedChannels"
import { useFocusEffect, useNavigation } from "@react-navigation/native"
import { NavigationType } from "../../../@types/navigation"
import { MaterialCommunityIcons } from "@expo/vector-icons"
import { useAuth } from "../../../supabaseFunctions/authcontext"
import { FontAwesome6 } from "@expo/vector-icons"

const PinnedChannels = React.memo(() => {
  const [eventChats, setEventChats] = useState<EventChat[] | null>([])

  const [pressedChannels, setPressedChannels] = useState<{
    [key: string]: boolean
  }>({})
  const { user } = useAuth()

  const [loading, setLoading] = useState<boolean>(false)
  const [communityChannels, setCommunityChannels] = useState<
    CommunityChannel[] | null
  >([])
  const [isDashPressed, setIsDashPressed] = useState<boolean>()
  const navigation = useNavigation<NavigationType>()

  const handleOnPressIn = useCallback(() => {
    setIsDashPressed(true)
  }, [])

  const handleOnPressOut = useCallback(() => {
    setIsDashPressed(false)
  }, [])

  const handlePressIn = (channelId: string) => {
    setPressedChannels((prev) => ({ ...prev, [channelId]: true }))
  }

  const handlePressOut = (channelId: string) => {
    setPressedChannels((prev) => ({ ...prev, [channelId]: false }))
  }

  //check what events user is going to, using the event id from the events get the chats

  const getEventChats = useCallback(async () => {
    try {
      if (!user?.id) {
        console.error("No user logged in!")
        return
      }

      const userId = user.id

      const { data: eventGoing, error: eventGoingError } = await supabase
        .from("events_users")
        .select("*")
        .eq("user_id", userId)

      if (eventGoingError) {
        throw eventGoingError
      }

      const eventIds = eventGoing.map((event) => event.event_chat)

      console.log("Event ids:", eventIds)

      const filterNulls = eventIds.filter((id) => id !== null)

      if (filterNulls.length === 0) {
        console.log("User is not attending any events.")
        setEventChats([])
        return
      }

      const { data: eventChatsData, error: eventChatsError } = await supabase
        .from("event_chat")
        .select("*")
        .in("id", filterNulls)

      if (eventChatsError) {
        throw eventChatsError
      }

      setEventChats(eventChatsData)
      console.log("Event chats:", eventChatsData)
    } catch (error) {
      console.error("Error fetching event chats:", error)
    }
  }, [user])

  const showAlert = (onConfirm: () => void) =>
    Alert.alert(
      "Do you want to unpin this channel?",
      "Please select an option.",
      [
        { text: "Yes", onPress: onConfirm },
        { text: "Cancel", style: "cancel" },
      ],
      { cancelable: true }
    )

  const removePinChannel = async (channelId: string) => {
    showAlert(async () => {
      try {
        if (!user) {
          console.error("No user logged in!")
          return
        }

        const { data: profile, error } = await supabase
          .from("profiles")
          .select("pinned_channels")
          .eq("id", user.id)
          .single()

        if (error) {
          console.error("Failed to fetch user profile:", error.message)
          return
        }

        const updatedPinnedChannels = profile.pinned_channels.filter(
          (url: string) => url !== channelId
        )

        const { error: updateError } = await supabase
          .from("profiles")
          .update({ pinned_channels: updatedPinnedChannels })
          .eq("id", user.id)

        if (updateError) {
          console.error(
            "Failed to update pinned channels:",
            updateError.message
          )
        } else {
          await getUserPinnedChannels(
            setLoading,
            user?.id,
            setCommunityChannels
          )
          console.log("Channel unpinned successfully!")
        }
      } catch (err) {
        console.error("Error unpinning channel:", err)
      }
    })
  }

  const fetchUserPinnedChannels = useCallback(async () => {
    if (!user) return
    setLoading(true)
    await getUserPinnedChannels(setLoading, user.id, setCommunityChannels)
    setLoading(false)
  }, [user])

  useEffect(() => {
    fetchUserPinnedChannels()
  }, [fetchUserPinnedChannels])

  useFocusEffect(
    useCallback(() => {
      let isActive = true

      if (isActive) {
        fetchUserPinnedChannels()
      }

      return () => {
        isActive = false
      }
    }, [fetchUserPinnedChannels])
  )

  useEffect(() => {
    getEventChats()
  }, [])

  const renderChannels = useCallback(() => {
    return communityChannels?.map((c) => (
      <View
        key={c.id}
        className={` mx-2 w-72 border-b-slate-400 p-4 flex flex-row justify-between  flex-grow items-center border-b-2 `}
      >
        <Pressable
          onLongPress={() => {
            removePinChannel(c.id)
          }}
          onPressIn={() => handlePressIn(c.id)}
          onPressOut={() => handlePressOut(c.id)}
          key={c.id}
          onPress={() => {
            navigation.navigate("ChannelScreen", { channelId: c })
          }}
          className={`${pressedChannels[c.id] ? "opacity-50" : null}`}
        >
          <View>
            <View>
              <Text className="font-bold text-white">
                #{c.channel_title || "Error loading channel title"} in{" "}
                {c.community_name}
              </Text>
            </View>
            <Text className="text-xs text-white">
              <Text>{`${c.recent_message_sender} said `}</Text>
              {c.recent_message || "No Messages yet!"}
            </Text>
          </View>
        </Pressable>
        <Pressable onPress={() => removePinChannel(c.id)}>
          <MaterialCommunityIcons
            name="dots-vertical"
            size={20}
            color="white"
          />
        </Pressable>
      </View>
    ))
  }, [communityChannels, navigation, removePinChannel])

  return (
    <View>
      <View>
        <Text className="font-bold text-lg underline text-white px-4">
          Pinned Channels
        </Text>
      </View>
      <ScrollView className="h-full">
        {!loading && communityChannels && communityChannels.length > 0 ? (
          renderChannels()
        ) : communityChannels?.length && communityChannels.length > 0 ? (
          <ActivityIndicator />
        ) : (
          <View className="flex flex-row justify-end items-center p-1 ">
            <View>
              <Text className="text-white font-bold text-center">
                Join a Community to pin
              </Text>
              <Text className="text-white font-bold text-center">
                favourite channels!
              </Text>
            </View>
            <Pressable
              onPressIn={handleOnPressIn}
              onPressOut={handleOnPressOut}
              onPress={() => {
                navigation.navigate("Communities")
              }}
              className={`m-2 ${
                isDashPressed ? "bg-black" : "bg-white"
              } rounded-full p-2 items-center`}
            >
              <FontAwesome6
                name="magnifying-glass"
                size={36}
                color={isDashPressed ? "white" : "black"}
              />
            </Pressable>
          </View>
        )}
      </ScrollView>
    </View>
  )
})

export default PinnedChannels
