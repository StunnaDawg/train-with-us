import { View, Text, ScrollView } from "react-native"
import React from "react"
import SinglePic from "../../components/SinglePic"
import UserProfilePic from "./UserProfilePic"
import UserTopGyms from "./UserTopGyms"
import UserAboutSection from "./UserAboutSection"
import ActivitySection from "./ActivitySection"
import PictureSection from "./PictureSection"

const Profile = () => {
  return (
    <ScrollView>
      <UserProfilePic />

      <UserTopGyms />

      <UserAboutSection />

      <ActivitySection />

      <PictureSection />
    </ScrollView>
  )
}

export default Profile
