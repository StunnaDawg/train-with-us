import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  ActivityIndicator,
} from "react-native"
import React, { useEffect, useState } from "react"
import { RootStackParamList } from "../../@types/navigation"
import { RouteProp, useRoute } from "@react-navigation/native"
import { Profile } from "../../@types/supabaseTypes"
import getProfiles from "../../supabaseFunctions/getFuncs/getProfiles"
import MemberCard from "../Communities/components/MemberCard"
import getCommunityMembersUUIDs from "../../supabaseFunctions/getFuncs/getCommunityMembersUUIDS"

const ViewEventGoers = () => {
  const [loading, setLoading] = useState<boolean>(false)
  const [commmunityMemberUUIDs, setCommunityMemberUUIDs] = useState<
    string[] | null
  >(null)
  const [communityMembers, setCommunityMembers] = useState<Profile[] | null>(
    null
  )
  const route = useRoute<RouteProp<RootStackParamList, "ViewEventGoers">>()
  const eventId = route.params.eventId

  useEffect(() => {
    getCommunityMembersUUIDs(setLoading, eventId, setCommunityMemberUUIDs)
  }, [])

  useEffect(() => {
    if (commmunityMemberUUIDs) {
      const getCommunityMembers = async () => {
        getProfiles(setLoading, commmunityMemberUUIDs, setCommunityMembers)
      }
      getCommunityMembers()
    }
  }, [commmunityMemberUUIDs])

  return (
    <SafeAreaView className="flex-1">
      <View className="m-2">
        <Text className=" font-bold text-xl">Members</Text>
        <ScrollView className=" h-full">
          {!loading ? (
            communityMembers?.map((member) => {
              return <MemberCard key={member.id} member={member} />
            })
          ) : (
            <ActivityIndicator />
          )}
        </ScrollView>
      </View>
    </SafeAreaView>
  )
}

export default ViewEventGoers
