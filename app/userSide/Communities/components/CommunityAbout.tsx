import { View, Text } from "react-native"
import React from "react"
import { Communities } from "../../../@types/supabaseTypes"

type CommunityAboutProps = {
  community: Communities | null
}

const CommunityAbout = ({ community }: CommunityAboutProps) => {
  return (
    <View className="items-center">
      <View className="">
        <Text className="text-xl font-bold text-white">
          Welcome to Blended Athletics
        </Text>
      </View>

      <View className="mx-4">
        <Text className="font-semibold text-lg text-wrap text-white">
          {community?.about}
        </Text>
      </View>
    </View>
  )
}

export default CommunityAbout
