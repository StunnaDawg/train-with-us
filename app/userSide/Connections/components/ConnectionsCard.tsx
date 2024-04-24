import { View, Text, ScrollView } from "react-native"
import React from "react"
import PhotoArray from "./PhotoArray"
import ActivitySection from "../../Profile/components/ActivitySection"
import UserAboutSection from "../../Profile/components/UserAboutSection"
import UserTopGyms from "../../Profile/components/UserTopGyms"
import MessageButton from "./MessageButton"

// Shares components with profile page

const ConnectionsCard = () => {
  return (
    <ScrollView>
      <View className="flex flex-row justify-center mt-8 mb-2">
        <Text className="text-3xl font-bold">Jordan Forbes</Text>
      </View>
      <View>
        <PhotoArray />
      </View>

      <View>
        <MessageButton coach={false} />
      </View>

      <View>
        <UserTopGyms borderB={false} mt={false} />
      </View>

      <View>
        <View className="ml-7">
          <Text className="font-medium">My Styles of Fitness:</Text>
        </View>
        <ActivitySection />
      </View>

      <View className="mt-2">
        <PhotoArray />
      </View>

      <View>
        <UserAboutSection />
      </View>
    </ScrollView>
  )
}

export default ConnectionsCard
