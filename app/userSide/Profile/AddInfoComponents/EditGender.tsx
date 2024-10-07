import {
  View,
  Text,
  Pressable,
  SafeAreaView,
  TextInput,
  Alert,
} from "react-native"
import BouncyCheckbox from "react-native-bouncy-checkbox"
import { useNavigation } from "@react-navigation/native"
import React, { useState } from "react"
import { NavigationType } from "../../../@types/navigation"
import { useAuth } from "../../../supabaseFunctions/authcontext"
import supabase from "../../../../lib/supabase"
import GenericButton from "../../../components/GenericButton"
import EditProfileTopBar from "../../../components/TopBarEdit"

type GenderOption = "Male" | "Female" | "Non-Binary" | "Specify other..." | null

const EditGender = () => {
  const navigation = useNavigation<NavigationType>()

  const [selectedGender, setSelectedGender] = useState<GenderOption>("Male")
  const [specifyInput, setSpecifyInput] = useState<string>("")

  const { user, userProfile } = useAuth()

  const showAlert = () =>
    Alert.alert(
      "Missing Information",
      "Please Select an Option.",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
      ],
      {
        cancelable: true,
      }
    )

  const handleUserUpdate = async () => {
    if (selectedGender === null || userProfile === null) {
      showAlert()
      return
    }
    try {
      const { error } = await supabase
        .from("profiles")
        .update({
          gender: selectedGender,
        })
        .eq("id", user?.id)

      if (error) throw error

      navigation.navigate("FitnessInterests", {
        userProfile: null,
      })
    } catch (error) {
      console.log(error)
    }
  }

  const handleSelectGender = (gender: GenderOption) => {
    setSelectedGender(selectedGender === gender ? null : gender)
  }
  const genderOptions: GenderOption[] = [
    "Male",
    "Female",
    "Non-Binary",
    "Specify other...",
  ]
  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-1">
        <EditProfileTopBar
          text="Gender"
          onSave={handleUserUpdate}
          primaryTextColor="text-gray-800"
        />

        <View className="px-4 pt-4">
          <Text className="text-lg font-semibold mb-2 text-gray-800">
            What's your gender?
          </Text>
          <Text className="text-sm text-gray-600 mb-4">
            Select the option that best describes your gender identity. Your
            choice helps us create a more inclusive environment.
          </Text>

          {genderOptions.map((gender, index) => (
            <Pressable
              key={index}
              onPress={() => handleSelectGender(gender)}
              className={`flex-row justify-between items-center p-4 mb-2 rounded-lg ${
                selectedGender === gender ? "bg-blue-100" : "bg-gray-100"
              }`}
            >
              <Text className="text-base font-semibold text-gray-800">
                {gender}
              </Text>
              <View
                className={`w-6 h-6 rounded-full border-2 ${
                  selectedGender === gender
                    ? "bg-blue-500 border-blue-500"
                    : "border-gray-400"
                }`}
              >
                {selectedGender === gender && (
                  <View className="flex-1 items-center justify-center">
                    <View className="w-3 h-3 rounded-full bg-white" />
                  </View>
                )}
              </View>
            </Pressable>
          ))}

          {selectedGender === "Specify other..." && (
            <TextInput
              value={specifyInput}
              onChangeText={setSpecifyInput}
              placeholder="Specify your gender here..."
              className="mt-2 p-3 border border-gray-300 rounded-lg text-gray-800"
            />
          )}
        </View>
      </View>
    </SafeAreaView>
  )
}

export default EditGender
