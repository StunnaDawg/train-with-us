import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView,
  Alert,
} from "react-native"
import React, { useCallback, useEffect, useState } from "react"
import supabase from "../../../../lib/supabase"
import { CommunityChannel, EventChat } from "../../../@types/supabaseTypes"
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
  const [isDashPressed, setIsDashPressed] = useState<boolean>(false)
  const navigation = useNavigation<NavigationType>()

  // State to manage the selected tab
  const [selectedTab, setSelectedTab] = useState<"pinned" | "events">("pinned")

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

  // Fetch event chats
  const getEventChats = useCallback(async () => {
    try {
      if (!user?.id) {
        console.error("No user logged in!")
        return
      }

      const userId = user.id

      const { data: eventGoing, error: eventGoingError } = await supabase
        .from("events_users")
        .select("event_chat")
        .eq("user_id", userId)

      if (eventGoingError) {
        throw eventGoingError
      }

      const eventIds = eventGoing.map((event) => event.event_chat)
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
        getEventChats()
      }

      return () => {
        isActive = false
      }
    }, [fetchUserPinnedChannels, getEventChats])
  )

  const renderPinnedChannels = useCallback(() => {
    return communityChannels?.map((c) => (
      <TouchableOpacity
        key={c.id}
        onLongPress={() => removePinChannel(c.id)}
        onPress={() => navigation.navigate("ChannelScreen", { channelId: c })}
        className="mb-2 bg-primary-900 rounded-lg overflow-hidden"
      >
        <View className="flex-row justify-between items-center p-3">
          <View className="flex-1 mr-2">
            <View className="flex-row items-center">
              <Text className="font-bold text-white text-base mx-1 mb-1">
                #{c.channel_title || "Error loading channel title"}
              </Text>
              <Text className="text-gray-300 text-xs">{c.community_name}</Text>
            </View>
            <Text className="text-gray-400 text-xs mt-1" numberOfLines={1}>
              <Text className="font-semibold">{`${c.recent_message_sender}: `}</Text>
              {c.recent_message || "No Messages yet!"}
            </Text>
          </View>
          <TouchableOpacity
            onPress={() => removePinChannel(c.id)}
            className="p-2"
          >
            <MaterialCommunityIcons
              name="dots-vertical"
              size={20}
              color="white"
            />
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    ))
  }, [communityChannels, navigation, removePinChannel])

  const renderEventChats = useCallback(() => {
    return eventChats?.map((eventChat) => (
      <TouchableOpacity
        key={eventChat.id}
        onPress={() =>
          navigation.navigate("EventChat", { eventChat: eventChat })
        }
        className="mb-2 bg-primary-900 rounded-lg overflow-hidden"
      >
        <View className="p-3">
          <Text className="font-bold text-white text-base mb-1">
            {eventChat.event_chat_name}
          </Text>
          <Text className="text-gray-400 text-xs" numberOfLines={1}>
            <Text className="font-semibold">{`${eventChat.recent_sender_name}: `}</Text>
            {eventChat.recent_message || "No Messages yet!"}
          </Text>
        </View>
      </TouchableOpacity>
    ))
  }, [eventChats, navigation])

  return (
    <View className=" bg-primary-900">
      <View className="flex-row justify-around bg-primary-800 mb-2">
        <TouchableOpacity
          onPress={() => setSelectedTab("pinned")}
          className={`items-center py-3 px-4 ${
            selectedTab === "pinned" ? "border-b-2 border-blue-500" : ""
          }`}
        >
          <Text
            className={`text-white ${
              selectedTab === "pinned" ? "font-bold" : "font-semibold"
            }`}
          >
            Pinned Channels
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setSelectedTab("events")}
          className={`items-center py-3 px-4 ${
            selectedTab === "events" ? "border-b-2 border-blue-500" : ""
          }`}
        >
          <Text
            className={`text-white ${
              selectedTab === "events" ? "font-bold" : "font-semibold"
            }`}
          >
            Event Chats
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView className="h-full px-4">
        {selectedTab === "pinned" ? (
          <>
            {!loading && communityChannels && communityChannels.length > 0 ? (
              renderPinnedChannels()
            ) : loading ? (
              <ActivityIndicator color="white" className="mt-4" />
            ) : (
              <View className="flex items-center justify-center mt-8">
                <Text className="text-white font-bold text-center mb-4">
                  Join a Community to pin favourite channels!
                </Text>
                <TouchableOpacity
                  onPress={() => navigation.navigate("Communities")}
                  className="bg-blue-500 rounded-full p-3"
                >
                  <FontAwesome6
                    name="magnifying-glass"
                    size={24}
                    color="white"
                  />
                </TouchableOpacity>
              </View>
            )}
          </>
        ) : (
          <>
            {eventChats && eventChats.length > 0 ? (
              renderEventChats()
            ) : (
              <View className="flex items-center justify-center mt-8">
                <Text className="text-white font-bold text-center">
                  No Event Chats available.
                </Text>
              </View>
            )}
          </>
        )}
      </ScrollView>
    </View>
  )
})

export default PinnedChannels
