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
import Ionicons from "@expo/vector-icons/Ionicons"

const EventsComponent = () => {
  const { user } = useAuth()
  const [loading, setLoading] = useState<boolean>(false)
  const [refreshing, setRefreshing] = useState<boolean>(false)
  const [page, setPage] = useState<number>(0)
  const [endOfData, setEndOfData] = useState<boolean>(false)
  const [selectedFilter, setSelectedFilter] = useState<string>("Today")
  const [upcomingEvents, setUpcomingEvents] = useState<
    EventWithCompatibility[]
  >([])

  const handleFilterPress = (text: string) => {
    setSelectedFilter(text)
  }

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
          eventAddress={item.location}
        />
      </View>
    ),
    []
  )

  const renderFooter = () => {
    return loading ? <ActivityIndicator /> : null
  }

  const renderFilterButtons = (text: string) => {
    return (
      <Pressable
        className={`w-full items-center justify-center px-1 py-0.5 rounded-md ${
          selectedFilter === text ? "bg-blue-600" : ""
        }`}
        onPress={() => handleFilterPress(text)}
      >
        <Text className="text-white text-xs text-center">{text}</Text>
      </Pressable>
    )
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
      <View className="flex-1 bg-primary-700">
        <View className="p-1">
          <View className="flex-row items-center p-4">
            <Ionicons name="rocket-outline" size={24} color="white" />
            <Text className="text-white text-xl font-bold mx-1">Events</Text>
          </View>

          <View className="w-full mt-1 mb-2">
            <View className="flex flex-row items-center rounded-md w-full bg-primary-900 p-1 gap-0.5">
              <View
                className={`flex-1 items-center justify-center rounded-md ${
                  selectedFilter === "Today" ? "bg-primary-700" : ""
                }`}
              >
                {renderFilterButtons("Today")}
              </View>
              <View
                className={`flex-1 items-center justify-center rounded-md ${
                  selectedFilter === "This Week" ? "bg-primary-700" : ""
                }`}
              >
                {renderFilterButtons("This Week")}
              </View>
              <View
                className={`flex-1 items-center justify-center rounded-md ${
                  selectedFilter === "Tomorrow" ? "bg-primary-700" : ""
                }`}
              >
                {renderFilterButtons("Tomorrow")}
              </View>
              <View
                className={`flex-1 items-center justify-center rounded-md ${
                  selectedFilter === "Top Matches" ? "bg-primary-700" : ""
                }`}
              >
                {renderFilterButtons("Top Matches")}
              </View>
              <View
                className={`flex-1 items-center justify-center rounded-md ${
                  selectedFilter === "Free" ? "bg-primary-700" : ""
                }`}
              >
                {renderFilterButtons("Free")}
              </View>
            </View>
          </View>
        </View>
        <View className="items-center">
          <FlatList
            showsVerticalScrollIndicator={false}
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
      </View>
    </SafeAreaView>
  )
}

export default EventsComponent
