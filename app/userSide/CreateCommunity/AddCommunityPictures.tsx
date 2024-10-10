import { View, Text, SafeAreaView, ScrollView } from "react-native"
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
      <ScrollView className="flex-1 px-4">
        <CreateCommunityImageGrid communityId={communityId} />
      </ScrollView>
      <View className="flex flex-row justify-center px-4 pb-6 pt-2">
        <GenericButton
          text="Continue"
          buttonFunction={() =>
            navigation.navigate("CreateAboutCommunity", { communityId })
          }
          colourDefault="bg-white"
          colourPressed="bg-yellow-300"
          borderColourDefault="border-transparent"
          borderColourPressed="border-yellow-400"
          textSize="text-lg"
          roundness="rounded-full"
          width={300}
          padding="py-4"
          textColour="text-gray-800"
        />
      </View>
    </SafeAreaView>
  )
}

export default AddCommunityPictures
