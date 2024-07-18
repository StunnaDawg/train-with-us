import { View, Text } from "react-native"
import React from "react"
import { Communities } from "../../../@types/supabaseTypes"

type CommunityPageAboutProps = {
  community: Communities
}

const CommunityPageAbout = ({ community }: CommunityPageAboutProps) => {
  return (
    <View className="flex-1 bg-primary-900">
      <View className="m-5">
        <Text className="font-bold text-2xl text-white">Details</Text>
        <Text className="text-white">
          {community.about}We are a strong community filled with sense of DREAD
        </Text>
      </View>

      <View className="mx-5 my-1">
        <Text className="text-white font-bold">Location</Text>
        <Text className="text-white">{community.city}</Text>
        <Text className="text-white">{community.address}</Text>
      </View>
    </View>
  )
}

export default CommunityPageAbout
