import { View, Text, SafeAreaView, Image, Alert } from "react-native"
import React from "react"
import GenericButton from "../components/GenericButton"
import supabase from "../../lib/supabase"
import { useAuth } from "../supabaseFunctions/authcontext"
import * as Updates from "expo-updates"

const EndOnBoard = () => {
  const { user } = useAuth()

  const finishOnBoard = async () => {
    if (!user?.id) return
    try {
      const { error } = await supabase
        .from("profiles")
        .update({ onboard: true })
        .eq("id", user?.id)

      if (error) throw error
      await Updates.reloadAsync()
    } catch (error) {
      console.error("Error finishing onboarding:", error)
      Alert.alert("Error", "Failed to update profile. Please try again.")
    }
  }

  return (
    <SafeAreaView className="flex-1 bg-primary-900">
      <View className="flex-1 justify-between py-10 px-6">
        <View className="items-center">
          <Text className="text-3xl font-bold text-white text-center mb-8">
            You're all set!
          </Text>
        </View>

        <View className="space-y-6">
          <View className="bg-gray-800 rounded-xl p-6">
            <Text className="text-xl font-semibold text-white mb-4">
              What's next?
            </Text>
            <View className="space-y-4">
              <Text className="text-lg text-white">
                • Browse events in your area
              </Text>
              <Text className="text-lg text-white">
                • Connect with your community
              </Text>
              <Text className="text-lg text-white">
                • Make new fitness friends
              </Text>
            </View>
          </View>
        </View>

        <View className="mt-6 flex flex-row justify-center">
          <GenericButton
            text="Let's Go!"
            buttonFunction={finishOnBoard}
            colourDefault="bg-white"
            colourPressed="bg-yellow-300"
            borderColourDefault="border-transparent"
            borderColourPressed="border-yellow-400"
            textSize="text-lg"
            roundness="rounded-full"
            width={250}
            padding="py-4"
            textColour="text-primary-900"
          />
        </View>
      </View>
    </SafeAreaView>
  )
}

export default EndOnBoard
