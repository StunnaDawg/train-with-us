import { ActivityIndicator, ScrollView, Text, View } from "react-native"
import React, { useEffect, useState } from "react"
import EventCard from "../../Events/components/EventCard"
import { Communities, Events } from "../../../@types/supabaseTypes"
import getCommunityEvents from "../../../supabaseFunctions/getFuncs/getCommunityEvent"

type UpcomingCommunityEventsProps = {
  community: Communities | null
  textColour?: string
}

const UpcomingCommunityEvents = ({
  community,
  textColour,
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
    <View className="flex-1">
      <View className="flex-row justify-center">
        <Text
          className={`text-xl font-bold m-4 ${
            textColour ? textColour : "text-white"
          }`}
        >
          Upcoming Events
        </Text>
      </View>
      <ScrollView>
        <View className="flex flex-row justify-center flex-wrap">
          {loading ? (
            <ActivityIndicator />
          ) : upcomingEvents && upcomingEvents?.length > 0 ? (
            upcomingEvents?.map((event) => (
              <View key={event.id} className=" my-1">
                <EventCard
                  eventId={event.id}
                  eventCoverPhoto={event.event_cover_photo}
                  communityId={event.community_host}
                  title={event.event_title}
                  date={event.date}
                  eventPrice={event.price}
                />
              </View>
            ))
          ) : (
            <Text className="font-bold text-white">No upcoming events</Text>
          )}
        </View>
      </ScrollView>
    </View>
  )
}

export default UpcomingCommunityEvents
