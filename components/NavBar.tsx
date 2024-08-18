import React, { useEffect, useState } from "react"
import { Text, SafeAreaView, Pressable, View, Platform } from "react-native"
import { FontAwesome6, FontAwesome } from "@expo/vector-icons"
import { useIsFocused, useNavigation } from "@react-navigation/native"
import { NavigationType, TabNavigationType } from "../app/@types/navigation"
import { Image } from "expo-image"
import { Profile } from "../app/@types/supabaseTypes"
import { useLoading } from "../app/context/LoadingContext"
import { useNewNotification } from "../app/context/NewNotification"
import { useNewMessage } from "../app/context/NewMessage"
import supabase from "../lib/supabase"
import { useAuth } from "../app/supabaseFunctions/authcontext"

type NavBarProps = {
  navBar?: boolean
  title: string
  userProp?: Profile
  bgColour?: string
  textColour?: string
  iconColour?: string
  showFriends: boolean
  showSettings?: boolean
  showSearchCommunities: boolean
  searchUsers: boolean
}

const NavBar = ({
  navBar = false,
  title,
  userProp,
  bgColour,
  textColour,
  iconColour,
  showFriends,
  showSettings = false,
  showSearchCommunities,
  searchUsers,
}: NavBarProps) => {
  const { isNewNotification, setNewNotification } = useNewNotification()
  const { user } = useAuth()
  const { isNewMessage, setNewMessage } = useNewMessage()
  const navigationTab = useNavigation<TabNavigationType>()
  const navigation = useNavigation<NavigationType>()

  const [isPressed, setIsPressed] = useState<{ [key: string]: boolean }>({})

  const handlePressIn = (key: string) => {
    setIsPressed((prevState) => ({ ...prevState, [key]: true }))
  }

  const handlePressOut = (key: string) => {
    setIsPressed((prevState) => ({ ...prevState, [key]: false }))
  }

  const getColor = (key: string) => (isPressed[key] ? "black" : "white")

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", async () => {
      if (!user) return
      const { data, error } = await supabase
        .from("notifications")
        .select("*")
        .eq("user_id", user.id)
        .eq("is_read", false)

      if (data && data.length > 0) {
        setNewNotification(true)
      }
    })

    return unsubscribe
  }, [navigation])

  return (
    <>
      <SafeAreaView
        style={{ paddingTop: Platform.OS === "android" ? 20 : 0 }}
        className={`flex flex-row justify-between items-center ${bgColour}`}
      >
        <View className="flex flex-row items-center">
          <Pressable onPress={() => navigationTab.navigate("Events")}>
            <Image
              source={require("../assets/images/TWU-Logo.png")}
              style={{ width: 50, height: 50 }}
            />
          </Pressable>
          <Text className={`font-bold text-lg ${textColour}`}>{title}</Text>
        </View>
        <View className="flex flex-row justify-center mx-2 items-center">
          {searchUsers ? (
            <Pressable
              className="mx-2 mt-1"
              onPressIn={() => handlePressIn("searchothers")}
              onPressOut={() => handlePressOut("searchothers")}
              onPress={() => {
                navigation.navigate("SearchUsers")
              }}
            >
              <FontAwesome6
                name="magnifying-glass"
                size={24}
                color={getColor("searchothers")}
              />
            </Pressable>
          ) : null}
          {showSearchCommunities ? (
            <Pressable
              className="mx-2 mt-1"
              onPressIn={() => handlePressIn("search")}
              onPressOut={() => handlePressOut("search")}
              onPress={() => {
                navigation.navigate("SearchCommunities")
              }}
            >
              <FontAwesome6
                name="magnifying-glass"
                size={24}
                color={getColor("search")}
              />
            </Pressable>
          ) : null}
          <Pressable
            className="mx-2"
            onPressIn={() => handlePressIn("message")}
            onPressOut={() => handlePressOut("message")}
            onPress={() => {
              setNewMessage(false)

              navigation.navigate("DirectMessageTab")
            }}
          >
            <FontAwesome
              name="comment"
              size={30}
              color={iconColour ? iconColour : getColor("message")}
            />
            {isNewMessage ? ( // This is the red dot for notifications
              <View
                style={{
                  position: "absolute",
                  right: 1,
                  bottom: 0,
                  backgroundColor: "red",
                  borderRadius: 10,
                  width: 10,
                  height: 10,
                }}
              />
            ) : null}
          </Pressable>
          {showFriends ? (
            <Pressable
              className="mx-2"
              onPressIn={() => handlePressIn("friends")}
              onPressOut={() => handlePressOut("friends")}
              onPress={() => {
                navigation.navigate("ManageConnections")
              }}
            >
              <FontAwesome6
                name="users"
                size={24}
                color={iconColour ? iconColour : getColor("friends")}
              />
            </Pressable>
          ) : null}
          {showSettings ? (
            <Pressable
              className="mx-2"
              onPressIn={() => handlePressIn("settings")}
              onPressOut={() => handlePressOut("settings")}
              onPress={() => {
                navigation.navigate("UserSettings")
              }}
            >
              <FontAwesome6
                name="gear"
                size={24}
                color={iconColour ? iconColour : getColor("settings")}
              />
            </Pressable>
          ) : null}

          <Pressable
            className="mx-2"
            onPressIn={() => handlePressIn("settings")}
            onPressOut={() => handlePressOut("settings")}
            onPress={() => {
              setNewNotification(false)
              navigation.navigate("NotificationsTab")
            }}
          >
            <FontAwesome6
              name="bell"
              size={24}
              color={iconColour ? iconColour : getColor("settings")}
            />
            {isNewNotification ? ( // This is the red dot for notifications
              <View
                style={{
                  position: "absolute",
                  right: 0,
                  top: 0,
                  backgroundColor: "red",
                  borderRadius: 10,
                  width: 10,
                  height: 10,
                }}
              />
            ) : null}
          </Pressable>
        </View>
      </SafeAreaView>
    </>
  )
}

export default NavBar
