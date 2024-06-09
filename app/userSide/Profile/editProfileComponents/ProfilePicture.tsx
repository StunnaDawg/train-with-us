import { View, Text } from "react-native"
import React, { useEffect, useState } from "react"
import SingleEditPic from "../../../components/SingleEditPic"
import ProfilePicSupa from "../../../components/EditProfilePicture"
import { useAuth } from "../../../supabaseFunctions/authcontext"
import { Profile } from "../../../@types/supabaseTypes"
import useCurrentUser from "../../../supabaseFunctions/getFuncs/useCurrentUser"
import BackButton from "../../../components/BackButton"

const ProfilePicture = () => {
  const [currentUser, setCurrentUser] = useState<Profile | null>({} as Profile)
  const [profilePic, setProfilePic] = useState<string | null | undefined>()
  const { user } = useAuth()

  useEffect(() => {
    if (!user) return

    useCurrentUser(user?.id, setCurrentUser)
  }, [user])

  useEffect(() => {
    if (
      currentUser?.profile_pic === null ||
      currentUser?.profile_pic === undefined
    )
      return
    setProfilePic(currentUser?.profile_pic)
  }, [currentUser])

  return (
    <View>
      <View className="items-center flex flex-row justify-between">
        <View className="mx-2">
          <BackButton size={28} />
        </View>
        <Text className="font-bold text-lg">Edit Profile Picture</Text>
        <View />
      </View>

      <View>
        <ProfilePicSupa
          imageUrl={profilePic}
          imageUrlToRead={profilePic}
          setImageUrl={setProfilePic}
        />
      </View>
    </View>
  )
}

export default ProfilePicture
