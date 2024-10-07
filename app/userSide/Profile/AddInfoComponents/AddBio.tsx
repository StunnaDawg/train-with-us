import React, { useEffect, useState } from "react"
import { View, SafeAreaView, Text, TouchableOpacity } from "react-native"
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native"
import { NavigationType, RootStackParamList } from "../../../@types/navigation"
import supabase from "../../../../lib/supabase"
import EnhancedTextInput from "../../../components/TextInput"
import EditProfileTopBar from "../../../components/TopBarEdit"

const AddBio = () => {
  const route = useRoute<RouteProp<RootStackParamList, "EditBio">>()
  const userProfile = route.params.userProfile
  const navigation = useNavigation<NavigationType>()
  const [bio, setBio] = useState<string>("")

  useEffect(() => {
    if (userProfile?.about) setBio(userProfile.about)
  }, [userProfile])

  const handleUserUpdate = async () => {
    try {
      const { error } = await supabase
        .from("profiles")
        .upsert({ id: userProfile.id, about: bio })

      if (error) throw error

      navigation.goBack()
    } catch (error) {
      console.error("Failed to update bio:", error)
    }
  }

  return (
    <SafeAreaView className="flex-1 bg-white">
      <EditProfileTopBar
        text="Write a bio"
        onSave={handleUserUpdate}
        saveText="Done"
        primaryTextColor="text-gray-800"
      />
      <View className="flex-1 p-4">
        <Text className="text-lg font-semibold mb-2 text-gray-800">
          Tell us about yourself
        </Text>
        <Text className="text-sm text-gray-600 mb-4">
          Share a bit about who you are, your interests, and what you're looking
          for in the community.
        </Text>
        <EnhancedTextInput
          text={bio}
          setText={setBio}
          label="Your Bio"
          placeholder="I'm passionate about fitness and love trying new workout routines..."
          maxLength={150}
          multiline
          numberOfLines={4}
          inputStyle="h-36"
        />
        <TouchableOpacity
          onPress={handleUserUpdate}
          className="mt-6 bg-blue-500 py-3 px-6 rounded-full"
        >
          <Text className="text-white text-center font-semibold">Save Bio</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

export default AddBio
