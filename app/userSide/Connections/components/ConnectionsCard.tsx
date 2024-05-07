import { View, Text, ScrollView } from "react-native"
import React, { Dispatch, SetStateAction } from "react"
import PhotoArray from "./PhotoArray"
import ActivitySection from "../../Profile/components/ActivitySection"
import UserAboutSection from "../../Profile/components/UserAboutSection"
import UserTopGyms from "../../Profile/components/UserTopGyms"
import MessageButton from "./MessageButton"
import { Profile } from "../../../@types/supabaseTypes"
import Animated from "react-native-reanimated"

// Shares components with profile page

type ConnectionsCardProps = {
  profile: Profile | null
  loading: boolean
  setLoading: Dispatch<SetStateAction<boolean>>
}

const ConnectionsCard = ({
  profile,
  loading,
  setLoading,
}: ConnectionsCardProps) => {
  return (
    <View style={{ height: 750 }}>
      <View className="flex flex-row justify-center mt-1 mb-2">
        <Text className="text-3xl font-bold">{profile?.first_name}</Text>
      </View>
      <View>
        <PhotoArray profileId={profile?.id} />
      </View>

      <View>
        <MessageButton
          setLoading={setLoading}
          loading={loading}
          profileId={profile?.id}
          coach={false}
        />
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
        <PhotoArray profileId={profile?.id} />
      </View>

      <View>
        <UserAboutSection profile={profile} />
      </View>
    </View>
  )
}

export default ConnectionsCard
