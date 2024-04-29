import { View, Text, SafeAreaView, ScrollView } from "react-native"
import React, { useEffect, useState } from "react"
import ImageGrid from "./editProfileComponents/ImageGrid"
import Zodiac from "./editProfileComponents/Zodiac"
import * as FileSystem from "expo-file-system"
import { FileObject } from "@supabase/storage-js"
import { useAuth } from "../../supabaseFunctions/authcontext"
import supabase from "../../../lib/supabase"

const EditProfile = () => {
  const { user } = useAuth()
  const [files, setFiles] = useState<FileObject[]>([])
  const zodiac = "Gemini"

  useEffect(() => {
    if (!user) return

    // Load user images
    loadImages()
  }, [user])

  const loadImages = async () => {
    const { data } = await supabase.storage.from("files").list(user!.id)
    if (data) {
      setFiles(data)
    }
  }
  return (
    <SafeAreaView className="flex-1">
      <ScrollView>
        <View>
          <ImageGrid />
        </View>

        <View>
          <Zodiac zodiac={zodiac} />
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default EditProfile
