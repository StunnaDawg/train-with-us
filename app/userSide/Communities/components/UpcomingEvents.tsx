import { ActivityIndicator, ScrollView, Text, View } from "react-native"
import React, { useEffect, useState } from "react"
import EventCard from "../../Events/components/EventCard"
import { Communities, Events } from "../../../@types/supabaseTypes"
import getUpcomingEvents from "../../../supabaseFunctions/getFuncs/getUpcomingEvents"

type UpcomingCommunityEventsProps = {
  community: Communities | null
}

const UpcomingCommunityEvents = ({
  community,
}: UpcomingCommunityEventsProps) => {
  const [loading, setLoading] = useState<boolean>(false)
  const [upcomingEvents, setUpcomingEvents] = useState<Events[] | null>([])
  // Make sure to change the function name from getUpcomingEvents to getUpcomingCommunityEvents
  useEffect(() => {
    getUpcomingEvents(setLoading, setUpcomingEvents, 10)
  }, [])
  return (
    <View className="flex flex-col m-5">
      <Text className="text-3xl font-bold m-4 text-white">Upcoming Events</Text>
      <ScrollView horizontal={true}>
        {loading ? (
          <ActivityIndicator />
        ) : upcomingEvents && upcomingEvents?.length > 0 ? (
          upcomingEvents?.map((event) => (
            <EventCard
              eventId={event.id}
              eventCoverPhoto={event.event_cover_photo}
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
