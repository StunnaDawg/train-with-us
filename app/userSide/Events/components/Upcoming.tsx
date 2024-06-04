import { ActivityIndicator, ScrollView, Text, View } from "react-native"
import React, { useEffect, useState } from "react"
import EventCard from "./EventCard"
import { Events } from "../../../@types/supabaseTypes"
import getUpcomingEvents from "../../../supabaseFunctions/getFuncs/getUpcomingEvents"

type RefreshProp = {
  refreshing?: boolean
}

const Upcoming = ({ refreshing }: RefreshProp) => {
  const [loading, setLoading] = useState<boolean>(false)
  const [upcomingEvents, setUpcomingEvents] = useState<Events[] | null>([])

  useEffect(() => {
    getUpcomingEvents(setLoading, setUpcomingEvents, 10)
  }, [refreshing])
  return (
    <View className="flex flex-col m-5">
      <Text className="text-2xl font-bold text-white m-1">Upcoming</Text>
      <ScrollView horizontal={true}>
        {loading ? (
          <ActivityIndicator />
        ) : upcomingEvents && upcomingEvents?.length > 0 ? (
          upcomingEvents?.map((event) => (
            <EventCard
              eventId={event.id}
              title={event.event_title}
              date={event.date}
              communityId={event.community_host}
              eventCoverPhoto={event.event_cover_photo}
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

export default Upcoming
