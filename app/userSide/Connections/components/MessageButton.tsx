import { View, Text, Pressable } from "react-native"
import React from "react"

type MessageButtonProps = {
  coach: boolean
}

const MessageButton = ({ coach }: MessageButtonProps) => {
  return (
    <View className="flex flex-row justify-center m-3">
      {!coach ? (
        <Pressable className="border-2 rounded-full p-3">
          <Text className="text-2xl font-bold">Say Hi</Text>
        </Pressable>
      ) : (
        <Pressable className="border-2 rounded-full p-3">
          <Text className="text-2xl font-bold">Coach</Text>
        </Pressable>
      )}
    </View>
  )
}

export default MessageButton
