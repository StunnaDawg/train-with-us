import { View, Text, ScrollView, RefreshControl, Pressable } from "react-native"
import React, { useCallback, useEffect, useState } from "react"
import UserProfilePic from "./components/UserProfilePic"
import { Profile } from "../../@types/supabaseTypes"
import useCurrentUser from "../../supabaseFunctions/getFuncs/useCurrentUser"
import { useAuth } from "../../supabaseFunctions/authcontext"
import { useFocusEffect, useNavigation } from "@react-navigation/native"
import { NavigationType } from "../../@types/navigation"
import returnCommunityName from "../../utilFunctions/returnCommunityName"
import { FontAwesome6 } from "@expo/vector-icons"
import MyEvents from "../Events/MyEvents"
import { NavBar } from "../../../components"

const ProfileView = () => {
  const { user } = useAuth()
  const [viewProfilePressed, setViewProfilePressed] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(true)
  const [refreshing, setRefreshing] = useState<boolean>(false)
  const [currentUser, setCurrentUser] = useState<Profile | null>(null)
  const [primaryGymName, setPrimaryGymName] = useState<string>("")
  const navigation = useNavigation<NavigationType>()

  const handleViewProfilePressedIn = () => {
    setViewProfilePressed(true)
  }

  const handleViewProfilePressedOut = () => {
    setViewProfilePressed(false)
  }

  const onRefresh = useCallback(() => {
    setRefreshing(true)
    setTimeout(() => {
      setRefreshing(false)
    }, 2000)
  }, [])

  useEffect(() => {
    if (!user) return
    useCurrentUser(user?.id, setCurrentUser)
  }, [])

  useEffect(() => {
    const getPrimaryGymName = async () => {
      if (currentUser?.primary_gym === null) {
        setPrimaryGymName("No Primary Gym")
        return
      }
      const PrimaryGymName = await returnCommunityName(currentUser?.primary_gym)
      setPrimaryGymName(PrimaryGymName)
    }

    getPrimaryGymName()
  }, [currentUser])

  useFocusEffect(
    useCallback(() => {
      const getUser = async () => {
        setLoading(true)
        if (!user) return
        useCurrentUser(user?.id, setCurrentUser)
        setLoading(false)
      }

      getUser()

      return () => {
        // Optional cleanup actions
      }
    }, [user, setCurrentUser])
  )

  return (
    <>
      <NavBar
        title="My Profile"
        iconColour="black"
        showFriends={true}
        showSettings={true}
        showSearchCommunities={false}
        searchUsers={false}
      />
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <UserProfilePic profile={currentUser} refresh={refreshing} />

        <View
          className={`${
            viewProfilePressed ? " bg-slate-100" : "bg-slate-200"
          } m-2 rounded-lg p-2`}
        >
          <Pressable
            onPressIn={handleViewProfilePressedIn}
            onPressOut={handleViewProfilePressedOut}
            className={`${viewProfilePressed ? "opacity-50" : null} mx-2 p-2`}
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
