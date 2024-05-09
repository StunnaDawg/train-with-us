import { View, Text, SafeAreaView } from "react-native"
import React, { useEffect, useState } from "react"
import { RouteProp, useRoute } from "@react-navigation/native"
import { RootStackParamList } from "../../@types/navigation"
import SingleImageSupa from "../../components/SingleImageSupa"
import { useAuth } from "../../supabaseFunctions/authcontext"
import getSingleCommunity from "../../supabaseFunctions/getFuncs/getSingleCommunity"
import SingleImageSupaCommunity from "../../components/EditCommunityPicture"
import CommunityProfilePicSupa from "../../components/CommunityProfilePicture"

const CommunitySettings = () => {
  const route = useRoute<RouteProp<RootStackParamList, "MyCommunitySettings">>()
  const community = route.params.community

  const [imageFiles, setImageFiles] = useState<string[] | null | undefined>([])
  const [singleImageFile, setSingleImageFile] = useState<
    string | null | undefined
  >(null)
  const { user } = useAuth()

  useEffect(() => {
    setSingleImageFile(community.community_profile_pic)
  }, [community])

  useEffect(() => {
    setImageFiles(community.community_photos)
  }, [community])

  return (
    <SafeAreaView className="flex-1">
      <View>
        <CommunityProfilePicSupa
          communityId={community.id}
          imageUrl={singleImageFile}
          imageUrlToRead={singleImageFile}
          setImageUrl={setSingleImageFile}
        />
      </View>
    </SafeAreaView>
  )
}

export default CommunitySettings
