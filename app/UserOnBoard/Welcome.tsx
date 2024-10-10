import { View, Text, SafeAreaView, ImageBackground } from "react-native"
import React from "react"
import GenericButton from "../components/GenericButton"
import { useNavigation } from "@react-navigation/native"
import { NavigationType } from "../@types/navigation"

const Welcome = () => {
  const navigation = useNavigation<NavigationType>()

  return (
    <SafeAreaView className="flex-1 bg-primary-900 bg-opacity-50">
      <View className="flex-1 justify-between py-10">
        <View className="px-6">
          <Text className="text-4xl font-bold text-white mb-4">Welcome!</Text>
          <Text className="text-xl font-semibold text-white mb-6">
            We're excited to have you join our Community!
          </Text>
          <Text className="text-lg text-white">
            Let's get started by answering a few questions to help us set up
            your profile.
          </Text>
        </View>

        <View className="px-6">
          <GenericButton
            text="Get Started"
            buttonFunction={() => navigation.navigate("QuestionOne")}
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

export default Welcome
