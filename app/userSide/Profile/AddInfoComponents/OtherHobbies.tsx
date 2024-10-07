import {
  View,
  Text,
  ScrollView,
  TextInput,
  SafeAreaView,
  TouchableOpacity,
} from "react-native"
import React, { useEffect, useState } from "react"
import { NavigationType, RootStackParamList } from "../../../@types/navigation"
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native"
import { useAuth } from "../../../supabaseFunctions/authcontext"
import supabase from "../../../../lib/supabase"
import NextButton from "../../../components/NextButton"
import BouncyCheckbox from "react-native-bouncy-checkbox"
import EnhancedTextInput from "../../../components/TextInput"
import BackButton from "../../../components/BackButton"
import EditProfileTopBar from "../../../components/TopBarEdit"

type HobbiesOptions =
  | "Gardening"
  | "Photography"
  | "Painting"
  | "Writing"
  | "Cooking"
  | "Baking"
  | "Woodworking"
  | "Knitting"
  | "Dancing"
  | "Playing Musical Instruments"
  | "Reading"
  | "Bird Watching"
  | "Fishing"
  | "Astronomy"
  | "Pottery Making"
  | "Sewing"
  | "Model Building"
  | "Scrapbooking"
  | "Drawing"
  | "Calligraphy"

const Hobbies = () => {
  const route = useRoute<RouteProp<RootStackParamList, "Hobbies">>()
  const userProfile = route.params.userProfile

  const navigation = useNavigation<NavigationType>()

  const [hobby, setHobby] = useState<string>("")

  const { user } = useAuth()

  useEffect(() => {
    if (userProfile?.hobbies) {
      setHobby(userProfile.hobbies)
    }
  }, [userProfile])

  const handleUserUpdate = async () => {
    try {
      const { error } = await supabase
        .from("profiles")
        .upsert({ id: userProfile.id, hobbies: hobby })

      if (error) throw error

      navigation.goBack()
    } catch (error) {
      console.error("Failed to update hobbies:", error)
    }
  }

  return (
    <SafeAreaView className="flex-1 bg-white">
      <EditProfileTopBar
        text="Other hobbies"
        onSave={handleUserUpdate}
        saveText="Done"
        primaryTextColor="text-gray-800"
      />
      <View className="flex-1 p-4">
        <Text className="text-lg font-semibold mb-2 text-gray-800">
          Share your hobbies
        </Text>
        <Text className="text-sm text-gray-600 mb-4">
          Tell us about your favorite activities and interests outside of work.
        </Text>
        <EnhancedTextInput
          text={hobby}
          setText={setHobby}
          label="Your Hobbies"
          placeholder="I love gardening, photography, and playing the guitar..."
          maxLength={150}
          multiline
          numberOfLines={4}
          inputStyle="h-36"
        />
        <TouchableOpacity
          onPress={handleUserUpdate}
          className="mt-6 bg-blue-500 py-3 px-6 rounded-full"
        >
          <Text className="text-white text-center font-semibold">
            Save Hobbies
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

export default Hobbies
