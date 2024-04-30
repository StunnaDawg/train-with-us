import { View, Text, ScrollView, RefreshControl } from "react-native"
import React, { useCallback, useEffect, useState } from "react"
import SinglePic from "../../components/SinglePic"
import UserProfilePic from "./components/UserProfilePic"
import UserTopGyms from "./components/UserTopGyms"
import UserAboutSection from "./components/UserAboutSection"
import ActivitySection from "./components/ActivitySection"
import PictureSection from "./components/PictureSection"
import { Profile } from "../../@types/supabaseTypes"
import useCurrentUser from "../../supabaseFunctions/getFuncs/useCurrentUser"
import { useAuth } from "../../supabaseFunctions/authcontext"

const Profile = () => {
  const { user } = useAuth()
  const [loading, setLoading] = useState<boolean>(true)
  const [refreshing, setRefreshing] = useState<boolean>(false)
  const [currentUser, setCurrentUser] = useState<Profile | null>(null)

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

  return (
    <ScrollView
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <UserProfilePic profile={currentUser} refresh={refreshing} />

      <UserTopGyms profile={currentUser} borderB={true} mt={true} />

      <UserAboutSection profile={currentUser} />

      <ActivitySection profile={currentUser} />

      <PictureSection profile={currentUser} />
    </ScrollView>
  )
}

export default Profile
