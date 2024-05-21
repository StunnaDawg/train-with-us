import { View, Text, ScrollView } from "react-native"
import React from "react"
import { Profile } from "../../../@types/supabaseTypes"
import formatBirthdate from "../../../utilFunctions/calculateDOB"
import ActivityTags from "../../../components/AcvitivityTags"

type UserAboutSectionProps = {
  profile: Profile | null
}

const UserAboutSection = ({ profile }: UserAboutSectionProps) => {
  return (
    <View className="mt-4 ml-7 mr-7 ">
      {/* About */}
      {/* <Text className="text-lg font-medium">
        Single, interested in social networking
      </Text> */}
      {/* Birthday */}
      <Text className="text-lg font-medium">
        DOB: {profile?.birthday ? formatBirthdate(profile?.birthday) : null}
      </Text>
      {/* Gender */}
      <Text className="text-lg font-medium">Gender - {profile?.gender}</Text>
      {/* Location */}
      <Text className="text-lg font-medium">Location: {profile?.city}, NS</Text>
      {/* Activity Tags */}
      <View>
        {profile?.activities && profile?.activities.length > 0 ? (
          <View className="flex flex-row flex-wrap">
            {profile?.activities.map((activity, index) => (
              <ActivityTags key={index} activity={activity} />
            ))}
          </View>
        ) : null}
      </View>
    </View>
  )
}

export default UserAboutSection
