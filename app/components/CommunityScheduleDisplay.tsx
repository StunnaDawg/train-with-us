import { View, Text, TouchableOpacity, StyleSheet } from "react-native"
import React, { useEffect, useState } from "react"
import { CommunitySchedule } from "../@types/supabaseTypes"
import supabase from "../../lib/supabase"
import { FlatList, ScrollView } from "react-native-gesture-handler"
import ClassDisplayCard from "./ClassDisplayCard"

// So all we need to do is create Monday - Friday Headers then every class that includes that day
// will be displayed under that header. Also we need to display the time of the class. In order and display its duration.
// User will be able to click on the class and see more details about the class.
// I don't know how to do this yet but I will figure it out.

type CommunityScheduleDisplayProps = {
  communityId: number
}

const CommunityScheduleDisplay = ({
  communityId,
}: CommunityScheduleDisplayProps) => {
  const [selectedDay, setSelectedDay] = useState<string>("Monday")
  const [loading, setLoading] = useState<boolean>(false)
  const [communitySchedule, setCommunitySchedule] = useState<
    CommunitySchedule[]
  >([])

  const getCommunitySchedule = async () => {
    try {
      setLoading(true)
      const { data, error } = await supabase
        .from("community_class_schedule")
        .select("*")
        .eq("community_id", communityId)

      if (error) {
        console.log(error)
        return
      }

      const sortedData = data.sort((a, b) => {
        const timeA =
          new Date(a.start_time).getHours() * 60 +
          new Date(a.start_time).getMinutes()
        const timeB =
          new Date(b.start_time).getHours() * 60 +
          new Date(b.start_time).getMinutes()
        return timeA - timeB
      })
      setCommunitySchedule(sortedData)
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
      console.log("Community Schedule", communitySchedule)
    }
  }

  useEffect(() => {
    getCommunitySchedule()
  }, [communityId])

  const classesForSelectedDay = communitySchedule.filter((item) =>
    item.selected_days_of_week.includes(selectedDay)
  )

  const daysOfWeek = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ]

  const renderItem = ({ item }: { item: CommunitySchedule }) => {
    return (
      <View>
        <ClassDisplayCard communitySchedule={item} />
      </View>
    )
  }

  return (
    <View className="flex-1 bg-gray-900">
      <View className="py-4">
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 16 }}
        >
          {daysOfWeek.map((day) => (
            <TouchableOpacity
              key={day}
              onPress={() => setSelectedDay(day)}
              className={`px-4 py-2 rounded-full mr-2 ${
                selectedDay === day ? "bg-blue-600" : "bg-gray-700"
              }`}
            >
              <Text
                className={`text-white font-semibold ${
                  selectedDay === day ? "text-lg" : "text-base"
                }`}
              >
                {day}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <View className="flex-1 px-4">
        {loading ? (
          <View className="flex-1 justify-center items-center">
            <Text className="text-white text-lg">Loading schedule...</Text>
          </View>
        ) : classesForSelectedDay.length > 0 ? (
          <FlatList
            data={classesForSelectedDay}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <View className="mb-4">
                <ClassDisplayCard communitySchedule={item} />
              </View>
            )}
            showsVerticalScrollIndicator={false}
          />
        ) : (
          <View className="flex-1 justify-center items-center">
            <Text className="text-white text-lg text-center">
              No classes scheduled for {selectedDay}
            </Text>
          </View>
        )}
      </View>
    </View>
  )
}

export default CommunityScheduleDisplay
