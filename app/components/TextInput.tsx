import React, { Dispatch, SetStateAction } from "react"
import { TextInput, View, Text, TextInputProps } from "react-native"

type EnhancedTextInputProps = TextInputProps & {
  text: string
  setText: Dispatch<SetStateAction<string>>
  label?: string
  error?: string
  maxLength?: number
  showCharCount?: boolean
  containerStyle?: string
  inputStyle?: string
  labelStyle?: string
  errorStyle?: string
  charCountStyle?: string
}

const EnhancedTextInput = ({
  text,
  setText,
  label,
  error,
  maxLength = 150,
  showCharCount = true,
  containerStyle = "",
  inputStyle = "",
  labelStyle = "",
  errorStyle = "",
  charCountStyle = "",
  ...props
}: EnhancedTextInputProps) => {
  return (
    <View className={`w-full ${containerStyle}`}>
      {label && (
        <Text
          className={`text-sm font-medium text-gray-700 mb-1 ${labelStyle}`}
        >
          {label}
        </Text>
      )}
      <TextInput
        className={`bg-gray-100 rounded-lg p-4 text-base text-gray-800 ${
          error ? "border-red-500 border" : ""
        } ${inputStyle}`}
        value={text}
        onChangeText={setText}
        maxLength={maxLength}
        {...props}
      />
      {error && (
        <Text className={`text-xs text-red-500 mt-1 ${errorStyle}`}>
          {error}
        </Text>
      )}
      {showCharCount && (
        <Text
          className={`text-xs text-gray-400 mt-1 text-right ${charCountStyle}`}
        >
          {text.length}/{maxLength}
        </Text>
      )}
    </View>
  )
}

export default EnhancedTextInput
