import { View, Text, Pressable } from "react-native"
import { useNavigation } from "@react-navigation/native"
import React from "react"
import { NavigationType } from "../@types/navigation"

const Question1 = () => {
  const navigation = useNavigation<NavigationType>()
  return (
    <View className="flex flex-1 justify-center">
      <Text>Question1</Text>
      <Pressable onPress={() => navigation}>
        <Text>Next</Text>
      </Pressable>
    </View>
  )
}

export default Question1
