import { View, Text, ScrollView } from "react-native"
import React from "react"
import SinglePic from "../../components/SinglePic"
import UserProfilePic from "./components/UserProfilePic"
import UserTopGyms from "./components/UserTopGyms"
import UserAboutSection from "./components/UserAboutSection"
import ActivitySection from "./components/ActivitySection"
import PictureSection from "./components/PictureSection"

const Profile = () => {
  return (
    <ScrollView>
      <UserProfilePic />

      <UserTopGyms borderB={true} mt={true} />

      <UserAboutSection />

      <ActivitySection />

      <PictureSection />
    </ScrollView>
  )
}

export default Profile
