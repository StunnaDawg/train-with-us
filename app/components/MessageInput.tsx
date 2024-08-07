import { View, Text, Platform, KeyboardAvoidingView } from "react-native"
import React, { Dispatch, SetStateAction, useEffect, useState } from "react"
import { TextInput, Pressable } from "react-native"
import * as ImagePicker from "expo-image-picker"
import * as FileSystem from "expo-file-system"
import { FontAwesome6 } from "@expo/vector-icons"
import supabase from "../../lib/supabase"
import { decode } from "base64-arraybuffer"
import { Image } from "expo-image"
import getSingleEvent from "../supabaseFunctions/getFuncs/getSingleEvent"
import getSingleCommunity from "../supabaseFunctions/getFuncs/getSingleCommunity"

type MessageInputProps = {
  messageToSend: string
  setMessageToSend: Dispatch<SetStateAction<string>>
  sendMessageAction: (image: string | null) => void
  chatSessionId: string
}

const MessageInput = ({
  messageToSend,
  setMessageToSend,
  sendMessageAction,
  chatSessionId,
}: MessageInputProps) => {
  const [image, setImage] = useState<string>("")
  const [imageUrl, setImageUrl] = useState<string>("")
  const [loading, setLoading] = useState<boolean>(false)
  const [isPressed, setIsPressed] = useState<boolean>(false)
  const [isImagePressed, setIsImagePressed] = useState<boolean>(false)
  const [inputHeight, setInputHeight] = useState(40) // Initial height

  const handleContentSizeChange = (event: any) => {
    setInputHeight(event.nativeEvent.contentSize.height)
  }

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

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      aspect: [9, 16],
      quality: 0,
      allowsEditing: true,
    })

    if (!result.canceled) {
      setLoading(true)
      const img = result.assets[0]
      const base64 = await FileSystem.readAsStringAsync(img.uri, {
        encoding: "base64",
      })
      const filePath = `${chatSessionId}/${new Date().getTime()}.${
        img.type === "image"
      }`
      const contentType = "image/png"
      await supabase.storage.from("photos").upload(filePath, decode(base64), {
        contentType: contentType,
      })

      if (chatSessionId === undefined) return
      setImageUrl(filePath)
      setImage(img.uri)
      setLoading(false)
    }
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 0}
    >
      <View className="flex flex-row mx-1 p-2 bg-slate-300/05 items-center">
        <Pressable
          onPress={pickImage}
          className={`${isImagePressed ? "opacity-40" : null} mx-2 `}
          onPressIn={handleImagePressIn}
          onPressOut={handleImagePressOut}
        >
          <FontAwesome6 name="images" size={24} color="black" />
        </Pressable>
        <View>
          {image ? (
            <Image source={{ uri: image }} style={{ width: 50, height: 50 }} />
          ) : null}

          <TextInput
            lineBreakStrategyIOS="hangul-word"
            multiline={true}
            placeholder="Send a Message"
            className="border bg-white rounded-xl w-64 p-3 text-sm"
            style={{ height: Math.min(inputHeight, 256) }}
            value={messageToSend}
            onChangeText={setMessageToSend}
            onContentSizeChange={handleContentSizeChange}
          />
        </View>
        <Pressable
          onPressIn={handlePressIn}
          onPressOut={handlePressOut}
          className={`${isPressed ? "opacity-40" : null} mx-2`}
          onPress={() => {
            sendMessageAction(imageUrl)
            setImage("")
          }}
        >
          <Text className="text-lg font-bold">Send</Text>
        </Pressable>
      </View>
    </KeyboardAvoidingView>
  )
}

export default MessageInput
