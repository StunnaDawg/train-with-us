import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  ActivityIndicator,
} from "react-native"
import React, { useEffect, useState } from "react"
import { RootStackParamList } from "../../../@types/navigation"
import { RouteProp, useRoute } from "@react-navigation/native"
import BackButton from "../../../components/BackButton"
import AttendeeCard from "./AttendeeCard"

const EventAttendees = () => {
  const [loading, setLoading] = useState<boolean>(false)

  const route = useRoute<RouteProp<RootStackParamList, "ViewEventAttendees">>()
  const eventGoers = route.params.profile

  return (
    <SafeAreaView className="flex-1">
      <View className="m-2">
        <View className="flex flex-row justify-between items-center">
          <BackButton />
          <Text className=" font-bold text-xl">Attendees</Text>
          <View />
        </View>
        <ScrollView className=" h-full">
          {!loading ? (
            eventGoers?.map((member) => {
              return <AttendeeCard key={member.id} member={member} />
            })
          ) : (
            <ActivityIndicator />
          )}
        </ScrollView>
      </View>
    </SafeAreaView>
  )
}

export default EventAttendees
