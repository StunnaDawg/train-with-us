import { View, Text } from "react-native"
import React, { useCallback, useEffect, useState } from "react"

import SingleImageSupa from "../../../components/SingleImageSupa"

import { Profile } from "../../../@types/supabaseTypes"

type ImageGridProps = {
  currentUser: Profile
}

const ImageGrid = ({ currentUser }: ImageGridProps) => {
  return (
    <View className="flex flex-row flex-wrap justify-center">
      {Array.from({ length: 6 }).map((_, index) => (
        <View key={index}>
          <SingleImageSupa
            size={110}
            imageUrl={currentUser?.photos_url?.[index] || null}
            listIndex={index}
          />
        </View>
      ))}
    </View>
  )
}

export default ImageGrid
