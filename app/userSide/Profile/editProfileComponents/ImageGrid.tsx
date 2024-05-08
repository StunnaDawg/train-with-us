import { View, Text } from "react-native"
import React, { useEffect, useState } from "react"
import SingleEditPic from "../../../components/SingleEditPic"
import supabase from "../../../../lib/supabase"
import { useAuth } from "../../../supabaseFunctions/authcontext"
import { FileObject } from "@supabase/storage-js"
import SingleImageSupa from "../../../components/SingleImageSupa"
import useCurrentUser from "../../../supabaseFunctions/getFuncs/useCurrentUser"
import { Profile } from "../../../@types/supabaseTypes"

const ImageGrid = () => {
  const [currentUser, setCurrentUser] = useState<Profile | null>({} as Profile)
  const [imageFiles, setImageFiles] = useState<string[] | null | undefined>([])
  const [loading, setLoading] = useState<boolean>(false)
  const { user } = useAuth()

  useEffect(() => {
    if (!user) return

    useCurrentUser(user?.id, setCurrentUser)
  }, [user])

  useEffect(() => {
    if (currentUser?.photos_url === null || undefined) return
    setImageFiles(currentUser?.photos_url)
  }, [currentUser])

  return (
    <View className="flex flex-row flex-wrap justify-center">
      <View className="mx-1">
        <SingleImageSupa
          setLoadingNewPic={setLoading}
          imageUrl={imageFiles?.[0]}
          listIndex={2}
          imageUrls={currentUser?.photos_url}
          setImageUrls={setImageFiles}
        />
      </View>

      <View className="mx-1">
        <SingleImageSupa
          setLoadingNewPic={setLoading}
          imageUrl={imageFiles?.[1]}
          listIndex={2}
          imageUrls={currentUser?.photos_url}
          setImageUrls={setImageFiles}
        />
      </View>

      <View className="mx-1">
        <SingleImageSupa
          setLoadingNewPic={setLoading}
          imageUrl={imageFiles?.[2]}
          listIndex={2}
          imageUrls={currentUser?.photos_url}
          setImageUrls={setImageFiles}
        />
      </View>

      <View className="mx-1">
        <SingleImageSupa
          setLoadingNewPic={setLoading}
          imageUrl={imageFiles?.[3]}
          listIndex={2}
          imageUrls={currentUser?.photos_url}
          setImageUrls={setImageFiles}
        />
      </View>

      <View className="mx-1">
        <SingleImageSupa
          setLoadingNewPic={setLoading}
          imageUrl={imageFiles?.[4]}
          listIndex={2}
          imageUrls={currentUser?.photos_url}
          setImageUrls={setImageFiles}
        />
      </View>

      <View className="mx-1">
        <SingleImageSupa
          setLoadingNewPic={setLoading}
          imageUrl={imageFiles?.[5]}
          listIndex={2}
          imageUrls={currentUser?.photos_url}
          setImageUrls={setImageFiles}
        />
      </View>
    </View>
  )
}

export default ImageGrid
