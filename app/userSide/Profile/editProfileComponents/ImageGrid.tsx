import { View, Text } from "react-native"
import React, { useEffect, useState } from "react"
import SingleEditPic from "../../../components/SingleEditPic"
import supabase from "../../../../lib/supabase"
import { useAuth } from "../../../supabaseFunctions/authcontext"
import { FileObject } from "@supabase/storage-js"

const ImageGrid = () => {
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
    <View className="flex flex-row flex-wrap justify-center">
      <View className="mx-1">
        <SingleEditPic item={files[0]} />
      </View>

      <View className="mx-1">
        <SingleEditPic item={files[1]} />
      </View>

      <View className="mx-1">
        <SingleEditPic item={files[2]} />
      </View>

      <View className="mx-1">
        <SingleEditPic item={files[3]} />
      </View>

      <View className="mx-1">
        <SingleEditPic item={files[4]} />
      </View>

      <View className="mx-1">
        <SingleEditPic item={files[5]} />
      </View>
    </View>
  )
}

export default ImageGrid
