import { View, Text } from "react-native"
import React, { useCallback, useEffect, useState } from "react"

import SingleImageSupa from "../../../components/SingleImageSupa"

import { Profile } from "../../../@types/supabaseTypes"

type ImageGridProps = {
  currentUser: Profile
}

const ImageGrid = ({ currentUser }: ImageGridProps) => {
  const [imageFiles, setImageFiles] = useState<string[]>([])

  useEffect(() => {
    if (currentUser.photos_url && Array.isArray(currentUser.photos_url)) {
      setImageFiles(currentUser.photos_url)
    } else {
      setImageFiles([])
    }
  }, [currentUser])

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
