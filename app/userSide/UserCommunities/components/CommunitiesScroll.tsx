import { View, Text, ScrollView } from "react-native"
import React, { useState } from "react"
import SinglePic from "../../../components/SinglePic"
import { useAuth } from "../../../supabaseFunctions/authcontext"
import { FileObject } from "@supabase/storage-js"
import { useEffect } from "react"
import supabase from "../../../../lib/supabase"

const CommunitiesScroll = () => {
  const [files, setFiles] = useState<FileObject[]>([])
  const { user } = useAuth()

  useEffect(() => {
    if (!user) return

    loadImages()
  }, [user])

  const loadImages = async () => {
    const { data } = await supabase.storage.from("photos").list(user!.id)
    if (data) {
      setFiles(data)
    }
  }
  return (
    <View className="mt-8 px-5">
      <View className="px-3 mb-3">
        <Text className="font-bold text-3xl">My Communities</Text>
      </View>
      <ScrollView horizontal={true}>
        <View className="flex flex-row">
          <View className="m-2">
            <SinglePic
              size={55}
              avatarRadius={100}
              noAvatarRadius={100}
              item={files[0]}
            />
          </View>
          <View className="m-2">
            <SinglePic
              size={55}
              avatarRadius={100}
              noAvatarRadius={100}
              item={files[1]}
            />
          </View>
          <View className="m-2">
            <SinglePic
              size={55}
              avatarRadius={100}
              noAvatarRadius={100}
              item={files[2]}
            />
          </View>
        </View>
      </ScrollView>
    </View>
  )
}

export default CommunitiesScroll
