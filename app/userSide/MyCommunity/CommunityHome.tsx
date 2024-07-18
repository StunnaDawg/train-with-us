import { View, Text, SafeAreaView, ScrollView, Pressable } from "react-native"
import React, { useCallback, useEffect, useState } from "react"
import { FontAwesome6 } from "@expo/vector-icons"
import { NavigationType, RootStackParamList } from "../../@types/navigation"
import { useFocusEffect, useNavigation } from "@react-navigation/native"
import getSingleCommunity from "../../supabaseFunctions/getFuncs/getSingleCommunity"
import { useAuth } from "../../supabaseFunctions/authcontext"
import { Communities } from "../../@types/supabaseTypes"
import { RouteProp, useRoute } from "@react-navigation/native"
import BackButton from "../../components/BackButton"

const CommunityHome = () => {
  const [loading, setLoading] = useState<boolean>(false)
  const [currentCommunity, setCurrentCommunity] = useState<Communities | null>(
    {} as Communities
  )
  const navigation = useNavigation<NavigationType>()
  const route = useRoute<RouteProp<RootStackParamList, "MyCommunityHome">>()
  const communityId = route.params.communityId

  useFocusEffect(
    useCallback(() => {
      const getCommunityUpdates = async () => {
        getSingleCommunity(setLoading, communityId, setCurrentCommunity)
      }

      getCommunityUpdates()

      return () => {
        // Optional cleanup actions
      }
    }, [communityId, setCurrentCommunity])
  )
  return (
    <SafeAreaView className="flex-1">
      <View className="flex flex-row justify-between px-5 pb-2 border-b items-center">
        <View className="mb-1">
          <BackButton size={24} />
        </View>

        <Text className="font-bold text-lg">
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
      <ScrollView>
        <View className="border rounded-xl mx-3 py-3  mt-5">
          <View className="border-b pb-2">
            <Pressable
              onPress={() => {
                navigation.navigate("CreateChannel", {
                  communityId: communityId,
                })
              }}
            >
              <Text className="mx-2 font-bold text-sm">Create Channel</Text>
            </Pressable>
          </View>

          <View className="border-b pb-2 ">
            <Pressable
              className="pt-2"
              onPress={() => {
                navigation.navigate("CreateEvent")
              }}
            >
              <Text className="mx-2 font-bold text-sm">Create Event</Text>
            </Pressable>
          </View>

          <View>
            <Pressable
              className="pt-2"
              onPress={() => {
                navigation.navigate("ViewCommunitiesScreen", {
                  communityId: communityId,
                })
              }}
            >
              <Text className="mx-2 font-bold text-sm">
                View Community Profile
              </Text>
            </Pressable>
          </View>
        </View>

        <View className="border rounded-xl mx-3 py-3  mt-5">
          <View className="border-b pb-2">
            <Pressable
              onPress={() => {
                navigation.navigate("MyCommunityRequests", {
                  communityId: communityId,
                  communityTitle: currentCommunity?.community_title,
                })
              }}
            >
              <Text className="mx-2 font-bold text-sm">View Requests</Text>
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
              <Text className="mx-2 font-bold text-sm">Manage Members</Text>
            </Pressable>
          </View>

          <View className="border-b pb-2">
            <Pressable
              className="pt-2"
              onPress={() => {
                navigation.navigate("MyCommunityEvents", {
                  communityId: communityId,
                })
              }}
            >
              <Text className="mx-2 font-bold text-sm">Manage Events</Text>
            </Pressable>
          </View>
          <View>
            <Pressable
              className="pt-2"
              onPress={() => {
                navigation.navigate("ManageChannels", {
                  communityId: communityId,
                })
              }}
            >
              <Text className="mx-2 font-bold text-sm">Manage Channels</Text>
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default CommunityHome
