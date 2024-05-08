import { View, Text, TextInput, SafeAreaView } from "react-native"
import React from "react"
import NextButton from "../components/NextButton"
import { useNavigation } from "@react-navigation/native"
import { useState } from "react"
import BouncyCheckbox from "react-native-bouncy-checkbox"
import { NavigationType } from "../@types/navigation"
import supabase from "../../lib/supabase"
import { useAuth } from "../supabaseFunctions/authcontext"

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
  const [displayOnProfile, setDisplayOnProfile] = useState<boolean>(false)
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
    <SafeAreaView className="flex-1">
      <View className="flex justify-center mx-12">
        <View className="items-start w-full">
          <View className="my-5">
            <Text className="font-bold text-2xl">
              What Time Do You Prefer to Workout?
            </Text>
          </View>

          {TimeOptions.map((Time, index) => (
            <View
              key={index}
              className="w-full border-b flex flex-row justify-between items-center p-2"
            >
              <Text className="text-lg font-semibold">{Time}</Text>
              <BouncyCheckbox
                isChecked={selectedTime === Time}
                onPress={() => handleSelectTime(Time)}
              />
            </View>
          ))}
        </View>
        <View className="mt-4 flex flex-row justify-end">
          <NextButton onPress={() => handleUserUpdate()} />
        </View>
      </View>
    </SafeAreaView>
  )
}

export default ActivityTimePreference
