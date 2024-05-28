import { View, Text, ActivityIndicator } from "react-native"
import React, { useEffect, useState } from "react"
import { Communities, Profile } from "../../@types/supabaseTypes"
import SingleImageSupaCommunity from "../../components/EditCommunityPicture"
import useCurrentUser from "../../supabaseFunctions/getFuncs/useCurrentUser"
import { useAuth } from "../../supabaseFunctions/authcontext"
import getSingleCommunity from "../../supabaseFunctions/getFuncs/getSingleCommunity"

type ImageGridProp = {
  community: Communities
}

const CommunityImageGrid = ({ community }: ImageGridProp) => {
  const [loading, setLoading] = useState<boolean>(false)
  const [refresh, setRefresh] = useState<boolean>(false)
  const [imageFiles, setImageFiles] = useState<string[] | null | undefined>([])
  const [currentCommunity, setCurrentCommunity] = useState<Communities | null>(
    {} as Communities
  )
  const { user } = useAuth()

  const getCommunity = () => {
    if (community?.id === undefined) return
    getSingleCommunity(setLoading, community.id, setCurrentCommunity)
  }

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

  return (
    <View className="flex flex-row flex-wrap justify-center">
      {!loading ? (
        <>
          <View className="mx-1">
            <SingleImageSupaCommunity
              communityId={community.id}
              imageUrl={imageFiles?.[0]}
              listIndex={0}
              imageUrls={imageFiles}
              setImageUrls={setImageFiles}
              setRefresh={setRefresh}
            />
          </View>

          <View className="mx-1">
            <SingleImageSupaCommunity
              communityId={community.id}
              imageUrl={imageFiles?.[1]}
              listIndex={1}
              imageUrls={imageFiles}
              setImageUrls={setImageFiles}
              setRefresh={setRefresh}
            />
          </View>

          <View className="mx-1">
            <SingleImageSupaCommunity
              communityId={community.id}
              imageUrl={imageFiles?.[2]}
              listIndex={2}
              imageUrls={imageFiles}
              setImageUrls={setImageFiles}
              setRefresh={setRefresh}
            />
          </View>

          <View className="mx-1">
            <SingleImageSupaCommunity
              communityId={community.id}
              imageUrl={imageFiles?.[3]}
              listIndex={3}
              imageUrls={imageFiles}
              setImageUrls={setImageFiles}
              setRefresh={setRefresh}
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
