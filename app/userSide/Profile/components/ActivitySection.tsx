import { View, Text, ScrollView } from "react-native"
import React from "react"
import ActivityTags from "../../../components/AcvitivityTags"
import { Profile } from "../../../@types/supabaseTypes"

type ActivitySectionProps = {
  profile: Profile | null
}

const ActivitySection = ({ profile }: ActivitySectionProps) => {
  return (
    <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
      <View className="flex flex-row mt-3 ml-2 mr-7">
        <ActivityTags activity="Yoga" />
        <ActivityTags activity="Hockey" />
        <ActivityTags activity="CrossFit" />
        <ActivityTags activity="BodyBuilding" />
        <ActivityTags activity="Yoga" />
        <ActivityTags activity="Hockey" />
        <ActivityTags activity="CrossFit" />
        <ActivityTags activity="BodyBuilding" />
        <ActivityTags activity="Yoga" />
        <ActivityTags activity="Hockey" />
        <ActivityTags activity="CrossFit" />
        <ActivityTags activity="BodyBuilding" />
      </View>
    </ScrollView>
  )
}

export default ActivitySection
