import { View, Text } from "react-native"
import React, { useEffect, useState } from "react"
import SinglePic from "../../../components/SinglePic"
import { useAuth } from "../../../supabaseFunctions/authcontext"
import supabase from "../../../../lib/supabase"
import { FileObject } from "@supabase/storage-js"

const ViewEventTitle = () => {
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
    <View className="flex flex-row items-center justify-center">
      <View className="m-5 items-center">
        <Text className="text-xl font-bold">Friday, May 10th</Text>
        <View className="border rounded-full p-1 px-4 bg-white border-white">
          <Text className="text-xl font-semibold">Blended Athletics</Text>
        </View>
        <Text className="text-xl font-bold">Event Type</Text>
      </View>

      <View className="border-white border-4">
        <SinglePic
          size={150}
          avatarRadius={0}
          noAvatarRadius={0}
          item={files[0]}
        />
      </View>
    </View>
  )
}

export default ViewEventTitle
