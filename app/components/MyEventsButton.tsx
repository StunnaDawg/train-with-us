import { View, Text, Pressable } from "react-native"
import { FontAwesome6 } from "@expo/vector-icons"
import React, { useState } from "react"
import { useNavigation } from "@react-navigation/native"
import { NavigationType } from "../@types/navigation"

const MyEventsButton = () => {
  const navigation = useNavigation<NavigationType>()

  const [isPressed, setIsPressed] = useState(false)

  const handleOnPressIn = () => {
    setIsPressed(true)
  }

  const handleOnPressOut = () => {
    setIsPressed(false)
  }
  return (
    <Pressable
      className={`flex flex-row justify-between items-center border rounded-xl py-2 mt-4 px-3 mx-10 ${
        isPressed ? "bg-gray-200 " : "bg-white "
      }`}
      onPress={() => {
        navigation.navigate("MyEvents")
      }}
      onPressIn={handleOnPressIn}
      onPressOut={handleOnPressOut}
    >
      <Text className="font-bold text-lg">My Events</Text>
      <FontAwesome6 name="calendar-days" size={20} color="black" />
    </Pressable>
  )
}

export default MyEventsButton
