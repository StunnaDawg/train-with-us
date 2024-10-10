import {
  View,
  Text,
  SafeAreaView,
  TextInput,
  Alert,
  TouchableOpacity,
} from "react-native"
import { useNavigation } from "@react-navigation/native"
import React, { useState } from "react"
import { NavigationType } from "../@types/navigation"
import supabase from "../../lib/supabase"
import { useAuth } from "../supabaseFunctions/authcontext"
import GenericButton from "../components/GenericButton"
import { Ionicons } from "@expo/vector-icons"

type GenderOption = "Male" | "Female" | "Non-Binary" | "Specify other..." | null

const Question3 = () => {
  const navigation = useNavigation<NavigationType>()
  const [selectedGender, setSelectedGender] = useState<GenderOption>(null)
  const [specifyInput, setSpecifyInput] = useState<string>("")
  const { user } = useAuth()

  const showAlert = () =>
    Alert.alert(
      "Missing Information",
      "Please select a gender option.",
      [{ text: "OK", style: "default" }],
      { cancelable: true }
    )

  const handleUserUpdate = async () => {
    if (selectedGender === null) {
      showAlert()
      return
    }
    try {
      const { error } = await supabase
        .from("profiles")
        .update({
          gender:
            selectedGender === "Specify other..."
              ? specifyInput
              : selectedGender,
        })
        .eq("id", user?.id)

      if (error) throw error

      navigation.navigate("FitnessInterests", { userProfile: null })
    } catch (error) {
      console.log(error)
      Alert.alert("Error", "Failed to update profile. Please try again.")
    }
  }

  const genderOptions: GenderOption[] = [
    "Male",
    "Female",
    "Non-Binary",
    "Specify other...",
  ]

  return (
    <SafeAreaView className="flex-1 bg-primary-900">
      <View className="flex-1 justify-between py-10 px-6">
        <View>
          <Text className="text-3xl font-bold text-white mb-4 text-center">
            Which gender do you identify with?
          </Text>
          <Text className="text-lg text-white mb-8 text-center">
            Select the option that best describes you
          </Text>

          <View className="space-y-4">
            {genderOptions.map((gender, index) => (
              <TouchableOpacity
                key={index}
                className={`flex-row items-center justify-between p-4 rounded-lg ${
                  selectedGender === gender ? "bg-yellow-500" : "bg-gray-700"
                }`}
                onPress={() => setSelectedGender(gender)}
              >
                <Text
                  className={`text-lg font-semibold ${
                    selectedGender === gender
                      ? "text-primary-900"
                      : "text-white"
                  }`}
                >
                  {gender}
                </Text>
                {selectedGender === gender && (
                  <Ionicons name="checkmark-circle" size={24} color="#07182d" />
                )}
              </TouchableOpacity>
            ))}
          </View>

          {selectedGender === "Specify other..." && (
            <View className="mt-4">
              <TextInput
                className="bg-gray-700 text-white text-lg p-4 rounded-lg"
                placeholder="Specify your gender here..."
                placeholderTextColor="#a0aec0"
                value={specifyInput}
                onChangeText={setSpecifyInput}
              />
            </View>
          )}
        </View>

        <View>
          <GenericButton
            text="Continue"
            buttonFunction={handleUserUpdate}
            colourDefault="bg-white"
            colourPressed="bg-yellow-300"
            borderColourDefault="border-transparent"
            borderColourPressed="border-yellow-400"
            textSize="text-lg"
            roundness="rounded-full"
            width={250}
            padding="py-4"
            textColour="text-gray-800"
          />
        </View>
      </View>
    </SafeAreaView>
  )
}

export default Question3
