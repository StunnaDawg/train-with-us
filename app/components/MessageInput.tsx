import { View, Text, Platform, KeyboardAvoidingView } from "react-native"
import React, { Dispatch, SetStateAction, useState } from "react"
import { TextInput, Pressable } from "react-native"
import { FontAwesome6 } from "@expo/vector-icons"

type MessageInputProps = {
  messageToSend: string
  setMessageToSend: Dispatch<SetStateAction<string>>
  sendMessageAction: () => void
}

const MessageInput = ({
  messageToSend,
  setMessageToSend,
  sendMessageAction,
}: MessageInputProps) => {
  const [isPressed, setIsPressed] = useState<boolean>(false)
  const [isImagePressed, setIsImagePressed] = useState<boolean>(false)

  const handlePressIn = () => {
    setIsPressed(true)
  }

  const handleImagePressIn = () => {
    setIsImagePressed(true)
  }

  const handlePressOut = () => {
    setIsPressed(false)
  }

  const handleImagePressOut = () => {
    setIsImagePressed(false)
  }
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 0}
    >
      <View className="flex flex-row mx-1 p-2 bg-slate-300/05 items-center">
        <Pressable
          className={`${isImagePressed ? "opacity-40" : null} mx-2 `}
          onPressIn={handleImagePressIn}
          onPressOut={handleImagePressOut}
        >
          <FontAwesome6 name="images" size={24} color="black" />
        </Pressable>
        <TextInput
          lineBreakStrategyIOS="hangul-word"
          multiline={true}
          placeholder="Send a Message"
          className="flex-1 border bg-white rounded-xl w-64 p-2 max-h-64"
          value={messageToSend}
          onChangeText={setMessageToSend}
        />
        <Pressable
          onPressIn={handlePressIn}
          onPressOut={handlePressOut}
          className={`${isPressed ? "opacity-40" : null} mx-2`}
          onPress={() => sendMessageAction()}
        >
          <Text className="text-lg font-bold">Send</Text>
        </Pressable>
      </View>
    </KeyboardAvoidingView>
  )
}

export default MessageInput
