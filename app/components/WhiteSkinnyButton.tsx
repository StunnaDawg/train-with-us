import { View, Text, Pressable } from "react-native"
import React, { useState } from "react"

type WhiteSkinnyButtonProps = {
  text: string
  buttonFunction: () => void
  width?: number
  textSize?: string
}

const WhiteSkinnyButton = ({
  text,
  buttonFunction,
  width,
  textSize,
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
      style={{ width: width ? width : 150 }}
      onPress={() => buttonFunction()}
      onPressIn={handleOnPressIn}
      onPressOut={handleOnPressOut}
      className={` rounded-full border p-2 items-center font-bold ${
        isPressed ? "bg-gray-200 border-gray-200" : "bg-white border-white"
      }`}
    >
      <Text className={`font-bold ${textSize} `}>{text}</Text>
    </Pressable>
  )
}

export default WhiteSkinnyButton
