import { View, Text, ScrollView, ActivityIndicator } from "react-native"
import React, { useEffect, useState } from "react"
import EventCard from "./EventCard"
import getNewEvents from "../../../supabaseFunctions/getFuncs/getNewEvents"
import { Events } from "../../../@types/supabaseTypes"

const JustAdded = () => {
  const [loading, setLoading] = useState<boolean>(false)
  const [justAddedEvents, setJustAddedEvents] = useState<Events[] | null>([])
  useEffect(() => {
    getNewEvents(setLoading, setJustAddedEvents, 10)
  }, [])
  return (
    <View className="flex flex-col m-5">
      <Text className="text-xl font-bold m-1">Just Added</Text>
      <ScrollView horizontal={true}>
        {loading ? (
          <ActivityIndicator />
        ) : justAddedEvents && justAddedEvents?.length > 0 ? (
          justAddedEvents?.map((event) => <EventCard key={event.id} />)
        ) : (
          <Text>No upcoming events</Text>
        )}
      </ScrollView>
    </View>
  )
}

export default JustAdded
