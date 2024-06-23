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
import getCommunityMembersUUID from "../../supabaseFunctions/getFuncs/getCommunityMembers"
import supabase from "../../../lib/supabase"
import getProfiles from "../../supabaseFunctions/getFuncs/getProfiles"
import MemberCard from "./components/MemberCard"
import BackButton from "../../components/BackButton"

const CommunityMembers = () => {
  const [loading, setLoading] = useState<boolean>(false)
  const [commmunityMemberUUIDs, setCommunityMemberUUIDs] = useState<
    string[] | null
  >(null)
  const [communityMembers, setCommunityMembers] = useState<Profile[] | null>(
    null
  )
  const route =
    useRoute<RouteProp<RootStackParamList, "ViewCommunitiesMembersScreen">>()
  const communityId = route.params.communityId

  useEffect(() => {
    getCommunityMembersUUID(setLoading, communityId, setCommunityMemberUUIDs)
  }, [])

  useEffect(() => {
    if (commmunityMemberUUIDs) {
      const getCommunityMembers = async () => {
        getProfiles(setLoading, commmunityMemberUUIDs, setCommunityMembers)
      }
      getCommunityMembers()
    }
  }, [commmunityMemberUUIDs])

  useEffect(() => {
    console.log("communityMembers", communityMembers)
  }, [communityMembers])

  return (
    <SafeAreaView className="flex-1">
      <View className="m-2">
        <View className="flex flex-row justify-between items-center">
          <BackButton />
          <Text className=" font-bold text-xl">Members</Text>
          <View />
        </View>
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

export default CommunityMembers
