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
import { TouchableOpacity } from "react-native-gesture-handler"
import SinglePicCommunity from "../../components/SinglePicCommunity"

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
    <>
      <SafeAreaView className="flex-1 bg-primary-900">
        <NavBar
          textColour="text-white"
          title="My Profile"
          showFriends={true}
          showSearchCommunities={false}
          searchUsers={false}
        />
        <View className="border-r-2 mb-2">
          {/* Communties */}
          <View>
            <View>
              <View className="items-center">
                <View className="items-center">
                  <SinglePicCommunity
                    size={50}
                    avatarRadius={100}
                    noAvatarRadius={100}
                    item={userProfile?.profile_pic}
                  />
                  <Text className="text-white text-xl font-bold">
                    Blended Athletics
                  </Text>
                </View>
                <TouchableOpacity>
                  <Text className="text-blue-600">Primary Location</Text>
                </TouchableOpacity>
              </View>
              <View className="flex flex-row justify-between">
                <View className="flex flex-1 rounded-lg bg-primary-300 mx-2 my-4 p-4">
                  <Text className="text-blue-200 font-bold text-2xl">12</Text>
                  <Text className="text-white font-semibold">Friends</Text>
                </View>
                <View className=" flex flex-1 rounded-lg bg-primary-300 mx-2 my-4 p-4">
                  <Text className="text-blue-200 font-bold text-2xl">12</Text>
                  <Text className="text-white font-semibold">Friends</Text>
                </View>
              </View>
            </View>
          </View>
        </View>

        <View className="bg-primary-700 flex-1 pt-2">
          <View className="bg-primary-300">
            <Text>Marty</Text>
          </View>
        </View>
      </SafeAreaView>
    </>
  )
}

export default ProfileView
