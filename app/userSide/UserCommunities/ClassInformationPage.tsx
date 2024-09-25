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
      <View className="flex flex-row m-2">
        <View>
          <View className="flex flex-row justify-center">
            <Text className="text-white font-bold mx-1">
              {formatTime(item.start_time)} Class
            </Text>
          </View>
          <View className="flex flex-row flex-wrap">
            {item.selected_days_of_week.map((day) => (
              <Text key={day} className="text-white mx-1 font-semibold">
                {day}
              </Text>
            ))}
          </View>
        </View>
      </View>
    )
  }

  useEffect(() => {
    getClassSchedule()
  }, [classObject])

  return (
    <SafeAreaView className="flex-1 bg-primary-900 ">
      <View className="flex flex-row justify-between items-center border-b border-slate-300 p-2">
        <BackButton colour="white" />
        <Text className="font-bold text-lg text-center text-white">
          {classObject.class_name}
        </Text>
        <View />
      </View>

      <View className="p-2">
        <Text className="text-white font-semibold text-lg">
          {" "}
          {classObject.description}
        </Text>
        <ScrollView
          showsHorizontalScrollIndicator={false}
          horizontal={true}
          className="mt-1"
        >
          {classObject.class_tags && classObject.class_tags.length > 0
            ? classObject.class_tags.map((tag) => (
                <View key={tag} className="mb-1">
                  <ActivityTags activity={`${tag}`} />
                </View>
              ))
            : null}
        </ScrollView>
      </View>

      <View>
        <Text className="text-white text-xl font-semibold"> Schedule</Text>
        <View className="flex flex-row">
          <FlatList
            keyExtractor={(item) => item.id.toString()}
            data={classSchedule}
            renderItem={renderItem}
          />
        </View>
      </View>
    </SafeAreaView>
  )
}

export default ClassInformationPage
