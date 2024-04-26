import { View, Text, SafeAreaView, ScrollView } from "react-native"
import React from "react"
import ViewCommunityTitle from "./components/ViewCommunityTitle"
import CommunityContact from "./components/CommunityContact"
import CommunityMap from "./components/CommunityMap"
import PhotoArray from "./components/PhotosArray"
import CommunityAbout from "./components/CommunityAbout"
import UpcomingCommunityEvents from "./components/UpcomingEvents"

const ViewCommunities = () => {
  return (
    <SafeAreaView className=" flex-1 bg-yellow-300/90">
      <ScrollView>
        <View>
          <ViewCommunityTitle />
        </View>

        <View className="mt-2">
          <PhotoArray />
        </View>

        <View className="flex flex-row justify-center items-center mt-4">
          <View className="m-4">
            <CommunityContact />
          </View>

          <View className="m-4">
            <CommunityMap />
          </View>
        </View>

        <View>
          <CommunityAbout />
        </View>

        <View>
          <UpcomingCommunityEvents />
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default ViewCommunities
