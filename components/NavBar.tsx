import { Text, SafeAreaView, Pressable, View, Platform } from "react-native"
import supabase from "../lib/supabase"
import { FontAwesome6 } from "@expo/vector-icons"
import { useNavigation } from "@react-navigation/native"
import { NavigationType, TabNavigationType } from "../app/@types/navigation"
import { Image } from "expo-image"
import UpdateModal from "../app/userSide/UpdateModal"
import { useAuth } from "../app/supabaseFunctions/authcontext"
import { useEffect, useState } from "react"
import useCurrentUser from "../app/supabaseFunctions/getFuncs/useCurrentUser"
import { Profile } from "../app/@types/supabaseTypes"
import * as Notifications from "expo-notifications"

const NavBar = () => {
  const [show, setShow] = useState<boolean>(false)
  const [currentUser, setCurrentUser] = useState<Profile | null>({} as Profile)
  const navigationTab = useNavigation<TabNavigationType>()
  const navigation = useNavigation<NavigationType>()
  const { user } = useAuth()

  useEffect(() => {
    const subscription = Notifications.addNotificationResponseReceivedListener(
      (response) => {
        const chatSessionId =
          response.notification.request.content.data.chatSession
        navigation.navigate("MessagingScreen", { chatSession: chatSessionId })
      }
    )

    return () => subscription.remove()
  }, [])

  useEffect(() => {
    if (!user) return
    useCurrentUser(user?.id, setCurrentUser)
  }, [user])

  useEffect(() => {
    if (currentUser?.new_update_modal === false) {
      setShow(true)
    }
  }, [currentUser])

  return (
    <>
      <SafeAreaView
        style={{ paddingTop: Platform.OS == "android" ? 20 : 0 }}
        className="flex flex-row justify-between items-center"
      >
        <View className="flex flex-row items-center">
          <Pressable onPress={() => navigationTab.navigate("Events")}>
            <Image
              source={require("../assets/images/TWU-Logo.png")}
              style={{ width: 50, height: 50 }}
            />
          </Pressable>
          <Text className="font-bold text-lg">Train With Us</Text>
        </View>
        <View className="flex flex-row mx-2">
          <Pressable
            className="mx-2"
            onPress={() => navigation.navigate("ManageConnections")}
          >
            <FontAwesome6 name="users" size={24} color="black" />
          </Pressable>
          <Pressable onPress={() => navigation.navigate("UserSettings")}>
            <FontAwesome6 name="gear" size={24} color="black" />
          </Pressable>
        </View>
      </SafeAreaView>

      <UpdateModal show={show} userId={currentUser?.id} />
    </>
  )
}

export default NavBar
