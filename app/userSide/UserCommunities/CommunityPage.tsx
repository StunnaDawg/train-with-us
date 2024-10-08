import { View, Text, SafeAreaView, Pressable } from "react-native"
import React, { useCallback, useEffect, useMemo, useRef, useState } from "react"
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native"
import { NavigationType, RootStackParamList } from "../../@types/navigation"
import { FontAwesome6 } from "@expo/vector-icons"
import BackButton from "../../components/BackButton"
import CommunityBottomModal from "./CommunityBottomModal"
import { BottomSheetModal, useBottomSheetModal } from "@gorhom/bottom-sheet"
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs"
import CommunityNews from "./components/CommunityNews"
import CommunityPageChannels from "./components/CommunityPageChannels"
import CommuntiyPageEvents from "./components/CommuntiyPageEvents"
import CommunityPageMembers from "./components/CommunityPageMembers"
import CommunityPageAbout from "./components/CommunityPageAbout"
import { Events, News, Profile } from "../../@types/supabaseTypes"
import { useAuth } from "../../supabaseFunctions/authcontext"
import { useIsFocused } from "@react-navigation/native"
import getNewsFromCommunity from "../../supabaseFunctions/getFuncs/getNewsFromCommunity"
import getCommunityMembers from "../../supabaseFunctions/getFuncs/getCommunityMembers"
import CommunityPageClasses from "./components/CommunityPageClasses"

const CommunityPage = () => {
  const { userProfile } = useAuth()
  const [communityNewsState, setCommunityNewsState] = useState<News[] | null>(
    null
  )
  const [communityMembers, setCommunityMembers] = useState<Profile[] | null>(
    null
  )
  const [loading, setLoading] = useState<boolean>(true)
  const [
    isSettingsCommunityButtonPressed,
    setIsSettingsCommunityButtonPressed,
  ] = useState<boolean>(false)
  const route = useRoute<RouteProp<RootStackParamList, "CommunityPage">>()
  const navigation = useNavigation<NavigationType>()
  const community = route.params.community
  const bottomSheetModalRef = useRef<BottomSheetModal>(null)
  const { dismiss } = useBottomSheetModal()
  const isFocused = useIsFocused()
  const Tab = createMaterialTopTabNavigator()

  const snapPoints = useMemo(() => ["25%", "90%"], [])

  const handleCommunitySettingsPress = () => {
    setIsSettingsCommunityButtonPressed(true)
  }

  const handleCommunitySettingsPressCancel = () => {
    setIsSettingsCommunityButtonPressed(false)
  }

  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present()
  }, [])
  const handleSheetChanges = useCallback((index: number) => {
    console.log("handleSheetChanges", index)
  }, [])

  useEffect(() => {
    if (isFocused) {
      getCommunityMembers(setLoading, community.id, setCommunityMembers)
      getNewsFromCommunity(setLoading, community.id, setCommunityNewsState)
    }
  }, [community, isFocused])

  const GearIcon = ({ onPress }: { onPress: () => void }) => (
    <Pressable className="active:opacity-50 p-2" onPress={onPress}>
      <FontAwesome6 name="gear" size={22} color="white" />
    </Pressable>
  )

  const MemoizedTabNavigator = useMemo(
    () => (
      <Tab.Navigator
        screenOptions={{
          tabBarStyle: {
            backgroundColor: "#1F2937",
            height: 48,
            elevation: 0,
            shadowOpacity: 0,
          },
          tabBarScrollEnabled: true,
          tabBarIndicatorStyle: { backgroundColor: "#3B82F6", height: 3 },
          tabBarLabelStyle: {
            color: "white",
            fontSize: 14,
            fontWeight: "bold",
            textTransform: "none",
          },
        }}
      >
        <Tab.Screen
          name="Channels"
          options={{
            tabBarLabelStyle: {
              color: "white",
              fontSize: 12,
              fontWeight: "bold",
            },
          }}
        >
          {() => (
            <CommunityPageChannels
              community={community}
              loading={loading}
              setLoadingState={setLoading}
            />
          )}
        </Tab.Screen>
        <Tab.Screen
          options={{
            tabBarLabelStyle: {
              color: "white",
              fontSize: 12,
              fontWeight: "bold",
            },
          }}
          name="News"
        >
          {() => (
            <CommunityNews
              communityNews={communityNewsState}
              userId={userProfile?.id}
            />
          )}
        </Tab.Screen>

        <Tab.Screen
          options={{
            tabBarLabelStyle: {
              color: "white",
              fontSize: 12,
              fontWeight: "bold",
            },
          }}
          name="Events"
        >
          {() => <CommuntiyPageEvents community={community} />}
        </Tab.Screen>

        <Tab.Screen
          options={{
            tabBarLabelStyle: {
              color: "white",
              fontSize: 12,
              fontWeight: "bold",
            },
          }}
          name="Classes"
        >
          {() => <CommunityPageClasses community={community} />}
        </Tab.Screen>

        <Tab.Screen
          options={{
            tabBarLabelStyle: {
              color: "white",
              fontSize: 12,
              fontWeight: "bold",
            },
          }}
          name="Members"
        >
          {() => <CommunityPageMembers communityMembers={communityMembers} />}
        </Tab.Screen>
        <Tab.Screen
          options={{
            tabBarLabelStyle: {
              color: "white",
              fontSize: 12,
              fontWeight: "bold",
            },
          }}
          name="Details"
        >
          {() => <CommunityPageAbout community={community} />}
        </Tab.Screen>
      </Tab.Navigator>
    ),
    [community, communityNewsState, communityMembers, loading, userProfile]
  )

  return (
    <SafeAreaView className="flex-1 bg-gray-900">
      <View className="flex-row items-center justify-between px-4 py-3 bg-primary-900">
        <BackButton colour="white" size={24} />
        <Text className="text-2xl text-white font-bold">
          {community.community_title}
        </Text>
        <GearIcon onPress={handlePresentModalPress} />
      </View>

      {userProfile?.id === community.community_owner && (
        <View className="px-4 py-2">
          <Pressable
            onPress={() =>
              navigation.navigate("MyCommunityHome", {
                communityId: community.id,
              })
            }
            className="bg-blue-600 rounded-lg py-3 active:bg-blue-700"
          >
            <Text className="text-white font-bold text-center">
              My Community Dashboard
            </Text>
          </Pressable>
        </View>
      )}

      {MemoizedTabNavigator}

      <BottomSheetModal
        enablePanDownToClose={true}
        ref={bottomSheetModalRef}
        index={1}
        snapPoints={snapPoints}
        onChange={handleSheetChanges}
        backgroundStyle={{ backgroundColor: "#1F2937" }}
        handleIndicatorStyle={{ backgroundColor: "#9CA3AF" }}
      >
        <CommunityBottomModal community={community} dismiss={dismiss} />
      </BottomSheetModal>
    </SafeAreaView>
  )
}

export default CommunityPage
