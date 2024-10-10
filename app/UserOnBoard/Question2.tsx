import { View, Text, SafeAreaView, Alert } from "react-native"
import React, { useEffect, useState } from "react"
import { NavigationType } from "../@types/navigation"
import { useNavigation } from "@react-navigation/native"
import DOBPicker from "../components/DOBPicker"
import supabase from "../../lib/supabase"
import { useAuth } from "../supabaseFunctions/authcontext"
import calculateAge from "../utilFunctions/calculateAge"
import GenericButton from "../components/GenericButton"

const Question2 = () => {
  const [date, setDate] = useState(new Date())
  const [ageState, setAge] = useState<number | null>(null)
  const navigation = useNavigation<NavigationType>()
  const { user } = useAuth()

  const showAlert = () =>
    Alert.alert(
      "Age Restriction",
      "You must be 18 years or older to use this app.",
      [{ text: "OK", style: "default" }],
      { cancelable: false }
    )

  const handleUserUpdate = async () => {
    if (ageState !== null && ageState >= 18) {
      try {
        const { error } = await supabase
          .from("profiles")
          .update({
            birthday: date,
          })
          .eq("id", user?.id)

        if (error) throw error

        navigation.navigate("QuestionThree")
      } catch (error) {
        console.log(error)
        Alert.alert("Error", "Failed to update profile. Please try again.")
      }
    } else {
      showAlert()
    }
  }

  useEffect(() => {
    setAge(calculateAge(date.toString()))
  }, [date])

  return (
    <SafeAreaView className="flex-1 bg-primary-900">
      <View className="flex-1 justify-between py-10 px-6">
        <View>
          <Text className="text-3xl font-bold text-white mb-4 text-center">
            What's your date of birth?
          </Text>
          <Text className="text-lg text-white mb-8 text-center">
            You must be 18 or older to use this app
          </Text>

          <View className="bg-white rounded-xl p-4 shadow-lg">
            <DOBPicker date={date} setDate={setDate} />
          </View>

          {ageState !== null && (
            <Text className="text-xl text-white mt-6 text-center">
              Age: {ageState}
            </Text>
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
            width={200}
            padding="py-4"
            textColour="text-gray-800"
          />
        </View>
      </View>
    </SafeAreaView>
  )
}

export default Question2
