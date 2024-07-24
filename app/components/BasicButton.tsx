import { View, Text, Pressable } from "react-native"
import React, { useState } from "react"

type BasicButtonProps = {
  text: string
  buttonFunction: () => void
}

const BasicButton = ({ text, buttonFunction }: BasicButtonProps) => {
  const [isPressed, setIsPressed] = useState(false)

  const handleOnPressIn = () => {
    setIsPressed(true)
  }

  const handleOnPressOut = () => {
    setIsPressed(false)
  }
  return (
    <Pressable
      onPressIn={handleOnPressIn}
      onPressOut={handleOnPressOut}
      onPress={() => buttonFunction()}
      className={`${
        isPressed ? "opacity-50" : null
      } bg-blue-500 px-6 py-2 rounded-full w-64 items-center`}
    >
      <Text className="text-white text-lg font-bold">{text}</Text>
    </Pressable>
  )
}

export default BasicButton
