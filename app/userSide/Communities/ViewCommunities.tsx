import { View, SafeAreaView, ScrollView } from "react-native"
import React, { useEffect, useState } from "react"
import ViewCommunityTitle from "./components/ViewCommunityTitle"
import CommunityContact from "./components/CommunityContact"
import CommunityMap from "./components/CommunityMap"
import PhotoArray from "./components/PhotosArray"
import CommunityAbout from "./components/CommunityAbout"
import UpcomingCommunityEvents from "./components/UpcomingEvents"
import { Communities } from "../../@types/supabaseTypes"
import getSingleCommunity from "../../supabaseFunctions/getFuncs/getSingleCommunity"
import { RootStackParamList } from "../../@types/navigation"
import { RouteProp, useRoute } from "@react-navigation/native"

const ViewCommunities = () => {
  const [loading, setLoading] = useState<boolean>(true)
  const [community, setCommunities] = useState<Communities | null>(null)

  const route =
    useRoute<RouteProp<RootStackParamList, "ViewCommunitiesScreen">>()
  const communityId = route.params.communityId

  useEffect(() => {
    getSingleCommunity(setLoading, communityId, setCommunities)
  }, [])

  return (
    <SafeAreaView className=" flex-1 bg-primary-900 ">
      <ScrollView>
        <View>
          <ViewCommunityTitle community={community} communityId={communityId} />
        </View>

        <View className="mt-2">
          {community ? <PhotoArray community={community} /> : null}
        </View>

        <View className="flex flex-row justify-center items-center mt-4">
          <View className="m-4">
            <CommunityContact community={community} />
          </View>

          <View className="m-4">
            <CommunityMap />
          </View>
        </View>

        <View>
          <CommunityAbout community={community} />
        </View>

        <View>
          <UpcomingCommunityEvents community={community} />
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default ViewCommunities
