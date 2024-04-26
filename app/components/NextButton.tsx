import { View, Text, Pressable } from "react-native"
import React from "react"
import { FontAwesome6 } from "@expo/vector-icons"

type NextButtonProps = {
  onPress: () => void
}

const NextButton = ({ onPress }: NextButtonProps) => {
  return (
    <Pressable onPress={() => onPress()}>
      <FontAwesome6 name="circle-chevron-right" size={48} color="blue" />
    </Pressable>
  )
}

export default NextButton
