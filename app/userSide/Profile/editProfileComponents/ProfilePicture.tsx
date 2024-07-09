import { View, Text } from "react-native"
import React, { useEffect, useState } from "react"
import ProfilePicSupa from "../../../components/EditProfilePicture"
import { Profile } from "../../../@types/supabaseTypes"

type ProfilePictureProps = {
  currentUser: Profile | null
  setLoading: React.Dispatch<React.SetStateAction<boolean>>
}

const ProfilePicture = ({ currentUser, setLoading }: ProfilePictureProps) => {
  const [profilePic, setProfilePic] = useState<string | null | undefined>()

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
      <View>
        <ProfilePicSupa
          size={120}
          imageUrl={profilePic}
          imageUrlToRead={profilePic}
          setImageUrl={setProfilePic}
        />
      </View>
    </View>
  )
}

export default ProfilePicture
