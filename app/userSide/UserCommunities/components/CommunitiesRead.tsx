import {
  View,
  Text,
  Pressable,
  ActivityIndicator,
  ScrollView,
  Alert,
} from "react-native"
import React, { useCallback, useEffect, useState } from "react"
import { useAuth } from "../../../supabaseFunctions/authcontext"
import supabase from "../../../../lib/supabase"
import { CommunityChannel } from "../../../@types/supabaseTypes"
import getUserPinnedChannels from "../../../supabaseFunctions/getFuncs/getUserPinnedChannels"
import { useFocusEffect, useNavigation } from "@react-navigation/native"
import { NavigationType } from "../../../@types/navigation"
import SinglePicCommunity from "../../../components/SinglePicCommunity"
import { MaterialCommunityIcons } from "@expo/vector-icons"

const CommunitiesRead = () => {
  const [loading, setLoading] = useState<boolean>(false)
  const navigation = useNavigation<NavigationType>()

  const [communityChannels, setCommunityChannels] = useState<
    CommunityChannel[] | null
  >([])
  const { user } = useAuth()

  const showAlert = (onConfirm: () => void) =>
    Alert.alert(
      "Do you want to unpin this channel?",
      "Please select an option.",
      [
        {
          text: "Yes",
          onPress: onConfirm,
        },
        {
          text: "Cancel",
          style: "cancel",
        },
      ],
      {
        cancelable: true,
      }
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

        // filters out the pinned channel from the profile
        const updatedPinnedChannels = profile.pinned_channels.filter(
          (url: string) => url !== channelId
        )

        // Update the profile with the new array
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
          getUserPinnedChannels(setLoading, user?.id, setCommunityChannels)
          console.log("Channel unpinned successfully!")
        }
      } catch (err) {
        console.error("Error pinning channel:", err)
      }
    })
  }

  useEffect(() => {
    if (!user) return
    getUserPinnedChannels(setLoading, user?.id, setCommunityChannels)
  }, [user])

  useEffect(() => {
    console.log("community channels fetched", communityChannels)
  }, [communityChannels])

  useFocusEffect(
    useCallback(() => {
      const getUser = async () => {
        setLoading(true)
        if (!user) return
        getUserPinnedChannels(setLoading, user?.id, setCommunityChannels)
        setLoading(false)
      }

      getUser()

      return () => {
        // Optional cleanup actions
      }
    }, [user, setCommunityChannels])
  )
  return (
    <View className="mt-8 mx-8 pb-2 h-full">
      <View>
        <Text className="font-bold text-lg text-white">My Pinned Channels</Text>
      </View>

      <ScrollView className="h-full">
        {!loading && communityChannels && communityChannels.length > 0 ? (
          communityChannels.map((c) => (
            <View key={c.id} className="flex-row justify-between items-center">
              <Pressable
                key={c.id}
                onPress={() => {
                  if (c.channel_type === "Annoucement") {
                    navigation.navigate("AnnouncementChannel", {
                      channelId: c,
                    })
                  } else {
                    navigation.navigate("ChannelScreen", {
                      channelId: c,
                    })
                  }
                }}
                className="flex flex-row items-center"
              >
                <View className="m-2">
                  <SinglePicCommunity
                    size={50}
                    avatarRadius={100}
                    noAvatarRadius={100}
                    item={c.channel_pic} // Assuming this is correctly accessing the picture property
                  />
                </View>

                <View>
                  <Text className="font-bold mb-1 text-sm text-white">
                    {c.channel_title || "error loading channel title"}
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
        ) : (
          <ActivityIndicator />
        )}
      </ScrollView>
    </View>
  )
}

export default CommunitiesRead
