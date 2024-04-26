import { View, Text, Pressable } from "react-native"
import React, { useState } from "react"

type WhiteSkinnyButtonProps = {
  text: string
  buttonFunction: () => void
}

const WhiteSkinnyButton = ({
  text,
  buttonFunction,
}: WhiteSkinnyButtonProps) => {
  const [isPressed, setIsPressed] = useState(false)

  const handleOnPressIn = () => {
    setIsPressed(true)
  }

  const handleOnPressOut = () => {
    setIsPressed(false)
  }

  return (
    <Pressable
      onPress={() => buttonFunction()}
      onPressIn={handleOnPressIn}
      onPressOut={handleOnPressOut}
      className={`rounded-full border p-2 ${
        isPressed ? "bg-gray-200 border-gray-200" : "bg-white border-white"
      }`}
    >
      <Text className="font-bold">{text}</Text>
    </Pressable>
  )
}

export default WhiteSkinnyButton
