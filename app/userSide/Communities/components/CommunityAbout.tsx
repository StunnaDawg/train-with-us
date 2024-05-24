import { View, Text } from "react-native"
import React from "react"
import { Communities } from "../../../@types/supabaseTypes"

type CommunityAboutProps = {
  community: Communities | null
}

const CommunityAbout = ({ community }: CommunityAboutProps) => {
  return (
    <View className="mx-12">
      <View className="">
        <Text className="text-3xl font-bold text-white">
          Welcome to {community?.community_title}
        </Text>
      </View>

      <View className="mx-4">
        <Text className="font-semibold text-2xl text-wrap text-white">
          {community?.about}
        </Text>
      </View>
    </View>
  )
}

export default CommunityAbout
