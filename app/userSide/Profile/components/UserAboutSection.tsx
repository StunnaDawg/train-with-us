import { View, Text } from "react-native"
import React from "react"
import { Profile } from "../../../@types/supabaseTypes"

type UserAboutSectionProps = {
  profile: Profile | null
}

const UserAboutSection = ({ profile }: UserAboutSectionProps) => {
  return (
    <View>
      <View className="flex flex-row justify-center my-1">
        <Text className="text-sm font-bold">{profile?.about}</Text>
      </View>
      <Text className="text-sm font-bold">Gender - {profile?.gender}</Text>
      {/* Location */}
      <Text className="text-sm font-semibold">
        Location: {profile?.city}, NS
      </Text>
      {/* Activity Tags */}
    </View>
  )
}

export default UserAboutSection
