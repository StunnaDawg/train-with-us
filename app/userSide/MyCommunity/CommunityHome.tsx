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
  const [pressed, setPressed] = useState<string | null>(null)

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
    <SafeAreaView className="flex-1 bg-primary-900">
      <View className="flex flex-row justify-between px-5 pb-2 border-b  items-center">
        <View className="mb-1">
          <BackButton size={24} colour="white" />
        </View>

        <Text className="font-bold  text-white text-lg">
          {currentCommunity?.community_title}
        </Text>

        <Pressable
          onPress={() => {
            if (!currentCommunity) return
            navigation.navigate("MyCommunitySettings", {
              community: currentCommunity,
            })
          }}
          onPressIn={() => setPressed("settings")}
          onPressOut={() => setPressed(null)}
          style={{ opacity: pressed === "settings" ? 0.5 : 1 }}
        >
          <FontAwesome6 name="gear" size={24} color="white" />
        </Pressable>
      </View>
      <ScrollView>
        <View className="border rounded-xl mx-3 py-3  mt-5 bg-slate-300">
          <View
            style={{ opacity: pressed === "createChannel" ? 0.5 : 1 }}
            className="border-b pb-2 bg-slate-300"
          >
            <Pressable
              onPress={() => {
                navigation.navigate("CreateChannel", {
                  communityId: communityId,
                })
              }}
              onPressIn={() => setPressed("createChannel")}
              onPressOut={() => setPressed(null)}
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
              onPressIn={() => setPressed("createEvent")}
              onPressOut={() => setPressed(null)}
              style={{ opacity: pressed === "createEvent" ? 0.5 : 1 }}
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
              onPressIn={() => setPressed("viewCommunityProfile")}
              onPressOut={() => setPressed(null)}
              style={{ opacity: pressed === "viewCommunityProfile" ? 0.5 : 1 }}
            >
              <Text className="mx-2 font-bold text-sm">
                Preview Community Profile
              </Text>
            </Pressable>
          </View>
        </View>

        <View className="border rounded-xl mx-3 py-3  mt-5 bg-slate-300">
          <View className="border-b pb-2">
            <Pressable
              onPress={() => {
                navigation.navigate("MyCommunityRequests", {
                  communityId: communityId,
                  communityTitle: currentCommunity?.community_title,
                })
              }}
              onPressIn={() => setPressed("viewRequests")}
              onPressOut={() => setPressed(null)}
              style={{ opacity: pressed === "viewRequests" ? 0.5 : 1 }}
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
              onPressIn={() => setPressed("manageMembers")}
              onPressOut={() => setPressed(null)}
              style={{ opacity: pressed === "manageMembers" ? 0.5 : 1 }}
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
              onPressIn={() => setPressed("manageEvents")}
              onPressOut={() => setPressed(null)}
              style={{ opacity: pressed === "manageEvents" ? 0.5 : 1 }}
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
              onPressIn={() => setPressed("manageChannels")}
              onPressOut={() => setPressed(null)}
              style={{ opacity: pressed === "manageChannels" ? 0.5 : 1 }}
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
