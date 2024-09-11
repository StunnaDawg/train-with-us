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
import { FlatList, RefreshControl } from "react-native-gesture-handler"
import { NavBar } from "../../../components"
import getUpcomingEvents from "../../supabaseFunctions/getFuncs/getUpcomingEvents"
import { Events, EventWithCompatibility } from "../../@types/supabaseTypes"
import EventCard from "./components/EventCard"
import getCompatibleEvents from "../../supabaseFunctions/getFuncs/getCompatibleEvents"
import { useAuth } from "../../supabaseFunctions/authcontext"

const EventsComponent = () => {
  const { user } = useAuth()
  const [loading, setLoading] = useState<boolean>(false)
  const [refreshing, setRefreshing] = useState<boolean>(false)
  const [page, setPage] = useState<number>(0)
  const [endOfData, setEndOfData] = useState<boolean>(false)
  const [upcomingEvents, setUpcomingEvents] = useState<
    EventWithCompatibility[]
  >([])

  const fetchEvents = async (pageState: number) => {
    setLoading(true)
    if (user?.id === undefined) return
    getCompatibleEvents(
      user?.id,
      page,
      setLoading,
      setUpcomingEvents,
      setEndOfData
    )
    setLoading(false)
  }

  useEffect(() => {
    fetchEvents(page)
  }, [page])

  const loadMoreEvents = () => {
    if (!endOfData && !loading) {
      setPage((prevPage) => prevPage + 1)
    }
  }

  const renderItem = useCallback(
    ({ item }: { item: EventWithCompatibility }) => (
      <View className="mt-1">
        <EventCard
          eventId={item.id}
          title={item.event_title}
          date={item.date}
          communityId={item.community_host}
          eventCoverPhoto={item.event_cover_photo}
          eventPrice={item.price}
          eventCompatibility={item.compatibility_score}
        />
      </View>
    ),
    []
  )

  const renderFooter = () => {
    return loading ? <ActivityIndicator /> : null
  }

  const keyExtractor = (item: EventWithCompatibility) => item.id.toString()

  return (
    <SafeAreaView className="flex-1 bg-primary-900">
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

      <View className="flex-1 items-center bg-primary-900">
        <FlatList
          initialNumToRender={10}
          maxToRenderPerBatch={10}
          data={upcomingEvents}
          horizontal={false}
          renderItem={renderItem}
          keyExtractor={keyExtractor}
          ListFooterComponent={renderFooter}
          onEndReached={loadMoreEvents}
          onEndReachedThreshold={0.5}
          numColumns={2}
          contentContainerStyle={{ paddingBottom: 100 }}
          ListEmptyComponent={
            <View className="m-2">
              <Text className="text-white">No Communities near!</Text>
            </View>
          }
        />
      </View>
    </SafeAreaView>
  )
}

export default EventsComponent
