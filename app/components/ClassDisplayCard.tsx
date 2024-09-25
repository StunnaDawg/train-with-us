import { View, Text, TouchableOpacity, Pressable } from "react-native"
import React, { useEffect, useState } from "react"
import { CommunityClasses, CommunitySchedule } from "../@types/supabaseTypes"
import supabase from "../../lib/supabase"
import { get } from "mongoose"
import { format, parseISO } from "date-fns"
import { useNavigation } from "@react-navigation/native"
import { NavigationType } from "../@types/navigation"

type ClassDisplayProps = {
  communitySchedule: CommunitySchedule
}

const ClassDisplayCard = ({ communitySchedule }: ClassDisplayProps) => {
  const [loading, setLoading] = useState<boolean>(true)
  const [classData, setClassData] = useState<CommunityClasses>(
    {} as CommunityClasses
  )
  const navigation = useNavigation<NavigationType>()

  const formatTime = (start_time: string) => {
    const date = parseISO(start_time)
    const formattedTime = format(date, "hh:mm a")
    return formattedTime
  }

  const getClassFunc = async () => {
    try {
      setLoading(true)
      const { data, error } = await supabase
        .from("community_classes")
        .select("*")
        .eq("id", communitySchedule.class_id)

      if (error) {
        console.log(error)
        return
      }
      setClassData(data[0])
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    getClassFunc()
  }, [communitySchedule])

  return (
    <TouchableOpacity
      className="m-2 p-2 border-b border-white border-opacity-50"
      onPress={() =>
        navigation.navigate("ClassInformationPage", {
          class: classData,
        })
      }
    >
      <View className="flex">
        <View className="flex flex-row">
          <Text className="text-white mx-1">
            {formatTime(communitySchedule.start_time)}
          </Text>
          <Text className="text-white">{classData.class_name}</Text>
        </View>
        <View className="flex flex-row ">
          <Text className="text-white mx-1">{classData.duration} minutes</Text>
        </View>
      </View>
    </TouchableOpacity>
  )
}

export default ClassDisplayCard
