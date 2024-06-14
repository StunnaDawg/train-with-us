import { View, Text, SafeAreaView, Alert } from "react-native"
import React, { useEffect, useState } from "react"
import GenericButton from "../components/GenericButton"
import { useNavigation } from "@react-navigation/native"
import { NavigationType } from "../@types/navigation"
import * as Device from "expo-device"
import * as Notifications from "expo-notifications"
import supabase from "../../lib/supabase"
import { useAuth } from "../supabaseFunctions/authcontext"

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
})

const EnableNotifcations = () => {
  const { user } = useAuth()
  const navigation = useNavigation<NavigationType>()

  const registerForPushNotificationsAsync = async () => {
    if (!Device.isDevice) {
      Alert.alert("Must use physical device for Push Notifications")
      return null
    }
    const { status: existingStatus } = await Notifications.getPermissionsAsync()
    let finalStatus = existingStatus
    if (existingStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync()
      finalStatus = status
    }
    if (finalStatus !== "granted") {
      Alert.alert("Failed to get push token for push notification!")
      return null
    }
    return (await Notifications.getExpoPushTokenAsync()).data
  }

  const savePushToken = async (token: string) => {
    if (!user?.id) {
      Alert.alert("User not logged in")
      return
    }
    const { error } = await supabase
      .from("profiles")
      .upsert({ id: user.id, expo_push_token: token })

    if (error) {
      console.error("Error saving push token:", error)
      Alert.alert("Error saving push token")
    } else {
      Alert.alert("Notifications enabled")
      navigation.navigate("Location")
    }
  }

  const handleEnableNotifications = async () => {
    const token = await registerForPushNotificationsAsync()
    if (token) {
      await savePushToken(token)
    }
  }

  const skip = () => {
    navigation.navigate("Location")
  }
  return (
    <SafeAreaView className="flex-1 justify-center items-center">
      <View className="flex flex-col justify-center items-center">
        <View className="m-2">
          <Text className="text-lg font-bold text-center">
            Enable notifications to stay up to date with your community
          </Text>
        </View>
        <View>
          <View className="mb-3">
            <GenericButton
              roundness="rounded-xl"
              text="Enable Notifications"
              buttonFunction={() => handleEnableNotifications()}
              textSize="text-sm"
              width={200}
              colourPressed="bg-blue-200"
              colourDefault="bg-blue-500"
              borderColourPressed="border-gray-200"
              borderColourDefault="border-black"
            />
          </View>
          <View className="mb-3">
            <GenericButton
              roundness="rounded-xl"
              text="Skip"
              buttonFunction={() => skip()}
              textSize="text-sm"
              width={200}
              colourPressed="bg-gray-200"
              colourDefault="bg-white"
              borderColourPressed="border-gray-200"
              borderColourDefault="border-black"
            />
          </View>
        </View>
      </View>
    </SafeAreaView>
  )
}

export default EnableNotifcations
