import {
  View,
  Text,
  ScrollView,
  Pressable,
  SafeAreaView,
  ActivityIndicator,
} from "react-native"
import React, { useCallback, useEffect, useState } from "react"
import AllEvents from "./components/AllEvents"
import { RefreshControl } from "react-native-gesture-handler"
import EventTypes from "./components/EventTypes"
import Upcoming from "./components/Upcoming"
import { Skeleton } from "moti/skeleton"
import { NavBar } from "../../../components"
import getUpcomingEvents from "../../supabaseFunctions/getFuncs/getUpcomingEvents"
import { Events } from "../../@types/supabaseTypes"
import EventCard from "./components/EventCard"

const EventsComponent = () => {
  const [loading, setLoading] = useState<boolean>(false)
  const [refreshing, setRefreshing] = useState<boolean>(false)
  const [upcomingEvents, setUpcomingEvents] = useState<Events[] | null>([])

  const onRefresh = useCallback(() => {
    setRefreshing(true)
    getUpcomingEvents(setLoading, setUpcomingEvents, 10)
    setRefreshing(false)
  }, [])

  useEffect(() => {
    getUpcomingEvents(setLoading, setUpcomingEvents, 10)
  }, [])

  return (
    <>
      <NavBar
        title="Events"
        bgColour="bg-primary-900"
        textColour="text-white"
        showFriends={false}
        showSettings={false}
        showSearchCommunities={false}
        searchUsers={false}
      />
      <View className="bg-primary-900">
        <AllEvents />
      </View>
      <ScrollView
        className=" bg-primary-900"
        style={{ backgroundColor: "#07182d" }}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <View className="flex flex-row flex-wrap justify-center">
          {loading ? (
            <ActivityIndicator />
          ) : upcomingEvents && upcomingEvents?.length > 0 ? (
            upcomingEvents?.map((event) => (
              <View className="my-1" key={event.id}>
                <EventCard
                  eventId={event.id}
                  title={event.event_title}
                  date={event.date}
                  communityId={event.community_host}
                  eventCoverPhoto={event.event_cover_photo}
                  eventPrice={event.price}
                />
              </View>
            ))
          ) : (
            <Text className="text-white font-bold">No upcoming events</Text>
          )}
        </View>
      </ScrollView>
    </>
  )
}

export default EventsComponent
