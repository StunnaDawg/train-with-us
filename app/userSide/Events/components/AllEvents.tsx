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

const AllEvents = () => {
  const navigation = useNavigation<NavigationType>()

  return (
    <View className="flex flex-col m-5 border-b">
      <View className="flex flex-row items-center justify-between">
        <Text className="text-lg font-bold m-1 text-white ">
          See All Events
        </Text>
        <Pressable onPress={() => navigation.navigate("AllEventsPage")}>
          <FontAwesome6 name="arrow-right" size={20} color="white" />
        </Pressable>
      </View>
    </View>
  )
}

export default AllEvents
