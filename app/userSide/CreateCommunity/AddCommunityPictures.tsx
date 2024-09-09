import { View, Text, SafeAreaView } from "react-native"
import React from "react"
import { RouteProp, useRoute } from "@react-navigation/native"
import { RootStackParamList } from "../../@types/navigation"
import CreateCommunityImageGrid from "./CreateCommunityImageGrid"
import CreateCommunityTopBar from "./components/TopBar"

const AddCommunityPictures = () => {
  const route =
    useRoute<RouteProp<RootStackParamList, "ChooseCommunityActivities">>()
  const communityId = route.params.communityId
  return (
    <SafeAreaView className="flex-1">
      <CreateCommunityTopBar text="Choose Images" functionProp={() => {}} />
      <View>
        <CreateCommunityImageGrid communityId={communityId} />
      </View>
    </SafeAreaView>
  )
}

export default AddCommunityPictures
