import React, { useState } from "react"
import { Text, SafeAreaView, Pressable, View, Platform } from "react-native"
import { FontAwesome6, FontAwesome } from "@expo/vector-icons"
import { useNavigation } from "@react-navigation/native"
import { NavigationType, TabNavigationType } from "../app/@types/navigation"
import { Image } from "expo-image"
import { Profile } from "../app/@types/supabaseTypes"
import { useLoading } from "../app/context/LoadingContext"
import { set } from "mongoose"

type NavBarProps = {
  title: string
  userProp?: Profile
  bgColour?: string
  textColour?: string
  iconColour?: string
  showFriends: boolean
  showSettings: boolean
  showSearchCommunities: boolean
}

const NavBar = ({
  title,
  userProp,
  bgColour,
  textColour,
  iconColour,
  showFriends,
  showSettings,
  showSearchCommunities,
}: NavBarProps) => {
  const { isLoading, setLoading } = useLoading()
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
          {showSearchCommunities ? (
            <Pressable
              className="mx-2 mt-1"
              onPressIn={() => handlePressIn("search")}
              onPressOut={() => handlePressOut("search")}
              onPress={() => {
                setLoading(true)
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
              setLoading(true)
              navigation.navigate("DirectMessageTab")
            }}
          >
            <FontAwesome
              name="comment"
              size={30}
              color={iconColour ? iconColour : getColor("message")}
            />
          </Pressable>
          {showFriends ? (
            <Pressable
              className="mx-2"
              onPressIn={() => handlePressIn("friends")}
              onPressOut={() => handlePressOut("friends")}
              onPress={() => {
                setLoading(true)
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
                setLoading(true)
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
        </View>
      </SafeAreaView>
    </>
  )
}

export default NavBar
