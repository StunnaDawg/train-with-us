import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  ActivityIndicator,
  Pressable,
  Alert,
} from "react-native"
import React, { useEffect, useState } from "react"
import { RootStackParamList } from "../../@types/navigation"
import { RouteProp, useRoute } from "@react-navigation/native"
import { Profile } from "../../@types/supabaseTypes"
import getCommunityMembersUUID from "../../supabaseFunctions/getFuncs/getCommunityMembers"
import supabase from "../../../lib/supabase"
import getProfiles from "../../supabaseFunctions/getFuncs/getProfiles"
import MemberCard from "../Communities/components/MemberCard"
import { MaterialCommunityIcons } from "@expo/vector-icons"
import { set } from "date-fns"
import showAlert from "../../utilFunctions/showAlert"
import BackButton from "../../components/BackButton"

const ManageCommunityMembers = () => {
  const [loading, setLoading] = useState<boolean>(false)
  const [commmunityMemberUUIDs, setCommunityMemberUUIDs] = useState<
    string[] | null
  >(null)
  const [communityMembers, setCommunityMembers] = useState<Profile[] | null>(
    null
  )
  const route = useRoute<RouteProp<RootStackParamList, "MyCommunityMembers">>()
  const communityId = route.params.communityId

  const showAlertOptions = (userId: string) => {
    Alert.alert(
      "Choose an Option",
      "Select an action to perform:",
      [
        {
          text: "cancel",

          style: "cancel",
        },
        {
          text: "Upgrade User to Coach",
          onPress: () => {
            upgradeUser(userId),
              getCommunityMembersUUID(
                setLoading,
                communityId,
                setCommunityMemberUUIDs
              )
          },
          style: "default",
        },
        {
          text: "Kick User",
          onPress: () => {
            kickUser(userId),
              setTimeout(() => {
                setLoading(true),
                  getCommunityMembersUUID(
                    setLoading,
                    communityId,
                    setCommunityMemberUUIDs
                  )
                setLoading(false)
              }, 500)
          },
          style: "destructive",
        },
      ],
      { cancelable: true } // This makes it possible to tap outside of the alert and cancel it
    )
  }

  const upgradeUser = async (userId: string) => {
    const { data, error } = await supabase
      .from("community_members")
      .update({ role: "Coach" })
      .eq("user_id", userId)
    if (error) {
      console.log("error", error)
      showAlert({ title: "Error", message: "Error Updating User Role" })
      throw error
    }
    console.log("data", data)
    showAlert({ title: "Success", message: "User has been Upgraded to Coach" })
  }

  const kickUser = async (userId: string) => {
    const { data, error } = await supabase
      .from("community_members")
      .delete()
      .eq("user_id", userId)
    if (error) {
      console.log("error", error)
      showAlert({ title: "Error", message: "Error Kicking User" })
      throw error
    }
    console.log("data", data)
    showAlert({ title: "User Kicked", message: "User has been kicked" })
  }

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
              return member.first_name ? (
                <View className="flex flex-row justify-between items-center">
                  <MemberCard key={member.id} member={member} />
                  <Pressable onPress={() => showAlertOptions(member.id)}>
                    <MaterialCommunityIcons
                      name="dots-vertical"
                      size={24}
                      color="black"
                    />
                  </Pressable>
                </View>
              ) : null
            })
          ) : (
            <ActivityIndicator />
          )}
        </ScrollView>
      </View>
    </SafeAreaView>
  )
}

export default ManageCommunityMembers
