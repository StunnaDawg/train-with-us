import {
  View,
  Text,
  SafeAreaView,
  Pressable,
  ScrollView,
  Alert,
} from "react-native"
import React, { useCallback, useEffect, useMemo, useRef, useState } from "react"
import {
  RouteProp,
  useFocusEffect,
  useNavigation,
  useRoute,
} from "@react-navigation/native"
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
import getNewsFromCommunity from "../../supabaseFunctions/getFuncs/getNewsFromCommunity"
import getCommunityMembers from "../../supabaseFunctions/getFuncs/getCommunityMembers"

const CommunityPage = () => {
  const { userProfile } = useAuth()
  const [communityNewsState, setCommunityNewsState] = useState<News[] | null>(
    null
  )
  const [gearPressed, setGearPressed] = useState<boolean>(false)
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

  const Tab = createMaterialTopTabNavigator()

  const snapPoints = useMemo(() => ["25%", "90%"], [])

  const handleGearPressIn = () => {
    setGearPressed(true)
  }

  const handleGearPressOut = () => {
    setGearPressed(false)
  }

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
    getCommunityMembers(setLoading, community.id, setCommunityMembers)
    getNewsFromCommunity(setLoading, community.id, setCommunityNewsState)
  }, [community])

  return (
    <SafeAreaView className="flex-1 bg-primary-900">
      {/* {loading ? (
        <CommunityPageSkeleton />
      ) : ( */}
      <>
        <View className="flex flex-row m-2 items-center justify-between">
          <BackButton colour="white" size={22} />
          <View>
            <Text className="text-2xl text-white font-bold">
              {community.community_title}
            </Text>
          </View>

          <Pressable
            className={`${gearPressed ? "opacity-50" : null}`}
            onPressIn={handleGearPressIn}
            onPressOut={handleGearPressOut}
            onPress={handlePresentModalPress}
          >
            <FontAwesome6 name="gear" size={22} color="white" />
          </Pressable>
        </View>

        <View className="m-1">
          {userProfile?.id === community.community_owner && (
            <Pressable
              onPressIn={handleCommunitySettingsPress}
              onPressOut={handleCommunitySettingsPressCancel}
              onPress={() =>
                navigation.navigate("MyCommunityHome", {
                  communityId: community.id,
                })
              }
              className={`${
                isSettingsCommunityButtonPressed ? "opacity-50" : null
              } bg-slate-400/60 rounded-lg p-2 m-2`}
            >
              <Text className="text-white font-bold text-sm text-center">
                My Community Dashboard
              </Text>
            </Pressable>
          )}
        </View>

        <Tab.Navigator
          screenOptions={{
            tabBarStyle: { backgroundColor: "#00000", height: 32 },
            tabBarScrollEnabled: true,
            tabBarIndicatorStyle: { backgroundColor: "blue" },
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
            {() => <CommunityNews communityNews={communityNewsState} />}
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
      </>

      <BottomSheetModal
        enablePanDownToClose={true}
        ref={bottomSheetModalRef}
        index={1}
        snapPoints={snapPoints}
        onChange={handleSheetChanges}
      >
        <CommunityBottomModal community={community} dismiss={dismiss} />
      </BottomSheetModal>
    </SafeAreaView>
  )
}

export default CommunityPage
