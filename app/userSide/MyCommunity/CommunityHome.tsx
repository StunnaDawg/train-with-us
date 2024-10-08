import { View, Text, SafeAreaView, ScrollView, Pressable } from "react-native"
import React, { useCallback, useState } from "react"
import { NavigationType, RootStackParamList } from "../../@types/navigation"
import { useFocusEffect, useNavigation } from "@react-navigation/native"
import getSingleCommunity from "../../supabaseFunctions/getFuncs/getSingleCommunity"
import { Communities } from "../../@types/supabaseTypes"
import { RouteProp, useRoute } from "@react-navigation/native"
import BackButton from "../../components/BackButton"
import { TouchableOpacity } from "react-native-gesture-handler"

interface PressableItemProps {
  title: string
  onPress: () => void
  borderBottom?: boolean
}

const PressableItem: React.FC<PressableItemProps> = ({
  title,
  onPress,
  borderBottom = true,
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      className={`py-4 px-4 ${borderBottom ? "border-b border-gray-200" : ""}`}
    >
      <View className="flex-row items-center justify-between">
        <Text className="text-base font-semibold text-gray-800">{title}</Text>
        <Text className="text-gray-500 text-xl">›</Text>
      </View>
    </TouchableOpacity>
  )
}

const CommunityHome = () => {
  const [loading, setLoading] = useState<boolean>(false)
  const [currentCommunity, setCurrentCommunity] = useState<Communities | null>(
    null
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
    }, [communityId])
  )

  const navigateTo = (
    screen: any,
    params: Partial<RootStackParamList[keyof RootStackParamList]> = {}
  ) => {
    if (!currentCommunity && screen !== "ViewCommunitiesScreen") return
    navigation.navigate(screen, {
      ...params,
      communityId,
      community: currentCommunity,
    } as any)
  }

  return (
    <SafeAreaView className="flex-1 bg-primary-900">
      <View className="flex-row justify-between items-center px-4 py-2 bg-primary-800">
        <BackButton size={22} colour="white" />
        <Text className="font-bold text-white text-xl">
          {currentCommunity?.community_title || "Community"} Settings
        </Text>
        <View style={{ width: 22 }} />
      </View>
      <ScrollView className="flex-1 px-4 py-4">
        <View className="bg-white rounded-xl shadow-md mb-12">
          <PressableItem
            title="Create Channel"
            onPress={() => navigateTo("CreateChannel")}
          />
          <PressableItem
            title="Create Event"
            onPress={() => navigateTo("CreateEvent")}
          />
          <PressableItem
            title="Create News Post"
            onPress={() =>
              navigateTo("CreateNewsPost", {
                communityTitle: currentCommunity?.community_title,
              })
            }
          />
          <PressableItem
            title="Preview Community Profile"
            onPress={() => navigateTo("ViewCommunitiesScreen")}
          />
          <PressableItem
            title="View Requests"
            onPress={() =>
              navigateTo("MyCommunityRequests", {
                communityTitle: currentCommunity?.community_title,
              })
            }
          />
          <PressableItem
            title="Manage Members"
            onPress={() => navigateTo("MyCommunityMembers")}
          />
          <PressableItem
            title="Manage Events"
            onPress={() => navigateTo("MyCommunityEvents")}
          />
          <PressableItem
            title="Update Community Info"
            onPress={() => navigateTo("MyCommunitySettings")}
          />
          <PressableItem
            title="Manage Classes"
            onPress={() => navigateTo("ManageClasses")}
          />
          <PressableItem
            title="Manage Class Schedules"
            onPress={() => navigateTo("ManageSchedules")}
          />
          <PressableItem
            title="Manage Channels"
            onPress={() => navigateTo("ManageChannels")}
            borderBottom={false}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default CommunityHome
