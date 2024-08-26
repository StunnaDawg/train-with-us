import { View, Text } from "react-native"
import React, { Dispatch, SetStateAction } from "react"
import { Profile } from "../../../@types/supabaseTypes"

type ConnectionsScrollCardProps = {
  profile: Profile
}

const ConnectionsScrollCard = ({ profile }: ConnectionsScrollCardProps) => {
  return (
    <View>
      <Text className="text-white">{profile.first_name}</Text>
    </View>
  )
}

export default ConnectionsScrollCard
