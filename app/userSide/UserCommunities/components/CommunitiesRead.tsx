import { View, Text, Pressable } from "react-native"
import React, { useEffect, useState } from "react"
import SinglePic from "../../../components/SinglePic"
import { useAuth } from "../../../supabaseFunctions/authcontext"
import supabase from "../../../../lib/supabase"
import { FileObject } from "@supabase/storage-js"
import { Communities } from "../../../@types/supabaseTypes"
import getSingleCommunity from "../../../supabaseFunctions/getFuncs/getSingleCommunity"

const CommunitiesRead = () => {
  const [loading, setLoading] = useState<boolean>(false)
  const [currentCommunity, setCurrentCommunity] = useState<Communities | null>(
    {} as Communities
  )
  const [imageFiles, setImageFiles] = useState<string[] | null | undefined>([])
  const { user } = useAuth()

  useEffect(() => {
    if (!user || !currentCommunity) return

    getSingleCommunity(setLoading, currentCommunity?.id, setCurrentCommunity)
  }, [user])

  useEffect(() => {
    if (currentCommunity?.community_photos === null || undefined) return
    setImageFiles(currentCommunity?.community_photos)
  }, [currentCommunity])
  return (
    <View className="mt-8 mx-8 pb-2">
      <View>
        <Text className="font-bold text-xl">My Messages</Text>
      </View>

      <Pressable className="flex flex-row items-center">
        <View className="m-2">
          <SinglePic
            size={55}
            avatarRadius={100}
            noAvatarRadius={100}
            item={imageFiles?.[0]}
          />
        </View>

        <View>
          <Text className="font-bold mb-1">#5AM</Text>
          <Text className="text-sm">Hey, how are you?</Text>
        </View>
      </Pressable>
    </View>
  )
}

export default CommunitiesRead
