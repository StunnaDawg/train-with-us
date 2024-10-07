import { View, Text, SafeAreaView, StyleSheet, Pressable } from "react-native"
import React from "react"
import NextButton from "../../../components/NextButton"
import { useNavigation } from "@react-navigation/native"
import { useState } from "react"
import BouncyCheckbox from "react-native-bouncy-checkbox"
import { NavigationType } from "../../../@types/navigation"
import supabase from "../../../../lib/supabase"
import { useAuth } from "../../../supabaseFunctions/authcontext"
import BackButton from "../../../components/BackButton"
import EditProfileTopBar from "../../../components/TopBarEdit"

type TimeOption =
  | "Morning"
  | "Afternoon"
  | "Evening"
  | "Weekday Preferred"
  | "Weekends Preferred"
  | null

const ActivityTimePreference = () => {
  const navigation = useNavigation<NavigationType>()

  const [selectedTime, setSelectedTime] = useState<TimeOption>("Morning")
  const { user } = useAuth()

  const handleSelectTime = (Time: TimeOption) => {
    setSelectedTime(selectedTime === Time ? null : Time)
  }

  const handleUserUpdate = async () => {
    try {
      const { error } = await supabase
        .from("profiles")
        .update({ actvitiy_time: selectedTime })
        .eq("id", user?.id)

      if (error) throw error

      // Navigate to the next preference page
      navigation.goBack()
    } catch (error) {
      console.error("Failed to update community preferences:", error)
    }
  }
  const TimeOptions: TimeOption[] = [
    "Morning",
    "Afternoon",
    "Evening",
    "Weekday Preferred",
    "Weekends Preferred",
  ]
  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-1">
        <EditProfileTopBar
          text="Workout Time"
          onSave={handleUserUpdate}
          primaryTextColor="text-gray-800"
        />

        <View className="px-4 pt-4">
          <Text className="text-lg font-semibold mb-2 text-gray-800">
            When do you prefer to work out?
          </Text>
          <Text className="text-sm text-gray-600 mb-4">
            Select your preferred time for activities. This helps us suggest
            suitable workout partners and events.
          </Text>

          {TimeOptions.map((time, index) => (
            <Pressable
              key={index}
              onPress={() => handleSelectTime(time)}
              className={`flex-row justify-between items-center p-4 mb-2 rounded-lg ${
                selectedTime === time ? "bg-blue-100" : "bg-gray-100"
              }`}
            >
              <Text className="text-base font-semibold text-gray-800">
                {time}
              </Text>
              <View
                className={`w-6 h-6 rounded-full border-2 ${
                  selectedTime === time
                    ? "bg-blue-500 border-blue-500"
                    : "border-gray-400"
                }`}
              >
                {selectedTime === time && (
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

export default ActivityTimePreference
