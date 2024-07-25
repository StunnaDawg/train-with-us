import { View, Text } from "react-native"
import React, { useCallback, useEffect, useState } from "react"

import SingleImageSupa from "../../../components/SingleImageSupa"

import { Profile } from "../../../@types/supabaseTypes"
import { useFocusEffect } from "@react-navigation/native"

type ImageGridProps = {
  currentUser: Profile
  setLoading: React.Dispatch<React.SetStateAction<boolean>>
}

const ImageGrid = ({ currentUser, setLoading }: ImageGridProps) => {
  const [imageFiles, setImageFiles] = useState<string[]>([])

  useEffect(() => {
    if (currentUser.photos_url && Array.isArray(currentUser.photos_url)) {
      setImageFiles(currentUser.photos_url)
    } else {
      setImageFiles([]) // Or handle this case as needed
    }
  }, [currentUser])

  useFocusEffect(
    useCallback(() => {
      const getSetPhotos = async () => {
        if (currentUser?.photos_url && Array.isArray(currentUser.photos_url)) {
          setImageFiles(currentUser.photos_url)
        } else {
          setImageFiles([]) // Or handle this case as needed
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
            imageUrls={currentUser.photos_url}
            setImageUrls={setImageFiles}
          />
        </View>
      ))}
    </View>
  )
}

export default ImageGrid
