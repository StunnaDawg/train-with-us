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
  const [pressed, setPressed] = useState<boolean>(false)

  return (
    <View
      className={`${borderBottom ? "border-b border-gray-300" : ""} py-3 px-4`}
    >
      <TouchableOpacity
        onPress={onPress}
        onPressIn={() => setPressed(true)}
        onPressOut={() => setPressed(false)}
      >
        <View className="flex-row items-center justify-between">
          <Text className="text-base font-semibold text-gray-800">{title}</Text>
          <Text className="text-gray-500 text-xl">›</Text>
        </View>
      </TouchableOpacity>
    </View>
  )
}

const CommunityHome: React.FC = () => {
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
      <View className="flex flex-row justify-between px-5 pb-2 border-b items-center">
        <View className="mb-1">
          <BackButton size={22} colour="white" />
        </View>
        <Text className="font-bold text-white text-xl">
          {currentCommunity?.community_title} settings
        </Text>
        <View />
      </View>
      <ScrollView>
        <View className="border rounded-xl mx-3 py-3 mt-5 bg-white shadow-md">
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
