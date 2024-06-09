import { ActivityIndicator, ScrollView, Text, View } from "react-native"
import React, { useEffect, useState } from "react"
import EventCard from "../../Events/components/EventCard"
import { Communities, Events } from "../../../@types/supabaseTypes"
import getCommunityEvents from "../../../supabaseFunctions/getFuncs/getCommunityEvent"

type UpcomingCommunityEventsProps = {
  community: Communities | null
}

const UpcomingCommunityEvents = ({
  community,
}: UpcomingCommunityEventsProps) => {
  const [loading, setLoading] = useState<boolean>(false)
  const [upcomingEvents, setUpcomingEvents] = useState<Events[] | null>([])
  useEffect(() => {
    if (community?.id) {
      getCommunityEvents(setLoading, community?.id, setUpcomingEvents)
    } else {
      console.log("No community id")
    }
  }, [community])
  return (
    <View className="flex flex-col m-5">
      <Text className="text-xl font-bold m-4 text-white">Upcoming Events</Text>
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
              eventPrice={event.price}
            />
          ))
        ) : (
          <Text className="font-bold text-white">No upcoming events</Text>
        )}
      </ScrollView>
    </View>
  )
}

export default UpcomingCommunityEvents
