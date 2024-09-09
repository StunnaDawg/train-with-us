import { View, Text, ActivityIndicator } from "react-native"
import React, { useEffect, useState } from "react"
import { Communities, Profile } from "../../@types/supabaseTypes"
import SingleImageSupaCommunity from "../../components/EditCommunityPicture"
type ImageGridProp = {
  communityId: number
}

const CreateCommunityImageGrid = ({ communityId }: ImageGridProp) => {
  const [refresh, setRefresh] = useState<boolean>(false)
  const [imageFiles, setImageFiles] = useState<string[] | null | undefined>([])

  return (
    <View className="flex flex-row flex-wrap justify-center">
      <View className="mx-1">
        <SingleImageSupaCommunity
          communityId={communityId}
          imageUrl={imageFiles?.[0]}
          listIndex={0}
          imageUrls={imageFiles}
          setImageUrls={setImageFiles}
          setRefresh={setRefresh}
        />
      </View>

      <View className="mx-1">
        <SingleImageSupaCommunity
          communityId={communityId}
          imageUrl={imageFiles?.[1]}
          listIndex={1}
          imageUrls={imageFiles}
          setImageUrls={setImageFiles}
          setRefresh={setRefresh}
        />
      </View>

      <View className="mx-1">
        <SingleImageSupaCommunity
          communityId={communityId}
          imageUrl={imageFiles?.[2]}
          listIndex={2}
          imageUrls={imageFiles}
          setImageUrls={setImageFiles}
          setRefresh={setRefresh}
        />
      </View>

      <View className="mx-1">
        <SingleImageSupaCommunity
          communityId={communityId}
          imageUrl={imageFiles?.[3]}
          listIndex={3}
          imageUrls={imageFiles}
          setImageUrls={setImageFiles}
          setRefresh={setRefresh}
        />
      </View>
    </View>
  )
}

export default CreateCommunityImageGrid
