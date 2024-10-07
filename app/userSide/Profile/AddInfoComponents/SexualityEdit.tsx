import {
  View,
  Text,
  TextInput,
  SafeAreaView,
  Alert,
  StyleSheet,
  Pressable,
} from "react-native"
import React from "react"
import { useState } from "react"
import BouncyCheckbox from "react-native-bouncy-checkbox"

import { useAuth } from "../../../supabaseFunctions/authcontext"
import Sexuality from "../../../UserOnBoard/Sexuality"
import NextButton from "../../../components/NextButton"
import supabase from "../../../../lib/supabase"
import { useNavigation } from "@react-navigation/native"
import { NavigationType } from "../../../@types/navigation"
import EditProfileTopBar from "../../../components/TopBarEdit"

type SexualityOption =
  | "Prefer not to say"
  | "Straight"
  | "Gay"
  | "Lesbian"
  | "Bisexual"
  | null

const SexualityEdit = () => {
  const navigation = useNavigation<NavigationType>()
  const [selectedSexuality, setSelectedSexuality] =
    useState<SexualityOption>("Prefer not to say")

  const handleSelectSexuality = (Sexuality: SexualityOption) => {
    setSelectedSexuality(selectedSexuality === Sexuality ? null : Sexuality)
  }
  const { user } = useAuth()

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
    if (selectedSexuality === null) {
      showAlert()
      return
    }
    try {
      const { error } = await supabase
        .from("profiles")
        .update({
          sexuality: selectedSexuality,
        })
        .eq("id", user?.id)

      if (error) throw error

      navigation.goBack()
    } catch (error) {
      console.log(error)
    }
  }
  const SexualityOptions: SexualityOption[] = [
    "Prefer not to say",
    "Straight",
    "Gay",
    "Lesbian",
  ]
  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-1">
        <EditProfileTopBar
          text="Sexuality"
          onSave={handleUserUpdate}
          primaryTextColor="text-gray-800"
        />

        <View className="px-4 pt-4">
          <Text className="text-lg font-semibold mb-2 text-gray-800">
            How do you identify?
          </Text>
          <Text className="text-sm text-gray-600 mb-4">
            Select the option that best describes your sexuality. This
            information helps us create a more inclusive community.
          </Text>

          {SexualityOptions.map((option, index) => (
            <Pressable
              key={index}
              onPress={() => handleSelectSexuality(option)}
              className={`flex-row justify-between items-center p-4 mb-2 rounded-lg ${
                selectedSexuality === option ? "bg-blue-100" : "bg-gray-100"
              }`}
            >
              <Text className="text-base font-semibold text-gray-800">
                {option}
              </Text>
              <View
                className={`w-6 h-6 rounded-full border-2 ${
                  selectedSexuality === option
                    ? "bg-blue-500 border-blue-500"
                    : "border-gray-400"
                }`}
              >
                {selectedSexuality === option && (
                  <View className="flex-1 items-center justify-center">
                    <View className="w-3 h-3 rounded-full bg-white" />
                  </View>
                )}
              </View>
            </Pressable>
          ))}
        </View>
      </View>
    </SafeAreaView>
  )
}

export default SexualityEdit
