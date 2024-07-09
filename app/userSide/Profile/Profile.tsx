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
    <ScrollView
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <MyEventsButton />

      <UserProfilePic profile={currentUser} refresh={refreshing} />

      <View className="flex flex-row justify-center mt-3 items-center">
        <View className="mx-1">
          <GenericButton
            textSize="text-xs"
            width={100}
            roundness="rounded-xl"
            textCenter={true}
            colourPressed="bg-slate-200"
            colourDefault="bg-white"
            borderColourPressed="border-gray-200"
            borderColourDefault="border-black"
            text="Edit Profile"
            buttonFunction={() => {
              if (currentUser) {
                navigation.navigate("UserEditProfile", {
                  userProfile: currentUser,
                })
              }
            }}
          />
        </View>
      </View>
    </ScrollView>
  )
}

export default ProfileView
