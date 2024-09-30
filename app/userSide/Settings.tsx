import { View, Text, SafeAreaView, Pressable, Alert } from "react-native"
import { FontAwesome6 } from "@expo/vector-icons"
import supabase from "../../lib/supabase"
import * as Device from "expo-device"
import * as Notifications from "expo-notifications"
import { useAuth } from "../supabaseFunctions/authcontext"
import BackButton from "../components/BackButton"
import Constants from "expo-constants"
import { useEffect, useState } from "react"

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
})

const Settings = () => {
  const { user } = useAuth()
  const [isNotificationsEnabled, setIsNotificationsEnabled] = useState(false)

  function handleRegistrationError(errorMessage: string) {
    alert(errorMessage)
    throw new Error(errorMessage)
  }

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

    const projectId =
      Constants?.expoConfig?.extra?.eas?.projectId ??
      Constants?.easConfig?.projectId
    if (!projectId) {
      handleRegistrationError("Project ID not found")
    }
    try {
      const pushTokenString = (
        await Notifications.getExpoPushTokenAsync({
          projectId,
        })
      ).data
      console.log(pushTokenString)
      return pushTokenString
    } catch (e: unknown) {
      handleRegistrationError(`${e}`)
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

  const checkNotificationStatus = async () => {
    if (user?.id) {
      const { data, error } = await supabase
        .from("profiles")
        .select("expo_push_token")
        .eq("id", user.id)
        .single()

      if (error) {
        console.error("Error checking notification status:", error)
      } else {
        setIsNotificationsEnabled(!!data?.expo_push_token)
      }
    }
  }

  useEffect(() => {
    checkNotificationStatus()
  }, [])

  const handleNotifications = async () => {
    if (isNotificationsEnabled) {
      // Disable notifications logic here
      // For example, remove the token from the database
      if (user?.id) {
        const { error } = await supabase
          .from("profiles")
          .update({ expo_push_token: null })
          .eq("id", user.id)

        if (error) {
          console.error("Error disabling notifications:", error)
          Alert.alert("Error disabling notifications")
        } else {
          setIsNotificationsEnabled(false)
          Alert.alert("Notifications disabled")
        }
      }
    } else {
      const token = await registerForPushNotificationsAsync()
      if (token) {
        await savePushToken(token)
        setIsNotificationsEnabled(true)
        Alert.alert("Notifications enabled")
      }
    }
  }
  return (
    <SafeAreaView className="flex-1 bg-primary-900">
      <View className="flex flex-row justify-between items-center p-4">
        <BackButton size={26} colour="white" />
        <Text className="text-2xl font-bold text-white">Settings</Text>
        <View />
      </View>

      <View className="flex-1 justify-center items-center">
        <View className="space-y-4 items-center w-full px-4">
          <Pressable
            onPress={handleSignOut}
            className="flex flex-row items-center justify-center w-full bg-gray-600 p-4 rounded-xl"
          >
            <Text className="font-semibold text-xl text-white mr-2">
              Log Out
            </Text>
            <FontAwesome6 name="door-open" size={24} color="white" />
          </Pressable>

          <Pressable
            onPress={handleNotifications}
            className={`flex flex-row items-center justify-center w-full p-4 rounded-xl ${
              isNotificationsEnabled ? "bg-indigo-600" : "bg-teal-600"
            }`}
          >
            <Text className="text-xl text-white font-semibold mr-2">
              {isNotificationsEnabled ? "Disable" : "Enable"} Push Notifications
            </Text>
            <FontAwesome6 name="bell" size={24} color="white" />
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  )
}

export default Settings
