import { View, Text, SafeAreaView } from "react-native"
import React, { useEffect } from "react"
import { CommonActions, useNavigation } from "@react-navigation/native"
import WhiteSkinnyButton from "../../components/WhiteSkinnyButton"
import { NavigationType, TabNavigationType } from "../../@types/navigation"

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
        <Text>Purchase Complete</Text>
        <Text>Event Booked!</Text>

        <WhiteSkinnyButton text="Go Home" buttonFunction={goToHome} />

        <WhiteSkinnyButton
          text="View My Events"
          buttonFunction={goToMyEvents}
        />
      </View>
    </SafeAreaView>
  )
}

export default PurchaseScreen
