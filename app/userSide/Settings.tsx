import {
  View,
  Text,
  SafeAreaView,
  Pressable,
  Switch,
  Alert,
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

//   registerForPushNotificationsAsync().then((token) => setExpoPushToken(token))

//     // Listen for incoming notifications
//     const subscription = Notifications.addNotificationReceivedListener(() => {
//       setNotification(notification)
//     })

//     return () => {
//       // Clean up the subscription
//       Notifications.removeNotificationSubscription(subscription)
//     }

const Settings = () => {
  const { user } = useAuth()
  const [isEnabled, setIsEnabled] = useState(false)
  const toggleSwitch = () => setIsEnabled((previousState) => !previousState)
  const [expoPushToken, setExpoPushToken] = useState<string | null>(null)

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
    // Adjust this to get the current user ID
    if (user?.id) {
      const { error } = await supabase
        .from("profiles")
        .upsert({ id: user.id, expo_push_token: token })
      if (error) {
        console.error("Error saving push token:", error)
        Alert.alert("Error saving push token")
      }
    } else {
      Alert.alert("User not logged in")
    }
  }

  // Function to enable notifications
  const handleEnableNotifications = async () => {
    const token = await registerForPushNotificationsAsync()
    if (token) {
      setExpoPushToken(token)
      savePushToken(token)
      Alert.alert("Notifications enabled")
    }
  }

  // Function to disable notifications
  const handleDisableNotifications = () => {
    Notifications.getPermissionsAsync().then(({ status }) => {
      if (status === "granted") {
        Notifications.deleteNotificationChannelAsync(
          expoPushToken as any
        ).catch(() => {})
        setExpoPushToken(null)
        Alert.alert("Notifications disabled")
      }
    })
  }

  const checkNotificationStatus = async () => {
    const { status } = await Notifications.getPermissionsAsync()
    if (status === "granted") {
      setIsEnabled(true)
    } else {
      setIsEnabled(false)
    }
  }
  useEffect(() => {
    checkNotificationStatus()
  }, [])

  useEffect(() => {
    if (isEnabled) {
      handleEnableNotifications()
    } else {
      handleDisableNotifications()
    }
  }, [isEnabled])

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

          <Pressable className="flex flex-row items-center">
            <Text className="text-xl font-semibold mx-1">Notifications</Text>
            <Switch onValueChange={toggleSwitch} value={isEnabled} />
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  )
}

export default Settings
