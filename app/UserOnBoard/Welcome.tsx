import { View, Text, SafeAreaView, Pressable } from "react-native"
import React from "react"
import GenericButton from "../components/GenericButton"
import { useNavigation } from "@react-navigation/native"
import { NavigationType } from "../@types/navigation"

const Welcome = () => {
  const navigation = useNavigation<NavigationType>()

  return (
    <SafeAreaView className="flex-1 bg-primary-900">
      <View className="flex-1">
        <View className="flex flex-row  m-9">
          <Text className="text-xl font-bold text-white">Welcome!</Text>
        </View>
        <View className="flex flex-row mb-9 mx-9">
          <Text className="text-lg font-semibold text-white">
            We're excited to have you join our Community!
          </Text>
        </View>

        <View className="flex flex-row mb-9 mx-9">
          <Text className="text-lg font-semibold text-white">
            Let's get started by answering a few questions to help us set up
            your profile.
          </Text>
        </View>
      </View>

      <View className="flex flex-row justify-center m-4">
        <GenericButton
          text="Get Started"
          buttonFunction={() => navigation.navigate("QuestionOne")}
          colourDefault="bg-white"
          colourPressed="bg-yellow-300"
          borderColourDefault="border-black"
          borderColourPressed="border-black"
          textSize="text-lg"
          roundness="rounded-lg"
          width={300}
          padding="p-2"
        />
      </View>
    </SafeAreaView>
  )
}

export default Welcome
