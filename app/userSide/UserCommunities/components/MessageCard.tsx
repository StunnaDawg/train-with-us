import { View, Text } from "react-native"
import React, { useEffect, useState } from "react"
import SinglePic from "../../../components/SinglePic"
import { useAuth } from "../../../supabaseFunctions/authcontext"
import useCurrentUser from "../../../supabaseFunctions/getFuncs/useCurrentUser"
import { Profile } from "../../../@types/supabaseTypes"

type MessageCardProps = {
  otherUserId: string | null
}

const MessageCard = ({ otherUserId }: MessageCardProps) => {
  const [profile, setProfile] = useState<Profile | null>({} as Profile)
  const [imageFiles, setImageFiles] = useState<string[] | null | undefined>([])
  const { user } = useAuth()

  useEffect(() => {
    if (!user || !otherUserId) return

    console.log("otherUserId", otherUserId)

    useCurrentUser(otherUserId, setProfile)
  }, [user])

  useEffect(() => {
    if (profile?.photos_url === null || undefined) return
    setImageFiles(profile?.photos_url)
  }, [profile])
  return (
    <View className="flex flex-row items-center">
      <View className="m-2">
        <SinglePic
          size={55}
          avatarRadius={100}
          noAvatarRadius={100}
          item={imageFiles?.[0]}
        />
      </View>

      <View>
        <Text className="font-bold mb-1">
          {!profile ? null : profile.first_name}
        </Text>
        <Text className="text-sm">Hey, how are you?</Text>
      </View>
    </View>
  )
}

export default MessageCard
