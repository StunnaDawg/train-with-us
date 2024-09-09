import { View, Text, SafeAreaView } from "react-native"
import React from "react"
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native"
import { NavigationType, RootStackParamList } from "../../@types/navigation"
import CreateCommunityImageGrid from "./CreateCommunityImageGrid"
import CreateCommunityTopBar from "./components/TopBar"
import GenericButton from "../../components/GenericButton"

const AddCommunityPictures = () => {
  const navigation = useNavigation<NavigationType>()
  const route =
    useRoute<RouteProp<RootStackParamList, "AddNewCommunityPhotos">>()
  const communityId = route.params.communityId
  return (
    <SafeAreaView className="flex-1 bg-primary-900">
      <CreateCommunityTopBar
        text="Choose Images"
        functionProp={() => {
          navigation.navigate("CreateAboutCommunity", { communityId })
        }}
      />
      <View className="m-2">
        <CreateCommunityImageGrid communityId={communityId} />
      </View>

      <View className="flex flex-row justify-center m-4">
        <GenericButton
          text="Continue"
          buttonFunction={() =>
            navigation.navigate("CreateAboutCommunity", { communityId })
          }
          colourDefault="bg-white"
          colourPressed="bg-yellow-300"
          borderColourDefault="border-black"
          borderColourPressed="border-black"
          textSize="text-lg"
          roundness="rounded-lg"
          width={300}
          padding="p-2"
        />
      </View>
    </SafeAreaView>
  )
}

export default AddCommunityPictures
