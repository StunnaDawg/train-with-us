import { View, Text, ScrollView, Pressable, Alert } from "react-native"
import React, { useEffect, useState } from "react"
import { Entypo } from "@expo/vector-icons"
import {
  Communities,
  CommunityChannel,
  CommunityMembership,
  Profile,
} from "../../../@types/supabaseTypes"
import getCommunityChannels from "../../../supabaseFunctions/getFuncs/getCommunityChannels"
import getCommunityMemberShips from "../../../supabaseFunctions/getFuncs/getCommunityChannelMemberships"
import useCurrentUser from "../../../supabaseFunctions/getFuncs/useCurrentUser"
import supabase from "../../../../lib/supabase"
import { useAuth } from "../../../supabaseFunctions/authcontext"
import { useNavigation } from "@react-navigation/native"
import { NavigationType } from "../../../@types/navigation"
import joinChannel from "../../../supabaseFunctions/addFuncs/joinChannel"

type CommunityPageChannelsProps = {
  community: Communities | null
  loading: boolean
  setLoadingState: React.Dispatch<React.SetStateAction<boolean>>
}

const CommunityPageChannels = ({
  community,
  loading,
  setLoadingState,
}: CommunityPageChannelsProps) => {
  const { user } = useAuth()
  const [pressedChannels, setPressedChannels] = useState<{
    [key: string]: boolean
  }>({})
  const [profile, setProfile] = useState<Profile | null>(null)
  const [communityChannels, setCommunityChannels] = useState<
    CommunityChannel[] | null
  >([])
  const [communityMemberShips, setCommunityMemberShips] = useState<
    CommunityMembership[] | null
  >([])
  const navigation = useNavigation<NavigationType>()

  const handlePressIn = (channelId: string) => {
    setPressedChannels((prev) => ({ ...prev, [channelId]: true }))
  }

  const handlePressOut = (channelId: string) => {
    setPressedChannels((prev) => ({ ...prev, [channelId]: false }))
  }

  const fetchData = async () => {
    setLoadingState(true)
    if (!community || !user?.id) return

    try {
      await getCommunityChannels(
        community.id,
        setLoadingState,
        setCommunityChannels
      )
      await getCommunityMemberShips(
        community.id,
        user.id,
        setLoadingState,
        setCommunityMemberShips
      )
      useCurrentUser(user.id, setProfile)
      setLoadingState(false)
    } catch (error) {
      console.error("Error fetching community channels:", error)
    } finally {
      setLoadingState(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [community])

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
      ]
    )

  const pinChannel = async (channelId: string) => {
    showAlertConfirm(async () => {
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
        const updatedPinnedChannels = [
          ...(profile.pinned_channels || []),
          channelId,
        ].filter((value, index, self) => self.indexOf(value) === index)
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
    <ScrollView className="bg-primary-900 flex-1">
      <View className="m-1">
        {!loading && communityChannels && communityChannels.length > 0
          ? communityChannels.map((c) => {
              if (c.channel_type !== "Text") return null
              const isMember = communityMemberShips?.some(
                (membership) => membership.channel_id === c.id
              )
              return (
                <View
                  key={c.id}
                  className={`${
                    pressedChannels[c.id] ? "opacity-40" : "opacity-100"
                  } bg-slate-800 border p-3 flex-row justify-between items-center my-2 rounded-md`}
                >
                  <Pressable
                    onPressIn={() => handlePressIn(c.id)}
                    onPressOut={() => handlePressOut(c.id)}
                    onPress={() => {
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
                    <View>
                      <Text className="text-sm text-white font-bold mb-1">
                        #{c.channel_title || "error loading channel title"}
                      </Text>
                      <Text className="text-xs text-white">
                        <Text>
                          {`${c.recent_message_sender} said ` || null}
                        </Text>
                        {c.recent_message || "No Messages yet!"}
                      </Text>
                    </View>
                  </Pressable>
                  {c.private && !isMember && (
                    <Pressable
                      onPress={async () => {
                        if (
                          profile?.id &&
                          community?.id &&
                          c.id &&
                          c.channel_title
                        ) {
                          joinChannel(
                            setLoadingState,
                            c.id,
                            profile.id,
                            community.id,
                            profile.expo_push_token || "",
                            c.channel_title
                          )
                          await fetchData()
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
                      <Entypo name="pin" size={16} color="white" />
                    </Pressable>
                  )}
                </View>
              )
            })
          : null}
      </View>
    </ScrollView>
  )
}

export default CommunityPageChannels
