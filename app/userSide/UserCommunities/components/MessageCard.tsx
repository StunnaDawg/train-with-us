import { View, Text } from "react-native"
import React, { useEffect, useState } from "react"
import SinglePic from "../../../components/SinglePic"
import { useAuth } from "../../../supabaseFunctions/authcontext"
import useCurrentUser from "../../../supabaseFunctions/getFuncs/useCurrentUser"
import { Profile } from "../../../@types/supabaseTypes"
import SinglePicCommunity from "../../../components/SinglePicCommunity"

type MessageCardProps = {
  otherUserId: string | null
  recentMessage: string | null
}

const MessageCard = ({ otherUserId, recentMessage }: MessageCardProps) => {
  const [profile, setProfile] = useState<Profile | null>({} as Profile)
  const [imageFiles, setImageFiles] = useState<string[] | null | undefined>([])
  const { user } = useAuth()

  useEffect(() => {
    if (!user || !otherUserId) return

    console.log("otherUserId", otherUserId)

    useCurrentUser(otherUserId, setProfile)
  }, [user])

  return (
    <View className="flex flex-row items-center">
      <View className="m-2">
        <SinglePicCommunity
          size={55}
          avatarRadius={100}
          noAvatarRadius={100}
          item={profile?.profile_pic}
        />
      </View>

      <View>
        <Text className="font-bold text-white text-xl">
          {!profile ? null : profile.first_name}
        </Text>
        <Text className="text-white font-semibold text-lg">
          {!recentMessage ? "No Messages yet!" : recentMessage}
        </Text>
      </View>
    </View>
  )
}

export default MessageCard
