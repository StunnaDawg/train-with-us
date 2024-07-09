import { View, Text, Pressable } from "react-native"
import React, { useEffect, useState } from "react"
import SinglePic from "../../../components/SinglePic"
import { useAuth } from "../../../supabaseFunctions/authcontext"
import useCurrentUser from "../../../supabaseFunctions/getFuncs/useCurrentUser"
import { Profile } from "../../../@types/supabaseTypes"

type UserProfilePicProps = {
  refresh: boolean
  profile: Profile | null
}

const UserProfilePic = ({ refresh, profile }: UserProfilePicProps) => {
  const [currentUser, setCurrentUser] = useState<Profile | null>({} as Profile)
  const [profilePic, setProfilePic] = useState<string | null>(null)
  const { user } = useAuth()

  useEffect(() => {
    if (!user) return

    useCurrentUser(user?.id, setCurrentUser)
  }, [user])

  useEffect(() => {
    if (!user) return

    useCurrentUser(user?.id, setCurrentUser)
  }, [refresh])

  useEffect(() => {
    if (
      currentUser?.profile_pic === null ||
      currentUser?.profile_pic === undefined
    )
      return
    console.log("Profile picture", currentUser?.profile_pic)
    setProfilePic(currentUser?.profile_pic)
  }, [currentUser])
  return (
    <View className="flex flex-row justify-center mt-12">
      <View>
        <SinglePic
          size={150}
          item={profilePic}
          avatarRadius={230}
          noAvatarRadius={230}
        />
        <View className="flex flex-row justify-center mt-4 items-center">
          <Text className="font-bold text-xl mx-2">{profile?.first_name}</Text>
        </View>
      </View>
    </View>
  )
}

export default UserProfilePic
