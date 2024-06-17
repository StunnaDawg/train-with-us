import { View, Text, Pressable } from "react-native"
import React, { useEffect, useState } from "react"
import { Profile } from "../@types/supabaseTypes"
import { useAuth } from "../supabaseFunctions/authcontext"
import useCurrentUser from "../supabaseFunctions/getFuncs/useCurrentUser"
import SinglePicCommunity from "./SinglePicCommunity"
import { FontAwesome6 } from "@expo/vector-icons"

type ShareProfileProps = {
  profileId: string | null
  chatSessionId: string | null
  setSessionsToSend: React.Dispatch<React.SetStateAction<string[]>>
}

const ShareProfile = ({
  profileId,
  chatSessionId,
  setSessionsToSend,
}: ShareProfileProps) => {
  const [profile, setProfile] = useState<Profile | null>({} as Profile)
  const [isPressed, setIsPressed] = useState(false)
  const { user } = useAuth()

  const shareProfileFunc = () => {
    if (!chatSessionId) return

    if (isPressed) {
      setIsPressed(false)
      setSessionsToSend((prev) =>
        prev.filter((session) => session !== chatSessionId)
      )
    } else {
      setIsPressed(true)
      setSessionsToSend((prev) => [...prev, chatSessionId])
    }
  }

  useEffect(() => {
    if (!user || !profileId) return

    console.log("profileId", profileId)

    useCurrentUser(profileId, setProfile)
  }, [user])

  return (
    <Pressable
      onPress={() => shareProfileFunc()}
      className="relative items-center"
    >
      <SinglePicCommunity
        item={profile?.profile_pic}
        size={75}
        avatarRadius={100}
        noAvatarRadius={100}
      />
      <Text className="font-bold">
        {profile ? profile.first_name : "Loading..."}
      </Text>
      {isPressed && (
        <View className="absolute right-0 bottom-4 bg-white rounded-full">
          <FontAwesome6 name="check-circle" size={24} color="green" />
        </View>
      )}
    </Pressable>
  )
}

export default ShareProfile

{
  /* <FontAwesome6 name="circle-check" size={24} color="black" /> */
}
