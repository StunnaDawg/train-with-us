import { View, Text, SafeAreaView } from "react-native"
import React from "react"
import { useNavigation } from "@react-navigation/native"
import WhiteSkinnyButton from "../../components/WhiteSkinnyButton"
import { NavigationType, TabNavigationType } from "../../@types/navigation"
import GenericButton from "../../components/GenericButton"

const PurchaseScreen = () => {
  const navigation = useNavigation<TabNavigationType | NavigationType>()

  const goToHome = () => {
    navigation.navigate("Events")
  }

  const goToMyEvents = () => {
    navigation.navigate("MyEvents")
  }
  return (
    <SafeAreaView className="flex-1 items-center justify-center">
      <View className="flex flex-col items-center justify-center">
        <View className="items-center">
          <Text className="font-bold text-xl">Event Booked!</Text>
        </View>

        <View className="m-2">
          <GenericButton
            textSize="text-sm"
            width={150}
            roundness="rounded-xl"
            textCenter={true}
            colourPressed="bg-slate-200"
            colourDefault="bg-white"
            borderColourPressed="border-gray-200"
            borderColourDefault="border-black"
            text="Return to Events Page"
            buttonFunction={() => goToHome()}
          />
        </View>

        <View className="m-2">
          <GenericButton
            textSize="text-sm"
            width={150}
            roundness="rounded-xl"
            textCenter={true}
            colourPressed="bg-slate-200"
            colourDefault="bg-white"
            borderColourPressed="border-gray-200"
            borderColourDefault="border-black"
            text="View My Events"
            buttonFunction={() => goToMyEvents()}
          />
        </View>
      </View>
    </SafeAreaView>
  )
}

export default PurchaseScreen
