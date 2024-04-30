import { View, Text, ScrollView } from "react-native"
import React from "react"
import { Profile } from "../../../@types/supabaseTypes"

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
      <Text className="text-lg font-medium">June 20th, 1987</Text>
      {/* Gender */}
      <Text className="text-lg font-medium">Gender - Female</Text>
      {/* Location */}
      <Text className="text-lg font-medium">Dartmouth, NS</Text>
      {/* Activity Tags */}
    </View>
  )
}

export default UserAboutSection
