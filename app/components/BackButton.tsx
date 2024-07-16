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
  const [pressIn, setPressIn] = React.useState<boolean>(false)
  const navigation = useNavigation<NavigationType>()

  const handlePressIn = () => {
    setPressIn(true)
  }

  const handlePressOut = () => {
    setPressIn(false)
  }

  const currentColor = pressIn
    ? colour === "black"
      ? "white"
      : "black"
    : colour

  return (
    <Pressable
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      onPress={() => {
        navigation.goBack()
      }}
    >
      <FontAwesome6
        name="chevron-left"
        size={size ? size : 24}
        color={currentColor}
      />
    </Pressable>
  )
}

export default BackButton
