import { View, Text } from "react-native"
import React, { Dispatch, SetStateAction, useEffect, useState } from "react"
import { useAuth } from "../../../supabaseFunctions/authcontext"
import useCurrentUser from "../../../supabaseFunctions/getFuncs/useCurrentUser"
import { Profile } from "../../../@types/supabaseTypes"
import SinglePicCommunity from "../../../components/SinglePicCommunity"
import { formatDistanceToNowStrict } from "date-fns"

type MessageCardProps = {
  otherUserId: string | null
  recentMessage: string | null
  updatedAt: string | null
}

const formatRelativeTime = (timestamp: string) => {
  if (!timestamp) return "Unknown time" // handle null, undefined, etc.

  const date = new Date(timestamp)
  return formatDistanceToNowStrict(date, { addSuffix: true })
}

const truncateMessage = (message: string, maxLength: number) => {
  if (message.length <= maxLength) {
    return message
  }
  return message.substring(0, maxLength) + "..."
}

const MessageCard = ({
  otherUserId,
  recentMessage,
  updatedAt,
}: MessageCardProps) => {
  const [profile, setProfile] = useState<Profile | null>({} as Profile)

  const { user } = useAuth()

  useEffect(() => {
    if (!user || !otherUserId) return

    console.log("otherUserId", otherUserId)

    useCurrentUser(otherUserId, setProfile)
  }, [user])

  return (
    <View className="flex-1 w-full">
      <View className="flex flex-row items-center">
        <View className="m-1">
          <SinglePicCommunity
            size={50}
            avatarRadius={100}
            noAvatarRadius={100}
            item={profile?.profile_pic}
          />
        </View>

        <View>
          <View className="w-full flex flex-row justify-between items-center">
            <Text className="font-bold text-white text-sm">
              {!profile ? null : profile.first_name}
            </Text>

            <Text className="text-white text-xs first-line:font-bold mr-20">
              {updatedAt ? formatRelativeTime(updatedAt) : null}
            </Text>
          </View>
          <View>
            <Text className="text-white font-semibold text-xs">
              {!recentMessage
                ? "No Messages yet!"
                : truncateMessage(recentMessage, 20)}
            </Text>
          </View>
        </View>
      </View>
    </View>
  )
}

export default MessageCard
