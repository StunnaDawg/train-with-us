import { View, Text, ScrollView, Pressable } from "react-native"
import React, { useState } from "react"
import SinglePic from "../../../components/SinglePic"
import supabase from "../../../../lib/supabase"
import { FileObject } from "@supabase/storage-js"
import { useEffect } from "react"
import { useAuth } from "../../../supabaseFunctions/authcontext"
import { Profile } from "../../../@types/supabaseTypes"
import useCurrentUser from "../../../supabaseFunctions/getFuncs/useCurrentUser"

type PhotoArrayProps = {
  profileId: string | null | undefined
}

const PhotoArray = ({ profileId }: PhotoArrayProps) => {
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
          <SinglePic
            size={150}
            avatarRadius={10}
            noAvatarRadius={10}
            item={imageFiles?.[0]}
          />
        </View>

        <View className="m-1">
          <SinglePic
            size={150}
            avatarRadius={10}
            noAvatarRadius={10}
            item={imageFiles?.[1]}
          />
        </View>
        <View className="m-1">
          <SinglePic
            size={150}
            avatarRadius={10}
            noAvatarRadius={10}
            item={imageFiles?.[1]}
          />
        </View>
        <View className="m-1">
          <SinglePic
            size={150}
            avatarRadius={10}
            noAvatarRadius={10}
            item={imageFiles?.[2]}
          />
        </View>
      </ScrollView>
    </View>
  )
}

export default PhotoArray
