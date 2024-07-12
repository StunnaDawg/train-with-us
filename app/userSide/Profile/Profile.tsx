import { View, Text, ScrollView, RefreshControl, Pressable } from "react-native"
import React, { useCallback, useEffect, useState } from "react"
import UserProfilePic from "./components/UserProfilePic"
import { Profile } from "../../@types/supabaseTypes"
import useCurrentUser from "../../supabaseFunctions/getFuncs/useCurrentUser"
import { useAuth } from "../../supabaseFunctions/authcontext"
import { useFocusEffect, useNavigation } from "@react-navigation/native"
import { NavigationType } from "../../@types/navigation"
import MyEventsButton from "../../components/MyEventsButton"
import returnCommunityName from "../../utilFunctions/returnCommunityName"
import GenericButton from "../../components/GenericButton"
import MyEvents from "../Events/MyEvents"
import { NavBar } from "../../../components"

const ProfileView = () => {
  const { user } = useAuth()
  const [loading, setLoading] = useState<boolean>(true)
  const [refreshing, setRefreshing] = useState<boolean>(false)
  const [currentUser, setCurrentUser] = useState<Profile | null>(null)
  const [primaryGymName, setPrimaryGymName] = useState<string>("")
  const navigation = useNavigation<NavigationType>()

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
      />
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <UserProfilePic profile={currentUser} refresh={refreshing} />

        <MyEvents />
      </ScrollView>
    </>
  )
}

export default ProfileView
