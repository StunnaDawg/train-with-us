import { View, Text, ScrollView, RefreshControl } from "react-native"
import React, { useCallback, useState } from "react"
import SinglePic from "../../components/SinglePic"
import UserProfilePic from "./components/UserProfilePic"
import UserTopGyms from "./components/UserTopGyms"
import UserAboutSection from "./components/UserAboutSection"
import ActivitySection from "./components/ActivitySection"
import PictureSection from "./components/PictureSection"

const Profile = () => {
  const [refreshing, setRefreshing] = useState<boolean>(false)

  const onRefresh = useCallback(() => {
    setRefreshing(true)
    setTimeout(() => {
      setRefreshing(false)
    }, 2000)
  }, [])

  return (
    <ScrollView
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <UserProfilePic refresh={refreshing} />

      <UserTopGyms borderB={true} mt={true} />

      <UserAboutSection />

      <ActivitySection />

      <PictureSection />
    </ScrollView>
  )
}

export default Profile
