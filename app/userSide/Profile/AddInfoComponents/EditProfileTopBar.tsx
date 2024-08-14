import React from "react"
import { Pressable, Text, View } from "react-native"
import { useNavigation } from "@react-navigation/native"
import { NavigationType } from "../../../@types/navigation"
import { useState } from "react"

type EditProfileTopBarProps = {
  text: string
  functionProp: () => void
}

const EditProfileTopBar = ({ text, functionProp }: EditProfileTopBarProps) => {
  const navigation = useNavigation<NavigationType>()
  const [isCancelPressed, setIsCancelPressed] = useState(false)
  const [isDonePressed, setIsDonePressed] = useState(false)

  const handleOnPressIn = () => {
    setIsCancelPressed(true)
  }

  const handleOnPressOut = () => {
    setIsCancelPressed(false)
  }

  const handleOnPressInDone = () => {
    setIsDonePressed(true)
  }

  const handleOnPressOutDone = () => {
    setIsDonePressed(false)
  }

  return (
    <View className="flex flex-row justify-between items-center border-b border-slate-300 p-2 mb-8">
      <Pressable
        onPressIn={handleOnPressIn}
        onPressOut={handleOnPressOut}
        onPress={() => navigation.goBack()}
        className={`${isCancelPressed ? "opacity-50" : null}`}
      >
        <Text className=" text-xs font-semibold">Cancel</Text>
      </Pressable>
      <Text className="font-bold text-lg text-center">{text}</Text>
      <Pressable
        onPressIn={handleOnPressInDone}
        onPressOut={handleOnPressOutDone}
        onPress={functionProp}
        className={`${isDonePressed ? "opacity-50" : null}`}
      >
        <Text className="text-xs font-semibold">Done</Text>
      </Pressable>
    </View>
  )
}

export default EditProfileTopBar
