import { View, Text, Pressable } from "react-native"
import { FontAwesome6 } from "@expo/vector-icons"
import React from "react"
import { useNavigation } from "@react-navigation/native"
import { NavigationType } from "../@types/navigation"

type BackButtonProps = {
  colour?: string
  size?: number
}

const BackButton = ({ colour, size }: BackButtonProps) => {
  const navigation = useNavigation<NavigationType>()
  return (
    <Pressable
      onPress={() => {
        navigation.goBack()
      }}
    >
      <FontAwesome6
        name="chevron-left"
        size={size ? size : 24}
        color={colour ? colour : "black"}
      />
    </Pressable>
  )
}

export default BackButton
