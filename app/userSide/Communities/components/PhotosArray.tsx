import { View, Text, ScrollView, Pressable } from "react-native"
import React, { useEffect, useState } from "react"
import SinglePic from "../../../components/SinglePic"
import { useAuth } from "../../../supabaseFunctions/authcontext"
import supabase from "../../../../lib/supabase"
import { FileObject } from "@supabase/storage-js"

const PhotoArray = () => {
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
    <View>
      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
        <View className="m-1">
          <SinglePic
            size={165}
            avatarRadius={10}
            noAvatarRadius={10}
            item={files[0]}
          />
        </View>

        <View className="m-1">
          <SinglePic
            size={165}
            avatarRadius={10}
            noAvatarRadius={10}
            item={files[1]}
          />
        </View>
        <View className="m-1">
          <SinglePic
            size={165}
            avatarRadius={10}
            noAvatarRadius={10}
            item={files[2]}
          />
        </View>
        <View className="m-1">
          <SinglePic
            size={165}
            avatarRadius={10}
            noAvatarRadius={10}
            item={files[3]}
          />
        </View>
      </ScrollView>
    </View>
  )
}

export default PhotoArray
