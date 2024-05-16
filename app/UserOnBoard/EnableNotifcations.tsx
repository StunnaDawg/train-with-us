import { View, Text, SafeAreaView, Alert } from "react-native"
import React, { useEffect, useState } from "react"
import GenericButton from "../components/GenericButton"
import { useNavigation } from "@react-navigation/native"
import { NavigationType } from "../@types/navigation"
import * as Device from "expo-device"
import * as Notifications from "expo-notifications"
import Constants from "expo-constants"

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
})

const EnableNotifcations = () => {
  const navigation = useNavigation<NavigationType>()

  const [expoPushToken, setExpoPushToken] = useState<string | null>(null)
  const [notification, setNotification] = useState<boolean>(false)

  useEffect(() => {
    registerForPushNotificationsAsync().then((token) => setExpoPushToken(token))

    // Listen for incoming notifications
    const subscription = Notifications.addNotificationReceivedListener(() => {
      setNotification(notification)
    })

    return () => {
      // Clean up the subscription
      Notifications.removeNotificationSubscription(subscription)
    }
  }, [])

  // Function to request notification permissions and get the push token
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

  // Function to enable notifications
  const handleEnableNotifications = async () => {
    const token = await registerForPushNotificationsAsync()
    if (token) {
      setExpoPushToken(token)
      Alert.alert("Notifications enabled")
    }
    navigation.navigate("Location")
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
    navigation.navigate("Location")
  }
  return (
    <SafeAreaView className="flex-1">
      <View className="flex flex-row justify-center">
        <View className="items-center">
          <View className="m-2">
            <Text className="text-2xl font-bold text-center">
              Enable notifications to stay up to date with your community
            </Text>
          </View>
          <View>
            <View className="mb-3">
              <GenericButton
                roundness="rounded-xl"
                text="Enable Notifications"
                buttonFunction={() => handleEnableNotifications()}
                textSize="text-lg"
                width={200}
                colourPressed="bg-blue-200"
                colourDefault="bg-blue-500"
                borderColourPressed="border-gray-200"
                borderColourDefault="border-black"
              />
            </View>
            <View>
              <GenericButton
                roundness="rounded-xl"
                text="Disable Notifications"
                buttonFunction={() => handleDisableNotifications()}
                textSize="text-lg"
                width={200}
                colourPressed="bg-gray-200"
                colourDefault="bg-white"
                borderColourPressed="border-gray-200"
                borderColourDefault="border-black"
              />
            </View>
          </View>
        </View>
      </View>
    </SafeAreaView>
  )
}

export default EnableNotifcations
