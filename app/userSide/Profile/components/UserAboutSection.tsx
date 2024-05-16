import { View, Text, ScrollView } from "react-native"
import React from "react"
import { Profile } from "../../../@types/supabaseTypes"
import formatBirthdate from "../../../utilFunctions/calculateDOB"

type UserAboutSectionProps = {
  profile: Profile | null
}

const UserAboutSection = ({ profile }: UserAboutSectionProps) => {
  return (
    <View className="mt-4 ml-7 mr-7 ">
      {/* About */}
      <Text className="text-lg font-medium">
        Single, interested in social networking
      </Text>
      {/* Birthday */}
      <Text className="text-lg font-medium">
        {profile?.birthday ? formatBirthdate(profile?.birthday) : null}
      </Text>
      {/* Gender */}
      <Text className="text-lg font-medium">{profile?.gender}</Text>
      {/* Location */}
      <Text className="text-lg font-medium">{profile?.city}</Text>
      {/* Activity Tags */}
    </View>
  )
}

export default UserAboutSection
