import { View, Text, ActivityIndicator } from "react-native"
import React, { useEffect, useState } from "react"
import { Communities, Profile } from "../../@types/supabaseTypes"
import SingleImageSupaCommunity from "../../components/EditCommunityPicture"
type ImageGridProp = {
  community: Communities
}

const CommunityImageGrid = ({ community }: ImageGridProp) => {
  const [loading, setLoading] = useState<boolean>(false)
  const [refresh, setRefresh] = useState<boolean>(false)
  const [imageFiles, setImageFiles] = useState<string[] | null | undefined>([])

  useEffect(() => {
    setLoading(true)
    if (community?.community_photos === null) return
    setImageFiles(community?.community_photos)
    setLoading(false)
  }, [community])

  // useEffect(() => {
  //   setLoading(true)
  //   getCommunity()
  //   if (currentCommunity?.community_photos === null) return
  //   setImageFiles(currentCommunity?.community_photos)
  //   setLoading(false)
  // }, [refresh])

  const renderImage = (index: number) => (
    <View className="w-1/2 aspect-square p-1">
      <SingleImageSupaCommunity
        communityId={community.id}
        imageUrl={imageFiles?.[index]}
        listIndex={index}
        imageUrls={imageFiles}
        setImageUrls={setImageFiles}
        setRefresh={setRefresh}
      />
    </View>
  )

  return (
    <View className="flex-1">
      {!loading ? (
        <View className="flex-row flex-wrap">
          {renderImage(0)}
          {renderImage(1)}
          {renderImage(2)}
          {renderImage(3)}
        </View>
      ) : (
        <View className="flex-1 justify-center items-center">
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      )}
    </View>
  )
}

export default CommunityImageGrid
