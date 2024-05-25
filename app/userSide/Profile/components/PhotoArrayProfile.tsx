import { View, Text, ScrollView, Pressable } from "react-native"
import React, { useState } from "react"
import SinglePic from "../../../components/SinglePic"
import { useEffect } from "react"
import { useAuth } from "../../../supabaseFunctions/authcontext"
import { Profile } from "../../../@types/supabaseTypes"
import useCurrentUser from "../../../supabaseFunctions/getFuncs/useCurrentUser"
import SinglePicProfileView from "../../../components/SinglePicProfileView"

type PhotoArrayProps = {
  profileId: string | null | undefined
  index1: number
  index2: number
  index3: number
}

const PhotoArrayProfile = ({
  profileId,
  index1,
  index2,
  index3,
}: PhotoArrayProps) => {
  const [currentUser, setCurrentUser] = useState<Profile | null>({} as Profile)
  const [imageFiles, setImageFiles] = useState<string[] | null | undefined>([])
  const { user } = useAuth()

  useEffect(() => {
    if (!user || profileId === null || profileId === undefined) return

    useCurrentUser(profileId, setCurrentUser)
  }, [user])

  useEffect(() => {
    if (currentUser?.photos_url === null || undefined) return
    setImageFiles(currentUser?.photos_url)
  }, [currentUser])
  return (
    <View>
      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
        <View className="m-1">
          <SinglePicProfileView
            size={150}
            avatarRadius={10}
            noAvatarRadius={10}
            item={imageFiles?.[index1]}
          />
        </View>

        <View className="m-1">
          <SinglePicProfileView
            size={150}
            avatarRadius={10}
            noAvatarRadius={10}
            item={imageFiles?.[index2]}
          />
        </View>
        <View className="m-1">
          <SinglePicProfileView
            size={150}
            avatarRadius={10}
            noAvatarRadius={10}
            item={imageFiles?.[index3]}
          />
        </View>
      </ScrollView>
    </View>
  )
}

export default PhotoArrayProfile
