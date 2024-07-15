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

type CommunitiesReadProps = {
  user: Profile | null
}

const CommunitiesRead = ({ user }: CommunitiesReadProps) => {
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
        if (!user?.id) {
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
      <View
        key={c.id}
        className="w-full flex flex-row justify-between items-center"
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
          className="flex flex-row items-center"
        >
          <View className="m-2">
            <SinglePicCommunity
              size={50}
              avatarRadius={100}
              noAvatarRadius={100}
              item={c.channel_pic}
            />
          </View>
          <View>
            <Text className="font-bold mb-1 text-sm text-white">
              {c.channel_title || "Error loading channel title"}
            </Text>
            <Text className="text-xs font-bold text-white">
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
}

export default CommunitiesRead
