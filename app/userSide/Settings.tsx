import {
  View,
  Text,
  SafeAreaView,
  Pressable,
  Switch,
  Alert,
  Linking,
  Platform,
} from "react-native"
import React, { useEffect, useState } from "react"
import { FontAwesome6 } from "@expo/vector-icons"
import supabase from "../../lib/supabase"
import * as Device from "expo-device"
import * as Notifications from "expo-notifications"
import { useAuth } from "../supabaseFunctions/authcontext"

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
})

const Settings = () => {
  const { user } = useAuth()

  const registerForPushNotificationsAsync = async () => {
    if (Device.isDevice) {
      const { status: existingStatus } =
        await Notifications.getPermissionsAsync()
      let finalStatus = existingStatus
      if (existingStatus !== "granted") {
        const { status } = await Notifications.requestPermissionsAsync()
        finalStatus = status
      }
      if (finalStatus !== "granted") {
        Alert.alert("Failed to get push token for push notification!")
        return null
      }
      const token = (await Notifications.getExpoPushTokenAsync()).data
      return token
    } else {
      Alert.alert("Must use physical device for Push Notifications")
      return null
    }
  }

  const savePushToken = async (token: string) => {
    if (user?.id) {
      const { error } = await supabase
        .from("profiles")
        .upsert({ id: user.id, expo_push_token: token })
      if (error) {
        console.error("Error saving push token:", error)
        Alert.alert("Error saving push token")
      }

      console.log("Push token saved")
    } else {
      Alert.alert("User not logged in")
    }
  }

  const handleEnableNotifications = async () => {
    const { status } = await Notifications.getPermissionsAsync()
    if (status !== "granted") {
      Alert.alert(
        "Enable Notifications",
        "To receive notifications, enable them in settings."
      )
      return
    }
    const token = await registerForPushNotificationsAsync()
    if (token) {
      savePushToken(token)
      Alert.alert("Notifications enabled")
    }
  }

  const handleSignOut = () => {
    try {
      supabase.auth.signOut()
    } catch (error: any) {
      alert(error.message)
    }
  }
  return (
    <SafeAreaView className="flex-1">
      <View className="flex flex-row justify-center">
        <Text className="text-2xl font-bold">Settings</Text>
      </View>

      <View className="flex-1 justify-center items-center">
        <View className="space-y-4 items-center">
          <Pressable
            onPress={handleSignOut}
            className="flex flex-row items-center"
          >
            <Text className="font-semibold text-xl mx-1">Log Out</Text>
            <FontAwesome6 name="door-open" size={24} color="black" />
          </Pressable>

          <Pressable
            onPress={() => handleEnableNotifications()}
            className="flex flex-row items-center rounded-xl bg-black p-2"
          >
            <Text className="text-xl text-white font-semibold mx-1">
              Reset Push Notifications
            </Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  )
}

export default Settings
