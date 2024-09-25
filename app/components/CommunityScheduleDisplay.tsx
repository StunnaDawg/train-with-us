import { View, Text, TouchableOpacity, StyleSheet } from "react-native"
import React, { useEffect, useState } from "react"
import { CommunitySchedule } from "../@types/supabaseTypes"
import supabase from "../../lib/supabase"
import { ca, se } from "date-fns/locale"
import { FlatList, ScrollView } from "react-native-gesture-handler"
import { format, parseISO } from "date-fns"
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
    <View className="flex flex-1 h-full">
      <View className="flex-1">
        <View className="my-2">
          <ScrollView indicatorStyle="white" horizontal={true}>
            {daysOfWeek.map((day) => (
              <TouchableOpacity
                className={`${
                  selectedDay === day ? "bg-yellow-500" : null
                } p-2 rounded-md m-2`}
                key={day}
                onPress={() => setSelectedDay(day)}
              >
                <Text className="text-white text-xl">{day}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
        <View className="">
          {/* Date Header FlatList, displays todays date first and then click next to see tomorrows classes? */}
          <FlatList
            className="h-full"
            data={classesForSelectedDay}
            keyExtractor={(item) => item.id.toString()}
            renderItem={renderItem}
          />
        </View>
      </View>
    </View>
  )
}

export default CommunityScheduleDisplay
