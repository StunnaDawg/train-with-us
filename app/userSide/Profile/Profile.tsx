import { View, Text, ScrollView, Pressable, SafeAreaView } from "react-native"
import React, { useCallback, useState } from "react"
import UserProfilePic from "./components/UserProfilePic"
import { Profile } from "../../@types/supabaseTypes"
import useCurrentUser from "../../supabaseFunctions/getFuncs/useCurrentUser"
import { useAuth } from "../../supabaseFunctions/authcontext"
import { useFocusEffect, useNavigation } from "@react-navigation/native"
import { NavigationType } from "../../@types/navigation"
import { FontAwesome6 } from "@expo/vector-icons"
import MyEvents from "../Events/MyEvents"
import { NavBar } from "../../../components"
import { is } from "date-fns/locale"

const ProfileView = () => {
  const { user } = useAuth()
  const [userProfile, setUserProfile] = useState<Profile | null>(null)
  const [pressedButton, setPressedButton] = useState<{
    [key: string]: boolean
  }>({})
  const navigation = useNavigation<NavigationType>()

  const handlePressedButtonIn = (buttonName: string) => {
    setPressedButton((prev) => ({ ...prev, [buttonName]: true }))
  }
  const handlePressedButtonOut = (buttonName: string) => {
    setPressedButton((prev) => ({ ...prev, [buttonName]: false }))
  }
  const fetchCurrentUser = async () => {
    if (!user) return
    setUserProfile(null)
    await useCurrentUser(user?.id, setUserProfile)
  }
  useFocusEffect(
    useCallback(() => {
      let isMounted = true
      fetchCurrentUser()
      return () => {
        isMounted = false
      }
    }, [user])
  )

  return (
    <SafeAreaView className="flex-1 bg-primary-900">
      <NavBar
        textColour="text-white"
        title="My Profile"
        showFriends={true}
        showSearchCommunities={false}
        searchUsers={false}
      />
      <ScrollView>
        <View className="flex flex-row justify-center">
          <Text className="text-white text-xl font-bold">
            {userProfile?.first_name}
          </Text>
        </View>
        <View className={`${"bg-white"} m-2 mx-10 rounded-lg p-2`}>
          <Pressable
            onPressIn={() => handlePressedButtonIn("editProfile")}
            onPressOut={() => handlePressedButtonOut("editProfile")}
            className={`border-b ${
              pressedButton["editProfile"] ? "opacity-50" : null
            } mx-2 p-3`}
            onPress={() => {
              if (userProfile)
                navigation.navigate("UserEditProfile", {
                  userProfile: userProfile,
                })
            }}
          >
            <View className="flex flex-row justify-between">
              <View className="flex flex-row items-center">
                <Text className="font-semibold  mx-1">Edit Profile</Text>
                <FontAwesome6 name="edit" size={18} />
              </View>
              <FontAwesome6 name="chevron-right" size={18} />
            </View>
          </Pressable>
          <Pressable
            onPressIn={() => handlePressedButtonIn("viewProfile")}
            onPressOut={() => handlePressedButtonOut("viewProfile")}
            className={` border-b ${
              pressedButton["viewProfile"] ? "opacity-50" : null
            } mx-2 p-3`}
            onPress={() => {
              if (userProfile)
                navigation.navigate("ViewFullUserProfile", {
                  user: userProfile,
                })
            }}
          >
            <View className="flex flex-row justify-between">
              <View className="flex flex-row items-center">
                <Text className="font-semibold mx-1">View Profile</Text>
              </View>
              <FontAwesome6 name="chevron-right" size={18} />
            </View>
          </Pressable>
          <Pressable
            onPressIn={() => handlePressedButtonIn("accountSettings")}
            onPressOut={() => handlePressedButtonOut("accountSettings")}
            className={`${
              pressedButton["accountSettings"] ? "opacity-50" : null
            } mx-2 p-3`}
            onPress={() => navigation.navigate("UserSettings")}
          >
            <View className="flex flex-row justify-between">
              <View className="flex flex-row items-center">
                <Text className="font-semibold  mx-1">Account Settings</Text>
                <FontAwesome6 name="gear" size={18} />
              </View>
              <FontAwesome6 name="chevron-right" size={18} />
            </View>
          </Pressable>
        </View>

        <MyEvents />
      </ScrollView>
    </SafeAreaView>
  )
}

export default ProfileView
