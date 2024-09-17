import { View, Text, TouchableOpacity, StyleSheet } from "react-native"
import React, { useEffect, useState } from "react"
import { CommunitySchedule } from "../@types/supabaseTypes"
import supabase from "../../lib/supabase"
import { ca, se } from "date-fns/locale"
import { FlatList, ScrollView } from "react-native-gesture-handler"
import { format, parseISO } from "date-fns"

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

  const formatTime = (start_time: string) => {
    const date = parseISO(start_time)
    const formattedTime = format(date, "hh:mm a")
    return formattedTime
  }

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
      setCommunitySchedule(data)
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
        <Text className="text-white">{item.class_name}</Text>
        <Text className="text-white">{formatTime(item.start_time)}</Text>
        <Text className="text-white">{item.class_duration}</Text>
      </View>
    )
  }

  return (
    <View>
      <View>
        <View>
          <ScrollView showsHorizontalScrollIndicator={false} horizontal={true}>
            {daysOfWeek.map((day) => (
              <TouchableOpacity key={day} onPress={() => setSelectedDay(day)}>
                <Text className="text-white">{day}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
        {/* Date Header FlatList, displays todays date first and then click next to see tomorrows classes? */}
        <FlatList
          data={classesForSelectedDay}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
        />
      </View>
    </View>
  )
}

export default CommunityScheduleDisplay
