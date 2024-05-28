import {
  View,
  Text,
  SafeAreaView,
  Pressable,
  ScrollView,
  ActivityIndicator,
  Alert,
} from "react-native"
import React, { useEffect, useState } from "react"
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native"
import { NavigationType, RootStackParamList } from "../../@types/navigation"
import getSingleCommunity from "../../supabaseFunctions/getFuncs/getSingleCommunity"
import { Communities, CommunityChannel } from "../../@types/supabaseTypes"
import getCommunityChannels from "../../supabaseFunctions/getFuncs/getCommunityChannels"
import SinglePic from "../../components/SinglePic"
import { Entypo } from "@expo/vector-icons"
import { useAuth } from "../../supabaseFunctions/authcontext"
import supabase from "../../../lib/supabase"
import BackButton from "../../components/BackButton"

const CommunityPage = () => {
  const [loading, setLoading] = useState<boolean>(false)
  const [community, setCommunity] = useState<Communities | null>(null)
  const [communityChannels, setCommunityChannels] = useState<
    CommunityChannel[] | null
  >([])
  const route = useRoute<RouteProp<RootStackParamList, "CommunityPage">>()
  const communityId = route.params.communityId
  const navigation = useNavigation<NavigationType>()
  const { user } = useAuth()

  useEffect(() => {
    getSingleCommunity(setLoading, communityId, setCommunity)
  }, [communityId])

  useEffect(() => {
    if (!community) return
    getCommunityChannels(communityId, setLoading, setCommunityChannels)
  }, [community])

  const showAlert = (onConfirm: () => void) =>
    Alert.alert(
      "Do you want to pin this channel?",
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

  const pinChannel = async (channelId: string) => {
    showAlert(async () => {
      try {
        // Assuming you have a way to get the current user's ID

        if (!user?.id) {
          console.error("No user logged in!")
          return
        }

        // Fetch the current user's profile
        const { data: profile, error } = await supabase
          .from("profiles")
          .select("pinned_channels")
          .eq("id", user.id)
          .single()

        if (error) {
          console.error("Failed to fetch user profile:", error.message)
          return
        }

        // Update the pinned_channels array, avoiding duplicates
        const updatedPinnedChannels = [
          ...(profile.pinned_channels || []),
          channelId,
        ].filter((value, index, self) => self.indexOf(value) === index) // Remove duplicates

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
          console.log("Channel pinned successfully!")
        }
      } catch (err) {
        console.error("Error pinning channel:", err)
      }
    })
  }

  return (
    <SafeAreaView>
      <ScrollView>
        <View className="m-2">
          <View className="flex flex-row justify-between">
            <BackButton size={32} />
            <Text className="font-bold text-xl">
              {`${community?.community_title}`}'s Community Page
            </Text>
            <View />
          </View>

          {!loading && communityChannels && communityChannels.length > 0 ? (
            communityChannels.map((c) => (
              <View
                key={c.id}
                className="flex-row justify-between items-center"
              >
                <Pressable
                  onPress={() =>
                    navigation.navigate("ChannelScreen", {
                      channelId: c,
                    })
                  }
                  className="flex flex-row items-center"
                >
                  <View className="m-2">
                    <SinglePic
                      size={55}
                      avatarRadius={100}
                      noAvatarRadius={100}
                      item={c.channel_pic} // Assuming this is correctly accessing the picture property
                    />
                  </View>

                  <View>
                    <Text className="text-xl font-bold mb-1">
                      {c.channel_title || "error loading channel title"}{" "}
                      {c.channel_type === "Announcement"
                        ? `#${c.channel_type}`
                        : null}
                    </Text>
                  </View>
                </Pressable>

                <Pressable onPress={() => pinChannel(c.id)}>
                  <Entypo name="pin" size={24} color="black" />
                </Pressable>
              </View>
            ))
          ) : (
            <ActivityIndicator /> // Changed to handle the loading state
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default CommunityPage
