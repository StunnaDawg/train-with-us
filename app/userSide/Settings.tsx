import { View, Text, SafeAreaView, Pressable, Alert } from "react-native"
import { FontAwesome6 } from "@expo/vector-icons"
import supabase from "../../lib/supabase"
import * as Device from "expo-device"
import * as Notifications from "expo-notifications"
import { useAuth } from "../supabaseFunctions/authcontext"
import BackButton from "../components/BackButton"
import Constants from "expo-constants"

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
})

const Settings = () => {
  const { user } = useAuth()

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
  return (
    <SafeAreaView className="flex-1">
      <View className="flex flex-row justify-between">
        <View className="ml-1">
          <BackButton size={26} colour="black" />
        </View>
        <Text className="text-2xl font-bold">Settings</Text>
        <View />
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
