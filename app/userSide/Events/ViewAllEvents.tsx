import {
  View,
  Text,
  Pressable,
  ActivityIndicator,
  SafeAreaView,
} from "react-native"
import React, { useEffect, useState } from "react"
import EventCard from "./components/EventCard"
import { Events } from "../../@types/supabaseTypes"
import getAllEvents from "../../supabaseFunctions/getFuncs/getAllEvents"
import { ScrollView } from "react-native-gesture-handler"
import SearchBar from "./components/SearchBar"
import { set } from "date-fns"
import searchEventsFunction from "../../supabaseFunctions/getFuncs/searchEventsFunction"

const ViewAllEvents = () => {
  const [searchText, setSearchText] = useState<string>("")
  const [loading, setLoading] = useState<boolean>(false)
  const [allEvents, setAllEvents] = useState<Events[] | null>([])
  useEffect(() => {
    getAllEvents(setLoading, setAllEvents, 10)
  }, [])

  const handleSearch = (text: string) => {
    setSearchText(text)
    searchEventsFunction(text, setAllEvents, setLoading)
  }
  return (
    <SafeAreaView className="flex-1 bg-primary-900">
      <View>
        <SearchBar
          value={searchText}
          onChange={(text) => handleSearch(text)}
          placeholder="Search for events"
        />
      </View>
      <View className="flex-1">
        <ScrollView showsVerticalScrollIndicator={false}>
          <View className="flex flex-row justify-center flex-wrap">
            {loading ? (
              <ActivityIndicator />
            ) : allEvents && allEvents?.length > 0 ? (
              allEvents?.map(
                (event) => (
                  console.log(
                    "event cover photo allEvents",
                    event.event_cover_photo
                  ),
                  (
                    <View className="mt-3 mb-1">
                      <EventCard
                        eventId={event.id}
                        title={event.event_title}
                        date={event.date}
                        communityId={event.community_host}
                        eventCoverPhoto={event.event_cover_photo}
                        key={event.id}
                      />
                    </View>
                  )
                )
              )
            ) : (
              <Text>No upcoming events</Text>
            )}
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  )
}

export default ViewAllEvents
