import { View, Text, ScrollView, RefreshControl, Pressable } from "react-native"
import React, { useCallback, useEffect, useState } from "react"
import UserProfilePic from "./components/UserProfilePic"
import { Profile } from "../../@types/supabaseTypes"
import useCurrentUser from "../../supabaseFunctions/getFuncs/useCurrentUser"
import { useAuth } from "../../supabaseFunctions/authcontext"
import { useIsFocused, useNavigation } from "@react-navigation/native"
import { NavigationType } from "../../@types/navigation"
import { FontAwesome6 } from "@expo/vector-icons"
import MyEvents from "../Events/MyEvents"
import { NavBar } from "../../../components"

const ProfileView = () => {
  const { user } = useAuth()
  const [pressedButton, setPressedButton] = useState<{
    [key: string]: boolean
  }>({})
  const [refreshing, setRefreshing] = useState<boolean>(false)
  const [currentUser, setCurrentUser] = useState<Profile | null>(null)
  const navigation = useNavigation<NavigationType>()

  const handlePressedButtonIn = (buttonName: string) => {
    setPressedButton((prev) => ({ ...prev, [buttonName]: true }))
  }
  const handlePressedButtonOut = (buttonName: string) => {
    setPressedButton((prev) => ({ ...prev, [buttonName]: false }))
  }

  useEffect(() => {
    if (!user) return
    useCurrentUser(user?.id, setCurrentUser)
  }, [user])

  return (
    <>
      <NavBar
        title="My Profile"
        iconColour="black"
        showFriends={true}
        showSearchCommunities={false}
        searchUsers={false}
      />
      <ScrollView>
        <UserProfilePic profile={currentUser} refresh={refreshing} />

        <View className={`${"bg-slate-200"} m-2 rounded-lg p-2`}>
          <Pressable
            onPressIn={() => handlePressedButtonIn("editProfile")}
            onPressOut={() => handlePressedButtonOut("editProfile")}
            className={`${
              pressedButton["editProfile"] ? "opacity-50" : null
            } mx-2 p-3`}
            onPress={() => {
              if (currentUser)
                navigation.navigate("UserEditProfile", {
                  userProfile: currentUser,
                })
            }}
          >
            <View className="flex flex-row justify-between">
              <View className="flex flex-row items-center">
                <Text className="font-semibold mx-1">Edit Profile</Text>
                <FontAwesome6 name="edit" size={18} />
              </View>
              <FontAwesome6 name="chevron-right" size={18} />
            </View>
          </Pressable>
          <Pressable
            onPressIn={() => handlePressedButtonIn("viewProfile")}
            onPressOut={() => handlePressedButtonOut("viewProfile")}
            className={`${
              pressedButton["viewProfile"] ? "opacity-50" : null
            } mx-2 p-3`}
            onPress={() => {
              if (currentUser)
                navigation.navigate("ViewFullUserProfile", {
                  user: currentUser,
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
        </View>

        <MyEvents />
      </ScrollView>
    </>
  )
}

export default ProfileView
