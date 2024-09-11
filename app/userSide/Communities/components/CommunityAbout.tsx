import { View, Text } from "react-native"
import React from "react"
import { Communities } from "../../../@types/supabaseTypes"
import { ScrollView } from "react-native-gesture-handler"
import ActivityTags from "../../../components/AcvitivityTags"

type CommunityAboutProps = {
  community: Communities | null
}

const CommunityAbout = ({ community }: CommunityAboutProps) => {
  return (
    <View>
      <View className="mx-2">
        <Text className="text-xl font-bold text-white">
          Welcome to {community?.community_title}!
        </Text>
      </View>

      <View className="mx-4">
        <Text className="font-semibold text-sm text-wrap text-white">
          {community?.about}
        </Text>
      </View>
      <ScrollView
        showsHorizontalScrollIndicator={false}
        horizontal={true}
        className="mt-1"
      >
        {community?.community_tags && community.community_tags.length > 0
          ? community.community_tags.map((tag) => (
              <View key={tag} className="mb-1">
                <ActivityTags activity={`${tag}`} />
              </View>
            ))
          : null}
      </ScrollView>
    </View>
  )
}

export default CommunityAbout
