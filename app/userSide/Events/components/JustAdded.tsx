import { View, Text, ScrollView, ActivityIndicator } from "react-native"
import React, { useEffect, useState } from "react"
import EventCard from "./EventCard"
import getNewEvents from "../../../supabaseFunctions/getFuncs/getNewEvents"
import { Events } from "../../../@types/supabaseTypes"

type RefreshProp = {
  refreshing?: boolean
}

const JustAdded = ({ refreshing }: RefreshProp) => {
  const [loading, setLoading] = useState<boolean>(false)
  const [justAddedEvents, setJustAddedEvents] = useState<Events[] | null>([])

  useEffect(() => {
    getNewEvents(setLoading, setJustAddedEvents, 10)
  }, [refreshing])
  return (
    <View className="flex flex-col m-5">
      <Text className="text-2xl text-white font-bold m-1">Just Added</Text>
      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
        {loading ? (
          <ActivityIndicator />
        ) : justAddedEvents && justAddedEvents?.length > 0 ? (
          justAddedEvents?.map((event) => (
            <EventCard
              eventId={event.id}
              communityId={event.community_host}
              key={event.id}
              title={event.event_title}
              date={event.date}
              eventCoverPhoto={event.event_cover_photo}
              eventPrice={event.price}
            />
          ))
        ) : (
          <Text>No upcoming events</Text>
        )}
      </ScrollView>
    </View>
  )
}

export default JustAdded
