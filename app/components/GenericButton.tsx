import { View, Text, Pressable } from "react-native"
import React, { useState } from "react"

type GenericButtonProps = {
  text: string
  buttonFunction: () => void
  width?: number
  textSize?: string
  colourPressed: string
  colourDefault: string
  borderColourPressed: string
  borderColourDefault: string
  roundness: string
}

const GenericButton = ({
  text,
  buttonFunction,
  width,
  textSize,
  colourPressed,
  colourDefault,
  borderColourPressed,
  borderColourDefault,
  roundness,
}: GenericButtonProps) => {
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
      className={` ${roundness} border p-2 items-center font-bold ${
        isPressed
          ? `${colourPressed} ${borderColourPressed}`
          : `${colourDefault} ${borderColourDefault}`
      }`}
    >
      <Text className={`font-bold ${textSize} `}>{text}</Text>
    </Pressable>
  )
}

export default GenericButton
