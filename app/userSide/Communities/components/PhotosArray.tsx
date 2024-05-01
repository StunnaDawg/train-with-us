import { View, Text, ScrollView, Pressable } from "react-native"
import React, { useEffect, useState } from "react"
import SinglePic from "../../../components/SinglePic"
import { useAuth } from "../../../supabaseFunctions/authcontext"
import supabase from "../../../../lib/supabase"
import { FileObject } from "@supabase/storage-js"
import { Communities } from "../../../@types/supabaseTypes"
import getSingleCommunity from "../../../supabaseFunctions/getFuncs/getSingleCommunity"

type PhotoArrayProps = {
  community: Communities
}

const PhotoArray = ({ community }: PhotoArrayProps) => {
  const [loading, setLoading] = useState<boolean>(false)
  const [currentCommunity, setCurrentCommunity] = useState<Communities | null>(
    {} as Communities
  )
  const [imageFiles, setImageFiles] = useState<string[] | null | undefined>([])
  const { user } = useAuth()

  useEffect(() => {
    if (!user) return

    getSingleCommunity(setLoading, community.id, setCurrentCommunity)
  }, [user])

  useEffect(() => {
    if (currentCommunity?.community_photos === null || undefined) return
    setImageFiles(currentCommunity?.community_photos)
  }, [currentCommunity])
  return (
    <View>
      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
        <View className="m-1">
          <SinglePic
            size={165}
            avatarRadius={10}
            noAvatarRadius={10}
            item={imageFiles?.[0]}
          />
        </View>

        <View className="m-1">
          <SinglePic
            size={165}
            avatarRadius={10}
            noAvatarRadius={10}
            item={imageFiles?.[1]}
          />
        </View>
        <View className="m-1">
          <SinglePic
            size={165}
            avatarRadius={10}
            noAvatarRadius={10}
            item={imageFiles?.[2]}
          />
        </View>
        <View className="m-1">
          <SinglePic
            size={165}
            avatarRadius={10}
            noAvatarRadius={10}
            item={imageFiles?.[3]}
          />
        </View>
      </ScrollView>
    </View>
  )
}

export default PhotoArray
