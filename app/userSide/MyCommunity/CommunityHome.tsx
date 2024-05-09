import { View, Text, SafeAreaView, ScrollView, Pressable } from "react-native"
import React, { useEffect, useState } from "react"
import { FontAwesome6 } from "@expo/vector-icons"
import { NavigationType, RootStackParamList } from "../../@types/navigation"
import { useNavigation } from "@react-navigation/native"
import getSingleCommunity from "../../supabaseFunctions/getFuncs/getSingleCommunity"
import { useAuth } from "../../supabaseFunctions/authcontext"
import { Communities } from "../../@types/supabaseTypes"
import { RouteProp, useRoute } from "@react-navigation/native"

const CommunityHome = () => {
  const { user } = useAuth()
  const [loading, setLoading] = useState<boolean>(false)
  const [currentCommunity, setCurrentCommunity] = useState<Communities | null>(
    {} as Communities
  )
  const navigation = useNavigation<NavigationType>()
  const route = useRoute<RouteProp<RootStackParamList, "MyCommunityHome">>()
  const communityId = route.params.communityId

  useEffect(() => {
    if (!user) return
    getSingleCommunity(setLoading, communityId, setCurrentCommunity)
  }, [])
  return (
    <SafeAreaView className="flex-1">
      <ScrollView>
        <View className="flex flex-row justify-between mx-5">
          <Text className="font-bold text-2xl">
            {currentCommunity?.community_title}
          </Text>

          <Pressable
            onPress={() => {
              if (!currentCommunity) return
              navigation.navigate("MyCommunitySettings", {
                community: currentCommunity,
              })
            }}
          >
            <FontAwesome6 name="gear" size={24} color="black" />
          </Pressable>
        </View>

        <View className="mx-5">
          <Text className="font-bold text-lg">15 Members</Text>
        </View>

        <View className="border rounded-xl mx-3 py-2  mt-5">
          <View className="border-b pb-2">
            <Pressable
              onPress={() => {
                navigation.navigate("CreateChannel", {
                  communityId: communityId,
                })
              }}
            >
              <Text className="mx-2 font-bold text-xl">Create Channel</Text>
            </Pressable>
          </View>

          <View>
            <Pressable
              className="pt-2"
              onPress={() => {
                navigation.navigate("CreateEvent")
              }}
            >
              <Text className="mx-2 font-bold text-xl">Create Event</Text>
            </Pressable>
          </View>
        </View>

        <View className="border rounded-xl mx-3 py-2  mt-5">
          <View className="border-b pb-2">
            <Pressable
              onPress={() => {
                navigation.navigate("MyCommunityRequests", {
                  communityId: communityId,
                })
              }}
            >
              <Text className="mx-2 font-bold text-xl">View Requests</Text>
            </Pressable>
          </View>

          <View className="border-b pb-2">
            <Pressable
              className="pt-2"
              onPress={() => {
                navigation.navigate("MyCommunityMembers", {
                  communityId: communityId,
                })
              }}
            >
              <Text className="mx-2 font-bold text-xl">Manage Members</Text>
            </Pressable>
          </View>

          <View>
            <Pressable
              className="pt-2"
              onPress={() => {
                navigation.navigate("MyCommunityEvents", {
                  communityId: communityId,
                })
              }}
            >
              <Text className="mx-2 font-bold text-xl">Manage Events</Text>
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default CommunityHome
