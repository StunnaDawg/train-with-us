import { View, Text, TouchableOpacity } from "react-native"
import React, { useEffect, useState } from "react"
import { CommunityClasses, CommunitySchedule } from "../@types/supabaseTypes"
import supabase from "../../lib/supabase"
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
      className="bg-white/5 rounded-lg overflow-hidden"
      onPress={() =>
        navigation.navigate("ClassInformationPage", {
          class: classData,
        })
      }
    >
      <View className="p-4">
        <View className="flex-row justify-between items-center mb-2">
          <Text className="text-white text-lg font-bold">
            {classData.class_name}
          </Text>
          <Text className="text-white/70 text-sm">
            {formatTime(communitySchedule.start_time)}
          </Text>
        </View>
        <View className="flex-row items-center">
          <View className="bg-blue-500 rounded-full w-2 h-2 mr-2" />
          <Text className="text-white/80 text-sm">
            {classData.duration} minutes
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  )
}

export default ClassDisplayCard
