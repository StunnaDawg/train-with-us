import {
  ActivityIndicator,
  Pressable,
  SafeAreaView,
  ScrollView,
  Text,
  View,
} from "react-native"
import React, { useEffect, useState } from "react"
import EventCard from "./EventCard"
import { Events } from "../../../@types/supabaseTypes"
import getAllEvents from "../../../supabaseFunctions/getFuncs/getAllEvents"
import { NavigationType } from "../../../@types/navigation"
import { useNavigation } from "@react-navigation/native"
import { FontAwesome6 } from "@expo/vector-icons"

type RefreshProp = { refreshing?: boolean }

const AllEvents = ({ refreshing }: RefreshProp) => {
  const [loading, setLoading] = useState<boolean>(false)
  const [allEvents, setAllEvents] = useState<Events[] | null>([])
  const navigation = useNavigation<NavigationType>()

  useEffect(() => {
    getAllEvents(setLoading, setAllEvents, 10)
  }, [refreshing])
  return (
    <View className="flex flex-col m-5 border-b">
      <View className="flex flex-row items-center justify-between">
        <Text className="text-2xl font-bold m-1 text-white ">
          See All Events
        </Text>
        <Pressable onPress={() => navigation.navigate("AllEventsPage")}>
          <FontAwesome6 name="arrow-right" size={24} color="white" />
        </Pressable>
      </View>
    </View>
  )
}

export default AllEvents
