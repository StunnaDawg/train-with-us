import React, { useEffect, useState } from "react"
import {
  View,
  Text,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
} from "react-native"
import { Events } from "../../@types/supabaseTypes"
import EventCard from "./components/EventCard"
import SearchBar from "./components/SearchBar"
import BackButton from "../../components/BackButton"
import { Skeleton } from "moti/skeleton"
import { MotiView } from "moti"
import getAllEvents from "../../supabaseFunctions/getFuncs/getAllEvents"
import searchEventsFunction from "../../supabaseFunctions/getFuncs/searchEventsFunction"
import getUpcomingEvents from "../../supabaseFunctions/getFuncs/getUpcomingEvents"
import { FlashList } from "@shopify/flash-list"
import { useLocationContext } from "../../context/LocationContext"
import { useFocusEffect } from "@react-navigation/native"
import { useAuth } from "../../supabaseFunctions/authcontext"

const tabs = ["All Events", "Upcoming"]

const ViewAllEvents = () => {
  const { userProfile } = useAuth()
  const [searchText, setSearchText] = useState<string>("")
  const [loading, setLoading] = useState<boolean>(true)
  const [allEvents, setAllEvents] = useState<Events[] | null>([])
  const [activeTab, setActiveTab] = useState<string>("All Events")
  const colorMode = "dark"

  const handleSearch = (text: string) => {
    setSearchText(text)
    searchEventsFunction(text, setAllEvents, setLoading)
  }

  const handleTabPress = (tab: string) => {
    setActiveTab(tab)
    setLoading(true)
    if (tab === "All Events") {
      getAllEvents(setLoading, setAllEvents, 30)
    } else if (tab === "Upcoming") {
      getUpcomingEvents(setLoading, setAllEvents, 30)
    }
  }

  useEffect(() => {
    if (searchText === "") {
      getAllEvents(setLoading, setAllEvents, 30)
    }
  }, [searchText])

  const renderEventCard = ({ item }: { item: Events }) => (
    <View className="mb-4">
      <EventCard
        eventId={item.id}
        title={item.event_title}
        date={item.date}
        communityId={item.community_host}
        eventCoverPhoto={item.event_cover_photo}
        eventPrice={item.price}
        eventAddress={item.location}
        userLocation={userProfile?.location}
      />
    </View>
  )

  const renderSkeletons = () => (
    <MotiView
      transition={{ type: "timing" }}
      className="flex-row flex-wrap justify-center"
      animate={{ backgroundColor: "#07182d" }}
    >
      {[...Array(6)].map((_, index) => (
        <View key={index} className="m-2">
          <Skeleton
            colorMode={colorMode}
            radius="square"
            height={150}
            width={150}
          />
        </View>
      ))}
    </MotiView>
  )

  return (
    <SafeAreaView className="flex-1 bg-primary-900">
      <View className="px-4 pt-2">
        <View className="flex-row items-center mb-4">
          <BackButton colour="white" size={28} />
          <View className="flex-1 ml-2">
            <SearchBar
              value={searchText}
              onChange={handleSearch}
              placeholder="Search for events"
              onClear={() => setSearchText("")}
            />
          </View>
        </View>

        <View className="flex-row justify-around mb-4">
          {tabs.map((tab) => (
            <TouchableOpacity
              key={tab}
              onPress={() => handleTabPress(tab)}
              className={`py-2 px-4 rounded-full ${
                activeTab === tab ? "bg-blue-600" : "bg-gray-700"
              }`}
            >
              <Text
                className={`text-sm ${
                  activeTab === tab ? "text-white font-bold" : "text-gray-300"
                }`}
              >
                {tab}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {loading ? (
        renderSkeletons()
      ) : (
        <View className="flex flex-row flex-wrap justify-center">
          <FlashList
            estimatedItemSize={150}
            data={allEvents}
            renderItem={renderEventCard}
            keyExtractor={(item) => item.id.toString()}
            contentContainerStyle={{ paddingHorizontal: 16 }}
            showsVerticalScrollIndicator={false}
            numColumns={2}
            ListEmptyComponent={
              <Text className="text-white text-center mt-4">
                No events found for "{searchText}"
              </Text>
            }
          />
        </View>
      )}
    </SafeAreaView>
  )
}

export default ViewAllEvents
