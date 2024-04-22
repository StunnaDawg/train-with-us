import { View, Text, Pressable } from "react-native"
import React from "react"
import { NavigationType } from "../@types/navigation"
import { useNavigation } from "@react-navigation/native"

const Question2 = () => {
  const navigation = useNavigation<NavigationType>()
  return (
    <View className="flex flex-1 justify-center">
      <Text>Question2</Text>
      <Pressable onPress={() => navigation.navigate("QuestionThree")}>
        <Text>Next</Text>
      </Pressable>
    </View>
  )
}

export default Question2
