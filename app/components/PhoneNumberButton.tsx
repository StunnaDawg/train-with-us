import React from "react"
import { Pressable, Text, Alert, Linking, Platform } from "react-native"
import { FontAwesome6 } from "@expo/vector-icons"
import GenericButton from "./GenericButton"

type PhoneCallButtonProps = {
  phoneNumber: string
}

const PhoneCallButton = ({ phoneNumber }: PhoneCallButtonProps) => {
  const handlePress = async () => {
    const url =
      Platform.OS === "android"
        ? `tel:${phoneNumber}`
        : `telprompt:${phoneNumber}`

    try {
      const supported = await Linking.canOpenURL(url)

      if (supported) {
        await Linking.openURL(url)
      } else {
        Alert.alert("Error", "Phone number is not supported")
      }
    } catch (error) {
      Alert.alert(
        "Error",
        "An error occurred while trying to call the phone number"
      )
    }
  }

  return (
    <Pressable onPress={handlePress} className="bg-white rounded-xl p-1">
      <FontAwesome6 name="phone" size={22} color="black" />
    </Pressable>
  )
}

export default PhoneCallButton
