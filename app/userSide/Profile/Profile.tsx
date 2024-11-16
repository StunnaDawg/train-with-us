import { View, Text, ScrollView, Pressable, SafeAreaView } from "react-native"
import React, { useCallback, useState } from "react"
import { Profile } from "../../@types/supabaseTypes"
import useCurrentUser from "../../supabaseFunctions/getFuncs/useCurrentUser"
import { useAuth } from "../../supabaseFunctions/authcontext"
import { useFocusEffect, useNavigation } from "@react-navigation/native"
import { NavigationType } from "../../@types/navigation"
import { FontAwesome6 } from "@expo/vector-icons"
import MyEvents from "../Events/MyEvents"
import { NavBar } from "../../../components"

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
      <ScrollView className="px-4 py-6">
        <View className="flex items-center mb-6">
          <Text className="text-white text-2xl font-bold">
            {userProfile?.first_name}
          </Text>
        </View>
        <View className="bg-white rounded-xl shadow-lg overflow-hidden">
          <Pressable
            onPressIn={() => handlePressedButtonIn("editProfile")}
            onPressOut={() => handlePressedButtonOut("editProfile")}
            className={`border-b border-gray-200 ${
              pressedButton["editProfile"] ? "bg-gray-100" : ""
            }`}
            onPress={() => {
              if (userProfile)
                navigation.navigate("UserEditProfile", {
                  userProfile: userProfile,
                })
            }}
          >
            <View className="flex-row justify-between items-center p-4">
              <View className="flex-row items-center">
                <FontAwesome6 name="edit" size={20} color="#4B5563" />
                <Text className="font-semibold text-gray-800 ml-3">
                  Edit Profile
                </Text>
              </View>
              <FontAwesome6 name="chevron-right" size={18} color="#9CA3AF" />
            </View>
          </Pressable>
          <Pressable
            onPressIn={() => handlePressedButtonIn("viewProfile")}
            onPressOut={() => handlePressedButtonOut("viewProfile")}
            className={`border-b border-gray-200 ${
              pressedButton["viewProfile"] ? "bg-gray-100" : ""
            }`}
            onPress={() => {
              if (userProfile)
                navigation.navigate("ViewFullUserProfile", {
                  user: userProfile,
                })
            }}
          >
            <View className="flex-row justify-between items-center p-4">
              <View className="flex-row items-center">
                <FontAwesome6 name="user" size={20} color="#4B5563" />
                <Text className="font-semibold text-gray-800 ml-3">
                  View Profile
                </Text>
              </View>
              <FontAwesome6 name="chevron-right" size={18} color="#9CA3AF" />
            </View>
          </Pressable>
          <Pressable
            onPressIn={() => handlePressedButtonIn("accountSettings")}
            onPressOut={() => handlePressedButtonOut("accountSettings")}
            className={`${
              pressedButton["accountSettings"] ? "bg-gray-100" : ""
            }`}
            onPress={() => navigation.navigate("UserSettings")}
          >
            <View className="flex-row justify-between items-center p-4">
              <View className="flex-row items-center">
                <FontAwesome6 name="gear" size={20} color="#4B5563" />
                <Text className="font-semibold text-gray-800 ml-3">
                  Account Settings
                </Text>
              </View>
              <FontAwesome6 name="chevron-right" size={18} color="#9CA3AF" />
            </View>
          </Pressable>
        </View>

        <MyEvents />
      </ScrollView>
    </SafeAreaView>
  )
}

export default ProfileView
