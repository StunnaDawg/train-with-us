import {
  View,
  Text,
  SafeAreaView,
  FlatList,
  Pressable,
  TouchableOpacity,
} from "react-native"
import React, { useCallback, useState } from "react"
import {
  RouteProp,
  useFocusEffect,
  useNavigation,
  useRoute,
} from "@react-navigation/native"
import { NavigationType, RootStackParamList } from "../../@types/navigation"
import BackButton from "../../components/BackButton"
import { CommunitySchedule } from "../../@types/supabaseTypes"
import supabase from "../../../lib/supabase"
import showAlert from "../../utilFunctions/showAlert"

const ManageSchedules = () => {
  const [communitySchedules, setCommunitySchedules] = useState<
    CommunitySchedule[]
  >([])
  const route = useRoute<RouteProp<RootStackParamList, "ManageSchedules">>()
  const community = route.params.community
  const navigation = useNavigation<NavigationType>()

  const getSchedulesFunc = async () => {
    console.log(community.id)
    try {
      const { data, error } = await supabase
        .from("community_class_schedule")
        .select("*")
        .eq("community_id", community.id)
      if (error) {
        showAlert({
          title: "Error",
          message: error.message,
        })
        throw error
      }
      if (data) {
        setCommunitySchedules(data)
        console.log(data)
      }
    } catch (error) {
      showAlert({
        title: "Error",
        message: "Unexpected error",
      })
      navigation.goBack()
    }
  }

  useFocusEffect(
    useCallback(() => {
      let isMounted = true
      getSchedulesFunc()
      return () => {
        isMounted = false
      }
    }, [])
  )

  return (
    <SafeAreaView className="flex-1 bg-gray-900">
      <View className="flex-row justify-between items-center px-4 py-3">
        <BackButton size={24} colour="white" />
        <Text className="text-xl font-bold text-white">Manage Schedules</Text>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("CreateSchedule", {
              communityId: community.id,
            })
          }
        >
          <Text className="text-blue-500 font-semibold">Create</Text>
        </TouchableOpacity>
      </View>

      <View className="flex-1 px-4 py-2">
        <FlatList
          data={communitySchedules}
          renderItem={({ item }) => (
            <Pressable
              onPress={() => {
                navigation.navigate("EditSchedule", {
                  schedule: item,
                  communityId: community.id,
                })
              }}
              className="bg-gray-800 rounded-lg mb-2 p-4"
            >
              <Text className="text-white text-lg font-semibold">
                {item.schedule_name}
              </Text>
              <Text className="text-gray-300 text-sm mt-1">Tap to edit</Text>
            </Pressable>
          )}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ paddingBottom: 20 }}
        />
      </View>
    </SafeAreaView>
  )
}

export default ManageSchedules
