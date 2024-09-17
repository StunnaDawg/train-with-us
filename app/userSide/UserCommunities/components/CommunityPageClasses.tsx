import { View, Text } from "react-native"
import React from "react"
import { Communities } from "../../../@types/supabaseTypes"
import CommunityScheduleDisplay from "../../../components/CommunityScheduleDisplay"

type CommunityPageClassesProps = {
  community: Communities
}

const CommunityPageClasses = ({ community }: CommunityPageClassesProps) => {
  return (
    <View className="bg-primary-900 flex-1">
      <CommunityScheduleDisplay communityId={community.id} />
    </View>
  )
}

export default CommunityPageClasses
