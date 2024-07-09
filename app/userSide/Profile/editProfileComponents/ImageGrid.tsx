import { View, Text } from "react-native"
import React, { useCallback, useEffect, useState } from "react"
import SingleEditPic from "../../../components/SingleEditPic"
import supabase from "../../../../lib/supabase"
import { useAuth } from "../../../supabaseFunctions/authcontext"
import { FileObject } from "@supabase/storage-js"
import SingleImageSupa from "../../../components/SingleImageSupa"
import useCurrentUser from "../../../supabaseFunctions/getFuncs/useCurrentUser"
import { Profile } from "../../../@types/supabaseTypes"
import { useFocusEffect } from "@react-navigation/native"

type ImageGridProps = { currentUser: Profile | null }

const ImageGrid = ({ currentUser }: ImageGridProps) => {
  const [imageFiles, setImageFiles] = useState<string[] | null | undefined>([])

  useEffect(() => {
    if (currentUser?.photos_url) {
      setImageFiles(currentUser.photos_url)
    }
  }, [currentUser])

  useFocusEffect(
    useCallback(() => {
      const getSetPhotos = async () => {
        if (currentUser?.photos_url) {
          setImageFiles(currentUser.photos_url)
        }
      }

      getSetPhotos()

      return () => {
        // Optional cleanup actions
      }
    }, [currentUser])
  )

  return (
    <View className="flex flex-row flex-wrap justify-center">
      {Array.from({ length: 6 }).map((_, index) => (
        <View key={index}>
          <SingleImageSupa
            size={110}
            imageUrl={imageFiles?.[index]}
            listIndex={index}
            imageUrls={currentUser?.photos_url}
            setImageUrls={setImageFiles}
          />
        </View>
      ))}
    </View>
  )
}

export default ImageGrid
