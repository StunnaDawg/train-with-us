import {
  View,
  Text,
  Pressable,
  ActivityIndicator,
  ScrollView,
  Alert,
  TouchableOpacity,
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
      <View
        key={c.id}
        className="mx-2 w-full border-b-slate-400 p-4 flex flex-row justify-between items-center border-b-2"
      >
        <TouchableOpacity
          onLongPress={() => {
            removePinChannel(c.id)
          }}
          onPress={() => {
            navigation.navigate("ChannelScreen", { channelId: c })
          }}
          className={pressedChannels[c.id] ? "opacity-50" : ""}
        >
          <View>
            <Text className="font-bold text-white">
              #{c.channel_title || "Error loading channel title"} in{" "}
              {c.community_name}
            </Text>
            <Text className="text-xs text-white">
              <Text>{`${c.recent_message_sender} said `}</Text>
              {c.recent_message || "No Messages yet!"}
            </Text>
          </View>
        </TouchableOpacity>
        <Pressable onPress={() => removePinChannel(c.id)}>
          <MaterialCommunityIcons
            name="dots-vertical"
            size={20}
            color="white"
          />
        </Pressable>
      </View>
    ))
  }, [communityChannels, navigation, removePinChannel, pressedChannels])

  const renderEventChats = useCallback(() => {
    return eventChats?.map((eventChat) => (
      <View
        key={eventChat.id}
        className="mx-2 w-full border-b-slate-400 p-4 flex flex-row justify-between items-center border-b-2"
      >
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("EventChat", {
              eventChat: eventChat,
            })
          }}
        >
          <View>
            <Text className="font-bold text-white">
              {eventChat.event_chat_name}
            </Text>
            <Text className="text-xs text-white">
              <Text>{`${eventChat.recent_sender_name} said `}</Text>
              {eventChat.recent_message || "No Messages yet!"}
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    ))
  }, [eventChats, navigation])

  return (
    <View className=" bg-primary-900">
      {/* Tabs */}
      <View className="flex-row justify-around bg-gray-800">
        <TouchableOpacity
          onPress={() => setSelectedTab("pinned")}
          className={`items-center py-4 ${
            selectedTab === "pinned" ? "border-b-2 border-blue-500" : ""
          }`}
        >
          <Text
            className={`text-white ${
              selectedTab === "pinned" ? "font-extrabold" : "font-semibold"
            }`}
          >
            Pinned Channels
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setSelectedTab("events")}
          className={` items-center py-4 ${
            selectedTab === "events" ? "border-b-2 border-blue-500" : ""
          }`}
        >
          <Text
            className={`text-white ${
              selectedTab === "events" ? "font-extrabold" : "font-semibold"
            }`}
          >
            Event Chats
          </Text>
        </TouchableOpacity>
      </View>

      {/* Content */}
      <ScrollView className=" h-full bg-gray-900">
        {selectedTab === "pinned" ? (
          <>
            {!loading && communityChannels && communityChannels.length > 0 ? (
              renderPinnedChannels()
            ) : loading ? (
              <ActivityIndicator />
            ) : (
              <View className="flex flex-row justify-center items-center p-4">
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
          </>
        ) : (
          <>
            {eventChats && eventChats.length > 0 ? (
              renderEventChats()
            ) : (
              <View className="flex items-center justify-center p-4">
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
