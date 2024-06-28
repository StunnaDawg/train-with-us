import {
  View,
  Text,
  SafeAreaView,
  Pressable,
  ScrollView,
  ActivityIndicator,
  Alert,
} from "react-native"
import React, { useCallback, useEffect, useMemo, useRef, useState } from "react"
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native"
import { NavigationType, RootStackParamList } from "../../@types/navigation"
import getSingleCommunity from "../../supabaseFunctions/getFuncs/getSingleCommunity"
import {
  Communities,
  CommunityChannel,
  CommunityMembership,
  Profile,
} from "../../@types/supabaseTypes"
import getCommunityChannels from "../../supabaseFunctions/getFuncs/getCommunityChannels"
import SinglePic from "../../components/SinglePic"
import { Entypo } from "@expo/vector-icons"
import { useAuth } from "../../supabaseFunctions/authcontext"
import supabase from "../../../lib/supabase"
import BackButton from "../../components/BackButton"
import CommunityBottomModal from "./CommunityBottomModal"
import { BottomSheetModal, useBottomSheetModal } from "@gorhom/bottom-sheet"
import { FontAwesome6 } from "@expo/vector-icons"
import getCommunityMemberShips from "../../supabaseFunctions/getFuncs/getCommunityChannelMemberships"
import joinChannel from "../../supabaseFunctions/addFuncs/joinChannel"
import useCurrentUser from "../../supabaseFunctions/getFuncs/useCurrentUser"
import showAlert from "../../utilFunctions/showAlert"

const CommunityPage = () => {
  const [loading, setLoading] = useState<boolean>(false)
  const [community, setCommunity] = useState<Communities | null>(null)
  const [profile, setProfile] = useState<Profile | null>(null)
  const [communityChannels, setCommunityChannels] = useState<
    CommunityChannel[] | null
  >([])
  const [communityMemberShips, setCommunityMemberShips] = useState<
    CommunityMembership[] | null
  >([])
  const route = useRoute<RouteProp<RootStackParamList, "CommunityPage">>()
  const communityId = route.params.communityId
  const navigation = useNavigation<NavigationType>()
  const { user } = useAuth()
  const bottomSheetModalRef = useRef<BottomSheetModal>(null)
  const { dismiss } = useBottomSheetModal()

  useEffect(() => {
    getSingleCommunity(setLoading, communityId, setCommunity)
  }, [communityId])

  useEffect(() => {
    if (!community || !user?.id) return
    getCommunityChannels(communityId, setLoading, setCommunityChannels)

    getCommunityMemberShips(
      communityId,
      user.id,
      setLoading,
      setCommunityMemberShips
    )

    useCurrentUser(user.id, setProfile)
  }, [community])

  const snapPoints = useMemo(() => ["1%", "90%"], [])

  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present()
  }, [])
  const handleSheetChanges = useCallback((index: number) => {
    console.log("handleSheetChanges", index)
  }, [])

  const showAlertConfirm = (onConfirm: () => void) =>
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
    showAlertConfirm(async () => {
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
    <SafeAreaView className="flex-1">
      <ScrollView className="flex-1">
        <View className="m-2">
          <View className="flex flex-row justify-between mb-1">
            <BackButton size={22} />
            <Pressable
              className="flex flex-row items-center"
              onPress={() => handlePresentModalPress()}
            >
              <Text className="font-bold text-sm mx-1">
                {`${community?.community_title}`}'s Community Page
              </Text>
              <FontAwesome6 name="chevron-right" size={16} color="black" />
            </Pressable>
            <View />
          </View>

          <View className="m-2">
            <Text className="text-sm underline">Information Channels</Text>
            {!loading && communityChannels && communityChannels.length > 0 ? (
              communityChannels.map((c) => {
                if (c.channel_type !== "Annoucement") return null

                return (
                  <View
                    key={c.id}
                    className="flex-row justify-between items-center"
                  >
                    <Pressable
                      onPress={() =>
                        navigation.navigate("AnnouncementChannel", {
                          channelId: c,
                        })
                      }
                      className="flex flex-row items-center"
                    >
                      <View className="m-2">
                        <SinglePic
                          size={50}
                          avatarRadius={100}
                          noAvatarRadius={100}
                          item={c.channel_pic}
                        />
                      </View>

                      <View>
                        <Text className="text-sm font-bold mb-1">
                          {c.channel_title || "error loading channel title"}
                        </Text>
                      </View>
                    </Pressable>

                    <Pressable onPress={() => pinChannel(c.id)}>
                      <Entypo name="pin" size={16} color="black" />
                    </Pressable>
                  </View>
                )
              })
            ) : (
              <ActivityIndicator />
            )}
          </View>

          <View className="m-2">
            <Text className="text-sm underline">Text Channels</Text>
            {!communityChannels?.length ? (
              <ActivityIndicator />
            ) : (
              communityChannels.map((c) => {
                if (c.channel_type !== "Text") return null

                const isMember = communityMemberShips?.some(
                  (membership) => membership.channel_id === c.id
                )

                return (
                  <View
                    key={c.id}
                    className="flex-row justify-between items-center"
                  >
                    <Pressable
                      onPress={() => {
                        // Allow navigation only if the channel is not private or the user is a member
                        if (!c.private || isMember) {
                          navigation.navigate("ChannelScreen", {
                            channelId: c,
                          })
                        } else {
                          Alert.alert(
                            "Restricted Access",
                            "You must join this channel to view its content."
                          )
                        }
                      }}
                      className="flex flex-row items-center"
                    >
                      <View className="m-2">
                        <SinglePic
                          size={50}
                          avatarRadius={100}
                          noAvatarRadius={100}
                          item={c.channel_pic}
                        />
                      </View>

                      <View>
                        <Text className="text-sm font-bold mb-1">
                          {c.channel_title || "error loading channel title"}
                        </Text>
                        {c.private && (
                          <Text className="text-xs text-red-500">
                            (Private)
                          </Text>
                        )}
                      </View>
                    </Pressable>

                    {c.private && !isMember && (
                      <Pressable
                        onPress={() => {
                          if (
                            profile?.id &&
                            communityId &&
                            c.id &&
                            c.channel_title
                          ) {
                            joinChannel(
                              setLoading,
                              c.id,
                              profile.id,
                              communityId,
                              profile.expo_push_token || "",
                              c.channel_title
                            )
                          } else {
                            Alert.alert(
                              "Error",
                              "Unable to join the channel. Please try again later."
                            )
                          }
                        }}
                        className="bg-blue-500 rounded-full p-2"
                      >
                        <Text className="text-white">Join</Text>
                      </Pressable>
                    )}

                    {(c.private === false || isMember) && (
                      <Pressable onPress={() => pinChannel(c.id)}>
                        <Entypo name="pin" size={16} color="black" />
                      </Pressable>
                    )}
                  </View>
                )
              })
            )}
          </View>
        </View>
      </ScrollView>

      <BottomSheetModal
        enablePanDownToClose={true}
        ref={bottomSheetModalRef}
        index={1}
        snapPoints={snapPoints}
        onChange={handleSheetChanges}
      >
        <CommunityBottomModal community={community} />
      </BottomSheetModal>
    </SafeAreaView>
  )
}

export default CommunityPage
