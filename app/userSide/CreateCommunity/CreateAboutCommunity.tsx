import React, { useState } from "react"
import { View, Text, SafeAreaView, TouchableOpacity } from "react-native"
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native"
import { NavigationType, RootStackParamList } from "../../@types/navigation"
import supabase from "../../../lib/supabase"
import EnhancedTextInput from "../../components/TextInput"
import CreateCommunityTopBar from "./components/TopBar"
import showAlert from "../../utilFunctions/showAlert"

const CreateAboutCommunity = () => {
  const route =
    useRoute<RouteProp<RootStackParamList, "CreateAboutCommunity">>()
  const communityId = route.params.communityId
  const navigation = useNavigation<NavigationType>()
  const [bio, setBio] = useState<string>("")

  const handleCommunityUpdate = async () => {
    try {
      const { error } = await supabase
        .from("communities")
        .upsert({ id: communityId, about: bio })

      if (error) throw error

      navigation.navigate("Community")

      showAlert({
        title: "Success",
        message:
          "Community created successfully! Head to the community Dashboard to see your new community",
        buttonText: "Understood",
      })
    } catch (error) {
      console.error("Failed to update community preferences:", error)
    }
  }

  return (
    <SafeAreaView className="flex-1 bg-primary-900">
      <CreateCommunityTopBar
        text="About Community"
        functionProp={() => navigation.goBack()}
      />
      <View className="flex-1 px-4 py-6">
        <Text className="text-2xl font-bold mb-2 text-white">
          Describe your community
        </Text>
        <Text className="text-base text-gray-300 mb-6">
          Share what your community is about, its goals, and what members can
          expect.
        </Text>
        <EnhancedTextInput
          text={bio}
          setText={setBio}
          label="Community Description"
          placeholder="Our community is dedicated to fitness enthusiasts who love..."
          maxLength={300}
          multiline
          numberOfLines={6}
          inputStyle="h-48 bg-primary-800 rounded-lg p-3"
          labelStyle=" mb-2 text-white"
        />
        <View className="flex-1" />
        <TouchableOpacity
          onPress={handleCommunityUpdate}
          className="bg-white py-4 px-6 rounded-full"
        >
          <Text className="text-primary-900 text-center font-bold text-lg">
            Create Community
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

export default CreateAboutCommunity
