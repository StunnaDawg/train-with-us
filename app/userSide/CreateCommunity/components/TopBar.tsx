import React from "react"
import { Pressable, Text, View } from "react-native"
import { useNavigation } from "@react-navigation/native"
import { NavigationType } from "../../../@types/navigation"
import { useState } from "react"

type CreateCommunityTopBarProps = {
  text: string
  functionProp: () => void
  doneButton?: boolean
}

const CreateCommunityTopBar = ({
  text,
  functionProp,
  doneButton = true,
}: CreateCommunityTopBarProps) => {
  const navigation = useNavigation<NavigationType>()
  const [isCancelPressed, setIsCancelPressed] = useState(false)
  const [isSkipPressed, setisSkipPressed] = useState(false)

  const handleOnPressIn = () => {
    setIsCancelPressed(true)
  }

  const handleOnPressOut = () => {
    setIsCancelPressed(false)
  }

  const handleOnPressInDone = () => {
    setisSkipPressed(true)
  }

  const handleOnPressOutDone = () => {
    setisSkipPressed(false)
  }

  return (
    <View className="flex flex-row justify-between items-center border-b border-slate-300 p-2">
      <Pressable
        onPressIn={handleOnPressIn}
        onPressOut={handleOnPressOut}
        onPress={() => navigation.goBack()}
        className={`${isCancelPressed ? "opacity-50" : null}`}
      >
        <Text className=" text-sm font-semibold text-white">Back</Text>
      </Pressable>
      <Text className="font-bold text-lg text-center text-white">{text}</Text>
      {doneButton ? (
        <Pressable
          onPressIn={handleOnPressInDone}
          onPressOut={handleOnPressOutDone}
          onPress={functionProp}
          className={`${isSkipPressed ? "opacity-50" : null}`}
        >
          <Text className="text-sm font-semibold text-white">Skip</Text>
        </Pressable>
      ) : (
        <View />
      )}
    </View>
  )
}

export default CreateCommunityTopBar
