import { View, Text, SafeAreaView } from "react-native"
import React, { useEffect, useState } from "react"
import { RouteProp, useRoute } from "@react-navigation/native"
import { RootStackParamList } from "../../@types/navigation"
import SingleImageSupa from "../../components/SingleImageSupa"
import { useAuth } from "../../supabaseFunctions/authcontext"
import getSingleCommunity from "../../supabaseFunctions/getFuncs/getSingleCommunity"
import SingleImageSupaCommunity from "../../components/EditCommunityPicture"

const CommunitySettings = () => {
  const route = useRoute<RouteProp<RootStackParamList, "MyCommunitySettings">>()
  const community = route.params.community

  const [imageFiles, setImageFiles] = useState<string[] | null | undefined>([])
  const { user } = useAuth()

  useEffect(() => {
    setImageFiles(community.community_photos)
  }, [community])

  return (
    <SafeAreaView className="flex-1">
      <View>
        <SingleImageSupaCommunity
          communityId={community.id}
          imageUrl={imageFiles?.[0]}
          listIndex={2}
          imageUrls={community.community_photos}
          setImageUrls={setImageFiles}
          profilePic={true}
        />
      </View>
    </SafeAreaView>
  )
}

export default CommunitySettings
