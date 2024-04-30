import { View, Text, Pressable } from "react-native"
import React from "react"

type BasicButtonProps = {
  text: string
  buttonFunction: () => void
}

const BasicButton = ({ text, buttonFunction }: BasicButtonProps) => {
  return (
    <Pressable
      onPress={() => buttonFunction()}
      className="bg-blue-500 px-6 py-2 rounded-full w-64 items-center"
    >
      <Text className="text-white text-lg font-bold">{text}</Text>
    </Pressable>
  )
}

export default BasicButton
