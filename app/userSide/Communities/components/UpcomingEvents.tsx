import { ActivityIndicator, ScrollView, Text, View } from "react-native"
import React, { useEffect, useState } from "react"
import EventCard from "../../Events/components/EventCard"
import { Events } from "../../../@types/supabaseTypes"
import getUpcomingEvents from "../../../supabaseFunctions/getFuncs/getUpcomingEvents"

const UpcomingCommunityEvents = () => {
  const [loading, setLoading] = useState<boolean>(false)
  const [upcomingEvents, setUpcomingEvents] = useState<Events[] | null>([])
  // Make sure to change the function name from getUpcomingEvents to getUpcomingCommunityEvents
  useEffect(() => {
    getUpcomingEvents(setLoading, setUpcomingEvents, 10)
  }, [])
  return (
    <View className="flex flex-col m-5">
      <Text className="text-xl font-bold m-1">Upcoming Events</Text>
      <ScrollView horizontal={true}>
        {loading ? (
          <ActivityIndicator />
        ) : upcomingEvents && upcomingEvents?.length > 0 ? (
          upcomingEvents?.map((event) => (
            <EventCard
              eventId={event.id}
              communityId={event.community_host}
              title={event.event_title}
              date={event.date}
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

export default UpcomingCommunityEvents
