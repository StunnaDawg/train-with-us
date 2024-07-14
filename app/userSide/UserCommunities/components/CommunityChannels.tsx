import { View, Text } from "react-native"
import React from "react"

type CommunityChannelsProps = {
  communityId: number
}

const CommunityChannels = ({ communityId }: CommunityChannelsProps) => {
  return (
    <View>
      <Text className="text-white">{communityId.toString()}</Text>
    </View>
  )
}

export default CommunityChannels
