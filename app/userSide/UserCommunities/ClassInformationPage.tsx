import {
  View,
  Text,
  Pressable,
  SafeAreaView,
  FlatList,
  ScrollView,
} from "react-native"
import React, { useEffect, useState } from "react"
import { RouteProp, useRoute } from "@react-navigation/native"
import { RootStackParamList } from "../../@types/navigation"
import { CommunitySchedule } from "../../@types/supabaseTypes"
import supabase from "../../../lib/supabase"

import BackButton from "../../components/BackButton"
import ActivityTags from "../../components/AcvitivityTags"
import { format, parseISO } from "date-fns"

const ClassInformationPage = () => {
  const [loading, setLoading] = useState<boolean>(true)
  const [classSchedule, setClassSchedule] = useState<CommunitySchedule[]>([])
  const route =
    useRoute<RouteProp<RootStackParamList, "ClassInformationPage">>()
  const classObject = route.params.class

  const formatTime = (start_time: string) => {
    const date = parseISO(start_time)
    const formattedTime = format(date, "hh:mm a")
    return formattedTime
  }

  const getClassSchedule = async () => {
    try {
      const { data, error } = await supabase
        .from("community_class_schedule")
        .select("*")
        .eq("class_id", classObject.id)
      if (error) {
        console.log(error)
        return
      }
      setClassSchedule(data)
    } catch (error) {
      console.log(error)
    }
  }

  const renderItem = ({ item }: { item: CommunitySchedule }) => {
    return (
      <View className="border border-white/20 rounded-lg p-4 mb-3">
        <View className="flex flex-row items-center justify-center">
          <Text className="text-white font-bold text-lg">
            {formatTime(item.start_time)}
          </Text>
          <Text className="text-white/70 font-semibold mx-1 text-lg">
            Class
          </Text>
        </View>
        <View className="flex flex-row flex-wrap mt-2">
          {item.selected_days_of_week.map((day) => (
            <Text key={day} className="text-white/60 mr-3 mb-1">
              {day}
            </Text>
          ))}
        </View>
      </View>
    )
  }

  useEffect(() => {
    getClassSchedule()
  }, [classObject])

  return (
    <SafeAreaView className="flex-1 bg-primary-900">
      <View className="flex flex-row justify-between items-center border-b border-white/10 p-4">
        <BackButton colour="white" />
        <Text className="font-bold text-2xl text-white flex-1 text-center mr-8">
          {classObject.class_name}
        </Text>
      </View>

      <ScrollView className="flex-1">
        <View className="p-6">
          <Text className="text-white font-semibold text-lg mb-4">
            {classObject.description}
          </Text>
          <View className="flex flex-row flex-wrap">
            {classObject.class_tags && classObject.class_tags.length > 0
              ? classObject.class_tags.map((tag) => (
                  <View key={tag} className="mr-3">
                    <ActivityTags activity={`${tag}`} />
                  </View>
                ))
              : null}
          </View>
        </View>

        <View className="px-6">
          <Text className="text-white text-xl font-semibold mb-4">
            Schedule
          </Text>
          <FlatList
            keyExtractor={(item) => item.id.toString()}
            data={classSchedule}
            renderItem={renderItem}
            contentContainerStyle={{ paddingBottom: 24 }}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default ClassInformationPage
