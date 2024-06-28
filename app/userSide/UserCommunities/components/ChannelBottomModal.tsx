import { View, Text, Pressable, ScrollView } from "react-native"
import React, { useEffect, useState } from "react"
import {
  CommunityChannel,
  CommunityMembership,
} from "../../../@types/supabaseTypes"
import leaveChannel from "../../../supabaseFunctions/deleteFuncs/leaveChannel"
import showAlert from "../../../utilFunctions/showAlert"
import showAlertFunc from "../../../utilFunctions/showAlertFunc"
import { ca, se } from "date-fns/locale"
import { useNavigation } from "@react-navigation/native"
import { NavigationType } from "../../../@types/navigation"
import { FontAwesome6 } from "@expo/vector-icons"
import getSingleChannelSettings from "../../../supabaseFunctions/getFuncs/getCommunityChannelMemberSettings"
import supabase from "../../../../lib/supabase"

type ChannelBottomModalProps = {
  channel: CommunityChannel
  userId: string | null | undefined
  setLoading: React.Dispatch<React.SetStateAction<boolean>>
}

type MuteChannelProps = {
  muteValue: boolean
  channelId: string
  communityId: number
  userId: string
  setLoading: React.Dispatch<React.SetStateAction<boolean>>
  setMuted: React.Dispatch<React.SetStateAction<boolean>>
}

const muteChannel = async ({
  muteValue,
  channelId,
  communityId,
  userId,
  setLoading,
  setMuted,
}: MuteChannelProps) => {
  setLoading(true)
  console.log("Mute value", channelId)
  try {
    const { error } = await supabase
      .from("community_channel_membership")
      .upsert({ muted: muteValue })
      .eq("channel_id", channelId)
      .eq("community_id", communityId)
      .eq("user_id", userId)

    if (error) {
      console.error("Error fetching community channels:", error.message)
      showAlert({
        title: `Error ${muteValue ? "muting" : "un muting"} channel`,
        message: `There was an error ${
          muteValue ? "muting" : "un muting"
        } the channel. Please try again.`,
      })
      setMuted(!muteValue)
      throw error
    }

    setMuted(muteValue)
  } catch (error) {
    console.log(error)
  } finally {
    setLoading(false)
  }
}

const ChannelBottomModal = ({
  channel,
  userId,
  setLoading,
}: ChannelBottomModalProps) => {
  const navigation = useNavigation<NavigationType>()
  const [muted, setMuted] = useState<boolean>(false)
  const [channelMemberSettings, setChannelMemberSettings] =
    useState<CommunityMembership | null>(null)
  const leaveChannelHandler = async () => {
    try {
      if (userId && channel.id) {
        leaveChannel(setLoading, channel.id, userId)
        navigation.goBack()
      } else {
        showAlert({
          title: "Authentication error",
          message: "There was an error leaving the channel. Please try again.",
        })
        console.error("Error leaving channel: userId or channel id is null")
      }
    } catch (error) {
      console.error("Error leaving channel:", error)
    } finally {
      setLoading(false)
    }
  }

  const muteChannelHandler = async () => {
    if (userId && channel.id && channel.community) {
      muteChannel({
        muteValue: true,
        channelId: channel.id,
        communityId: channel.community,
        userId,
        setLoading,
        setMuted,
      })

      setMuted(true)
    }
  }

  const unMuteChannel = async () => {
    try {
      if (userId && channel.id && channel.community) {
        muteChannel({
          muteValue: false,
          channelId: channel.id,
          communityId: channel.community,
          userId,
          setLoading,
          setMuted,
        })

        showAlert({
          title: "Channel muted",
          message: "You have successfully muted the channel.",
        })
      } else {
        showAlert({
          title: "Authentication error",
          message: "There was an error muting the channel. Please try again.",
        })
        console.error("Error muting channel: userId or channel id is null")
      }
    } catch (error) {
      console.error("Error muting channel:", error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (userId && channel.id) {
      getSingleChannelSettings(
        channel.community,
        channel.id,
        userId,
        setLoading,
        setChannelMemberSettings
      )
    }
  }, [userId, channel.id])

  useEffect(() => {
    setMuted(channelMemberSettings?.muted || false)
  }, [channelMemberSettings])
  return (
    <>
      <View>
        <View className="flex flex-row justify-end">
          <View className="m-2">
            <Pressable
              onPress={() => {
                showAlertFunc({
                  title: "Leave Channel",
                  message: "Are you sure you want to leave this Channel?",
                  buttons: [
                    {
                      text: "No I want to stay",
                      onPress: () => console.log("Cancel Pressed"),
                      style: "default",
                    },
                    {
                      text: "Leave",
                      onPress: () => leaveChannelHandler(),
                      style: "destructive",
                    },
                  ],
                })
              }}
            >
              <Text className="font-bold underline text-red-700">Leave</Text>
            </Pressable>
          </View>
        </View>
        <View className="flex flex-row justify-center">
          <View className="items-center">
            <Text className="text-lg font-bold"># {channel.channel_title}</Text>
            {muted ? (
              <Pressable
                onPress={() =>
                  showAlertFunc({
                    title: "Turn on Notifications",
                    message:
                      "Do you want to turn on notifications for this channel?",
                    buttons: [
                      {
                        text: "Cancel",
                        onPress: () => console.log("Cancel Pressed"),
                        style: "cancel",
                      },
                      {
                        text: "Turn on Notifications",
                        onPress: () => unMuteChannel(),
                        style: "default",
                      },
                    ],
                  })
                }
                className="bg-red-500 rounded-xl flex flex-row justify-center items-center p-1"
              >
                <Text className="font-bold mx-1 ">Channel is Muted</Text>
                <FontAwesome6 name="bell-slash" size={24} color="black" />
              </Pressable>
            ) : (
              <Pressable
                onPress={() =>
                  showAlertFunc({
                    title: "Mute Notifications",
                    message: "Are you sure you want to mute this Channel?",
                    buttons: [
                      {
                        text: "Cancel",
                        onPress: () => console.log("Cancel Pressed"),
                        style: "default",
                      },
                      {
                        text: "Mute Notifications",
                        onPress: () => muteChannelHandler(),
                        style: "destructive",
                      },
                    ],
                  })
                }
                className="bg-blue-300 rounded-xl flex flex-row justify-center items-center p-2"
              >
                <Text className="font-bold mx-1 ">
                  Channel Notifications are on
                </Text>
                <FontAwesome6 name="bell" size={24} color="black" />
              </Pressable>
            )}
          </View>
        </View>
      </View>
      <ScrollView></ScrollView>
    </>
  )
}

export default ChannelBottomModal
