import { View, Text, SafeAreaView } from "react-native"
import React from "react"
import NextButton from "../components/NextButton"
import GenericButton from "../components/GenericButton"
import { useNavigation } from "@react-navigation/native"
import { NavigationType } from "../@types/navigation"

const EnableNotifcations = () => {
  const navigation = useNavigation<NavigationType>()
  const handleEnableNotifcations = () => {
    navigation.navigate("Location")
    console.log("Enable Notifcations")
  }

  const handleDisableNotifcations = () => {
    navigation.navigate("Location")
    console.log("Disable Notifcations")
  }
  return (
    <SafeAreaView className="flex-1">
      <View className="flex flex-row justify-center">
        <View className="items-center">
          <View className="m-2">
            <Text className="text-2xl font-bold text-center">
              Enable notifications to stay up to date with your community
            </Text>
          </View>
          <View>
            <View className="mb-3">
              <GenericButton
                roundness="rounded-xl"
                text="Enable Notifications"
                buttonFunction={handleEnableNotifcations}
                textSize="text-lg"
                width={200}
                colourPressed="bg-blue-200"
                colourDefault="bg-blue-500"
                borderColourPressed="border-gray-200"
                borderColourDefault="border-black"
              />
            </View>
            <View>
              <GenericButton
                roundness="rounded-xl"
                text="Disable Notifications"
                buttonFunction={handleDisableNotifcations}
                textSize="text-lg"
                width={200}
                colourPressed="bg-gray-200"
                colourDefault="bg-white"
                borderColourPressed="border-gray-200"
                borderColourDefault="border-black"
              />
            </View>
          </View>
        </View>
      </View>
    </SafeAreaView>
  )
}

export default EnableNotifcations
