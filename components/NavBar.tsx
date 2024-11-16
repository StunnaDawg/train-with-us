import React, { useEffect, useState } from "react"
import { Text, SafeAreaView, Pressable, View, Platform } from "react-native"
import { FontAwesome6, FontAwesome } from "@expo/vector-icons"
import { useIsFocused, useNavigation } from "@react-navigation/native"
import { NavigationType, TabNavigationType } from "../app/@types/navigation"
import { Image } from "expo-image"
import { Profile } from "../app/@types/supabaseTypes"
import { useNewNotification } from "../app/context/NewNotification"
import { useNewMessage } from "../app/context/NewMessage"
import supabase from "../lib/supabase"
import { useAuth } from "../app/supabaseFunctions/authcontext"
import ProfilePicture from "../app/userSide/Profile/editProfileComponents/ProfilePicture"
import SinglePicCommunity from "../app/components/SinglePicCommunity"
import { geoLocationName } from "../app/utilFunctions/geoLocationName"
import { useLocationContext } from "../app/context/LocationContext"
import parsePostGISPoint from "../app/utilFunctions/parsePostGISPoint"
import * as Location from "expo-location"

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
  const { user, userProfile } = useAuth()
  const { isNewMessage, setNewMessage } = useNewMessage()
  const [cityName, setCityName] = useState<string>("")
  const navigationTab = useNavigation<TabNavigationType>()
  const navigation = useNavigation<NavigationType>()

  const [isPressed, setIsPressed] = useState<{ [key: string]: boolean }>({})
  let locationCoords: Location.LocationObject["coords"] | null

  useEffect(() => {
    const getUsersLocation = async () => {
      if (userProfile?.location) {
        const parsed = await parsePostGISPoint(userProfile.location)
        if (parsed) {
          locationCoords = {
            latitude: parsed.latitude,
            longitude: parsed.longitude,
            altitude: null,
            accuracy: null,
            altitudeAccuracy: null,
            heading: null,
            speed: null,
          }
        }

        setCityName(
          await geoLocationName(
            locationCoords?.latitude,
            locationCoords?.longitude
          )
        )
      }
    }

    getUsersLocation()
  }, [userProfile])

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

  // useEffect(() => {
  //   const unsubscribe = navigation.addListener("focus", async () => {
  //     if (!user) return
  //     const { data, error } = await supabase
  //       .from("chat_sessions")
  //       .select("*")
  //       .eq("user_id", user.id)
  //       .eq("is_read", false)

  //     if (data && data.length > 0) {
  //       setNewNotification(true)
  //     }
  //   })

  //   return unsubscribe
  // }, [navigation])

  return (
    <>
      <SafeAreaView
        style={{ paddingTop: Platform.OS === "android" ? 20 : 0 }}
        className={`flex flex-row justify-between items-center ${bgColour}`}
      >
        <View className="flex flex-row items-center">
          <Pressable onPress={() => navigationTab.navigate("Profile")}>
            <SinglePicCommunity
              size={50}
              avatarRadius={100}
              noAvatarRadius={100}
              item={userProfile?.profile_pic}
            />
          </Pressable>
          <View className="flex flex-row justify-center m-1">
            <View>
              <View className="flex flex-row justify-center">
                <View className="mx-1">
                  <Text className={`font-bold text-xl ${textColour}`}>
                    {userProfile?.first_name}
                  </Text>
                </View>
                <View>
                  <Text className={`font-bold text-xl ${textColour}`}>
                    {userProfile?.last_name}
                  </Text>
                </View>
              </View>
              <View>
                <Text className={`font-bold text-xl ${textColour}`}>
                  {cityName}
                </Text>
              </View>
            </View>
          </View>
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
