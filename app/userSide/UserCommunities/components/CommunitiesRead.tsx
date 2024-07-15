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
import { CommunityChannel, Profile } from "../../../@types/supabaseTypes"
import getUserPinnedChannels from "../../../supabaseFunctions/getFuncs/getUserPinnedChannels"
import { useFocusEffect, useNavigation } from "@react-navigation/native"
import { NavigationType } from "../../../@types/navigation"
import SinglePicCommunity from "../../../components/SinglePicCommunity"
import { MaterialCommunityIcons } from "@expo/vector-icons"
import { useAuth } from "../../../supabaseFunctions/authcontext"
import SinglePic from "../../../components/SinglePic"

const CommunitiesRead = React.memo(() => {
  const { user } = useAuth()

  const [loading, setLoading] = useState<boolean>(false)
  const [communityChannels, setCommunityChannels] = useState<
    CommunityChannel[] | null
  >([])
  const navigation = useNavigation<NavigationType>()

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

  const renderChannels = useCallback(() => {
    return communityChannels?.map((c) => (
      <View className="flex-1">
        <View
          key={c.id}
          className="border-b-slate-400 p-4 flex flex-row justify-between items-center border-b-2 w-full"
        >
          <Pressable
            key={c.id}
            onPress={() => {
              if (c.channel_type === "Annoucement") {
                navigation.navigate("AnnouncementChannel", { channelId: c })
              } else {
                navigation.navigate("ChannelScreen", { channelId: c })
              }
            }}
            className="flex-1"
          >
            <View>
              <Text className="font-bold mb-1 text-sm text-white">
                #{c.channel_title || "Error loading channel title"}
              </Text>
            </View>
          </Pressable>
          <Pressable onPress={() => removePinChannel(c.id)} className="ml-32">
            <MaterialCommunityIcons
              name="dots-vertical"
              size={20}
              color="white"
            />
          </Pressable>
        </View>
      </View>
    ))
  }, [communityChannels, navigation, removePinChannel])

  return (
    <View>
      <ScrollView className="h-full">
        {!loading && communityChannels && communityChannels.length > 0 ? (
          renderChannels()
        ) : communityChannels?.length && communityChannels.length > 0 ? (
          <ActivityIndicator />
        ) : (
          <View className="flex-1 flex justify-center items-center">
            <View className="flex flex-row justify-center items-center">
              <Text className="text-white font-bold text-center p-2">
                Join a Community to pin your favourite channels!
              </Text>
            </View>
          </View>
        )}
      </ScrollView>
    </View>
  )
})

export default CommunitiesRead
