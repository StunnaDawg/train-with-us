import { View, SafeAreaView } from "react-native"
import React, { useState } from "react"
import {
  NavigationType,
  RootStackParamList,
  TabNavigationType,
} from "../../@types/navigation"
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native"
import supabase from "../../../lib/supabase"
import EnhancedTextInput from "../../components/TextInput"
import GenericButton from "../../components/GenericButton"
import CreateCommunityTopBar from "./components/TopBar"

const CreateAboutCommunity = () => {
  const route =
    useRoute<RouteProp<RootStackParamList, "CreateAboutCommunity">>()
  const communityId = route.params.communityId

  const navigation = useNavigation<TabNavigationType>()

  const [bio, setBio] = useState<string>("")

  const handleCommunityUpdate = async () => {
    try {
      const { error } = await supabase
        .from("communities")
        .upsert({ id: communityId, about: bio })

      if (error) throw error

      navigation.navigate("Community")
    } catch (error) {
      console.error("Failed to update community preferences:", error)
    }
  }
  return (
    <SafeAreaView className="flex-1 bg-primary-900">
      <View>
        <View>
          <CreateCommunityTopBar
            text="Write a bio!"
            functionProp={async () => navigation.goBack()}
          />

          <View className="flex flex-row justify-center">
            <EnhancedTextInput
              text={bio}
              setText={setBio}
              placeholder="We're a community of..."
            />
          </View>
          <View className="flex flex-row justify-center m-4">
            <GenericButton
              text="Continue"
              buttonFunction={() => handleCommunityUpdate()}
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
        </View>
      </View>
    </SafeAreaView>
  )
}

export default CreateAboutCommunity
