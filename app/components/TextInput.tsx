import React, { Dispatch, SetStateAction, useState } from "react"
import { TextInput, View, Text } from "react-native"

type EnhancedTextInputProps = {
  text: string
  setText: Dispatch<SetStateAction<string>>
  placeholder: string
}

const EnhancedTextInput = ({
  text,
  setText,
  placeholder,
}: EnhancedTextInputProps) => {
  return (
    <View className="w-72">
      <TextInput
        multiline={true}
        className="border rounded-xl p-3 h-32 text-base text-gray-700"
        placeholder={placeholder}
        maxLength={200}
        value={text}
        onChangeText={setText}
      />
      <Text className="text-right mt-1 text-sm text-gray-500">
        {text ? text.length : "0"}/200
      </Text>
    </View>
  )
}

export default EnhancedTextInput
