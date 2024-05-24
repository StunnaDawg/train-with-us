import React from "react"
import { Pressable, Text, Alert, Linking, Platform } from "react-native"
import WhiteSkinnyButton from "./WhiteSkinnyButton"

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

  return <WhiteSkinnyButton buttonFunction={handlePress} text={phoneNumber} />
}

export default PhoneCallButton
