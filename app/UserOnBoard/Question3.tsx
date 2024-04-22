import { View, Text, Pressable } from "react-native"
import { useNavigation } from "@react-navigation/native"
import React from "react"
import { NavigationType } from "../@types/navigation"

const Question3 = () => {
  const navigation = useNavigation<NavigationType>()
  return (
    <View className="flex flex-1 justify-center">
      <Text>Question3</Text>
      <Pressable onPress={() => navigation.navigate("QuestionFour")}>
        <Text>Next</Text>
      </Pressable>
    </View>
  )
}

export default Question3
