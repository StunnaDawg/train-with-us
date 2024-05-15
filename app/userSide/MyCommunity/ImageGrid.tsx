import { View, Text, ActivityIndicator } from "react-native"
import React, { useEffect, useState } from "react"
import { Communities, Profile } from "../../@types/supabaseTypes"
import { useAuth } from "../../supabaseFunctions/authcontext"
import SingleImageSupaCommunity from "../../components/EditCommunityPicture"
import { get } from "mongoose"
import getSingleCommunity from "../../supabaseFunctions/getFuncs/getSingleCommunity"

type ImageGridProp = {
  community: Communities
}

const CommunityImageGrid = ({ community }: ImageGridProp) => {
  const [loading, setLoading] = useState<boolean>(false)
  const [imageFiles, setImageFiles] = useState<string[] | null | undefined>([])
  const [communityState, setCommunityState] = useState<Communities | null>(
    {} as Communities
  )
  const { user } = useAuth()

  useEffect(() => {
    setLoading(true)
    if (communityState?.community_photos === null) return
    setImageFiles(community?.community_photos)
    setLoading(false)
  }, [communityState])

  return (
    <View className="flex flex-row flex-wrap justify-center">
      {!loading ? (
        <>
          <View className="mx-1">
            <SingleImageSupaCommunity
              communityId={community.id}
              imageUrl={imageFiles?.[0]}
              listIndex={2}
              imageUrls={imageFiles}
              setImageUrls={setImageFiles}
            />
          </View>

          <View className="mx-1">
            <SingleImageSupaCommunity
              communityId={community.id}
              imageUrl={imageFiles?.[1]}
              listIndex={2}
              imageUrls={imageFiles}
              setImageUrls={setImageFiles}
            />
          </View>

          <View className="mx-1">
            <SingleImageSupaCommunity
              communityId={community.id}
              imageUrl={imageFiles?.[2]}
              listIndex={2}
              imageUrls={imageFiles}
              setImageUrls={setImageFiles}
            />
          </View>

          <View className="mx-1">
            <SingleImageSupaCommunity
              communityId={community.id}
              imageUrl={imageFiles?.[3]}
              listIndex={2}
              imageUrls={imageFiles}
              setImageUrls={setImageFiles}
            />
          </View>
        </>
      ) : (
        <ActivityIndicator />
      )}
    </View>
  )
}

export default CommunityImageGrid
