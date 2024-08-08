import { View, Text } from "react-native"
import React, { useEffect, useState } from "react"
import ProfilePicSupa from "../../../components/EditProfilePicture"
import { Profile } from "../../../@types/supabaseTypes"

type ProfilePictureProps = {
  currentUser: Profile | null
}

const ProfilePicture = ({ currentUser }: ProfilePictureProps) => {
  return (
    <View>
      <View>
        <ProfilePicSupa
          size={120}
          imageUrl={currentUser?.profile_pic || null}
          imageUrlToRead={currentUser?.profile_pic || null}
        />
      </View>
    </View>
  )
}

export default ProfilePicture
