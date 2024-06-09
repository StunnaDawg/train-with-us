import { View, Text, ScrollView, ActivityIndicator } from "react-native"
import React, { useEffect, useState } from "react"
import EventCard from "./EventCard"
import { Events } from "../../../@types/supabaseTypes"
import getEventOnType from "../../../supabaseFunctions/getFuncs/getEventOnType"

type RefreshProp = {
  refreshing?: boolean
  type: string
}

const EventTypes = ({ refreshing, type }: RefreshProp) => {
  const [loading, setLoading] = useState<boolean>(false)
  const [typedEvents, setTypedEvents] = useState<Events[] | null>([])

  useEffect(() => {
    getEventOnType(setLoading, setTypedEvents, type)
  }, [refreshing])

  return (
    <View className="flex flex-col m-5">
      <Text className="text-lg text-white font-bold m-1">{type}</Text>
      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
        {loading ? (
          <ActivityIndicator />
        ) : typedEvents && typedEvents?.length > 0 ? (
          typedEvents?.map((event) => (
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
          <Text className="font-bold text-white">No upcoming events</Text>
        )}
      </ScrollView>
    </View>
  )
}

export default EventTypes
