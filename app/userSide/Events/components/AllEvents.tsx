import {
  ActivityIndicator,
  Pressable,
  ScrollView,
  Text,
  View,
} from "react-native"
import React, { useEffect, useState } from "react"
import EventCard from "./EventCard"
import { Events } from "../../../@types/supabaseTypes"
import getAllEvents from "../../../supabaseFunctions/getFuncs/getAllEvents"

const AllEvents = () => {
  const [loading, setLoading] = useState<boolean>(false)
  const [allEvents, setAllEvents] = useState<Events[] | null>([])
  useEffect(() => {
    getAllEvents(setLoading, setAllEvents, 10)
  }, [])
  return (
    <View className="flex flex-col m-5">
      <View className="flex flex-row items-center justify-between">
        <Text className="text-xl font-bold m-1 ">All Events</Text>
        <Pressable>
          <Text className="underline">View All</Text>
        </Pressable>
      </View>
      <ScrollView horizontal={true}>
        {loading ? (
          <ActivityIndicator />
        ) : allEvents && allEvents?.length > 0 ? (
          allEvents?.map((event) => (
            <EventCard
              eventId={event.id}
              title={event.event_title}
              date={event.date}
              communityId={event.community_host}
              key={event.id}
            />
          ))
        ) : (
          <Text>No upcoming events</Text>
        )}
      </ScrollView>
    </View>
  )
}

export default AllEvents
