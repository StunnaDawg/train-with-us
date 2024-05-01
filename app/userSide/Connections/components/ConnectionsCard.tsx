import { View, Text, ScrollView } from "react-native"
import React from "react"
import PhotoArray from "./PhotoArray"
import ActivitySection from "../../Profile/components/ActivitySection"
import UserAboutSection from "../../Profile/components/UserAboutSection"
import UserTopGyms from "../../Profile/components/UserTopGyms"
import MessageButton from "./MessageButton"
import { Profile } from "../../../@types/supabaseTypes"

// Shares components with profile page

type ConnectionsCardProps = {
  profile: Profile | null
}

const ConnectionsCard = ({ profile }: ConnectionsCardProps) => {
  return (
    <ScrollView>
      <View className="flex flex-row justify-center mt-8 mb-2">
        <Text className="text-3xl font-bold">{profile?.first_name}</Text>
      </View>
      <View>
        <PhotoArray />
      </View>

      <View>
        <MessageButton profileId={profile?.id} coach={false} />
      </View>

      <View>
        <UserTopGyms profile={profile} borderB={false} mt={false} />
      </View>

      <View>
        <View className="ml-7">
          <Text className="font-medium">My Styles of Fitness:</Text>
        </View>
        <ActivitySection profile={profile} />
      </View>

      <View className="mt-2">
        <PhotoArray />
      </View>

      <View>
        <UserAboutSection profile={profile} />
      </View>
    </ScrollView>
  )
}

export default ConnectionsCard
