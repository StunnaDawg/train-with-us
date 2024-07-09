import { View, Text, ActivityIndicator, SafeAreaView } from "react-native"
import React, { useEffect, useState } from "react"
import EventCard from "./components/EventCard"
import { Events } from "../../@types/supabaseTypes"
import getAllEvents from "../../supabaseFunctions/getFuncs/getAllEvents"
import { ScrollView } from "react-native-gesture-handler"
import SearchBar from "./components/SearchBar"
import searchEventsFunction from "../../supabaseFunctions/getFuncs/searchEventsFunction"
import GenericButton from "../../components/GenericButton"
import getUpcomingEvents from "../../supabaseFunctions/getFuncs/getUpcomingEvents"
import getNewEvents from "../../supabaseFunctions/getFuncs/getNewEvents"
import getTmrwEvents from "../../supabaseFunctions/getFuncs/getTmrwEvents"
import BackButton from "../../components/BackButton"
import { Skeleton } from "moti/skeleton"
import { MotiView } from "moti"

const ViewAllEvents = () => {
  const [searchText, setSearchText] = useState<string>("")
  const [loading, setLoading] = useState<boolean>(true)
  const [allEvents, setAllEvents] = useState<Events[] | null>([])

  const currentDate = new Date()
  const tomorrow = new Date(currentDate)
  tomorrow.setDate(currentDate.getDate() + 1)

  const dayAfterTomorrow = new Date(currentDate)
  dayAfterTomorrow.setDate(currentDate.getDate() + 2)

  const tomorrowDate = tomorrow.toISOString().split("T")[0]
  const dayAfterTomorrowDate = dayAfterTomorrow.toISOString().split("T")[0]
  const colorMode = "dark"

  const handleSearch = (text: string) => {
    setSearchText(text)
    searchEventsFunction(text, setAllEvents, setLoading)
  }

  useEffect(() => {
    if (searchText === "") {
      getAllEvents(setLoading, setAllEvents, 30)
    }
  }, [searchText])
  return (
    <SafeAreaView className="flex-1 bg-primary-900">
      <View className="flex flex-row items-center ">
        <View className="mx-1">
          <BackButton colour="white" size={28} />
        </View>
        <View className="flex-grow">
          <SearchBar
            value={searchText}
            onChange={(text) => handleSearch(text)}
            placeholder="Search for events"
          />
        </View>
      </View>

      <View className="flex flex-row justify-center flex-wrap my-1">
        <View className="mx-1 my-1">
          <GenericButton
            text="Show All"
            textSize="text-sm"
            width={100}
            colourDefault="bg-white"
            colourPressed="bg-blue-500"
            borderColourDefault="border-black"
            borderColourPressed="border-black"
            buttonFunction={() => {
              getAllEvents(setLoading, setAllEvents, 30)
            }}
            roundness="rounded-lg"
          />
        </View>

        <View className="mx-1 my-1">
          <GenericButton
            text="Upcoming"
            textSize="text-sm"
            width={100}
            colourDefault="bg-white"
            colourPressed="bg-blue-500"
            borderColourDefault="border-black"
            borderColourPressed="border-black"
            buttonFunction={() => {
              getUpcomingEvents(setLoading, setAllEvents, 30)
            }}
            roundness="rounded-lg"
          />
        </View>

        <View className="mx-1 my-1">
          <GenericButton
            text="Just Added"
            textSize="text-sm"
            width={100}
            colourDefault="bg-white"
            colourPressed="bg-blue-500"
            borderColourDefault="border-black"
            borderColourPressed="border-black"
            buttonFunction={() => {
              getNewEvents(setLoading, setAllEvents, 10)
            }}
            roundness="rounded-lg"
          />
        </View>

        <View className="mx-1">
          <GenericButton
            text="Tommorrow"
            textSize="text-sm"
            width={110}
            colourDefault="bg-white"
            colourPressed="bg-blue-500"
            borderColourDefault="border-black"
            borderColourPressed="border-black"
            buttonFunction={() => {
              getTmrwEvents(
                setLoading,
                setAllEvents,
                10,
                tomorrowDate,
                dayAfterTomorrowDate
              )
            }}
            roundness="rounded-lg"
          />
        </View>
      </View>

      <View className="flex-1">
        <ScrollView showsVerticalScrollIndicator={false}>
          <View className="flex flex-row flex-wrap justify-center">
            {loading ? (
              <MotiView
                transition={{
                  type: "timing",
                }}
                className="items-center mx-3 flex flex-row justify-center"
                animate={{ backgroundColor: "#07182d" }}
              >
                <View className="flex flex-row justify-center flex-wrap items-center">
                  <View className=" my-2 mx-2">
                    <Skeleton
                      colorMode={colorMode}
                      radius="square"
                      height={150}
                      width={150}
                    />
                  </View>
                  <View className=" my-2 mx-1">
                    <Skeleton
                      colorMode={colorMode}
                      radius="square"
                      height={150}
                      width={150}
                    />
                  </View>
                  <View className="my-2 mx-2">
                    <Skeleton
                      colorMode={colorMode}
                      radius="square"
                      height={150}
                      width={150}
                    />
                  </View>
                  <View className="my-2 mx-2">
                    <Skeleton
                      colorMode={colorMode}
                      radius="square"
                      height={150}
                      width={150}
                    />
                  </View>
                  <View className="my-2 mx-2">
                    <Skeleton
                      colorMode={colorMode}
                      radius="square"
                      height={150}
                      width={150}
                    />
                  </View>
                  <View className="my-2 mx-2">
                    <Skeleton
                      colorMode={colorMode}
                      radius="square"
                      height={150}
                      width={150}
                    />
                  </View>
                </View>
              </MotiView>
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
                        eventPrice={event.price}
                      />
                    </View>
                  )
                )
              )
            ) : (
              <Text className="text-white">
                No search results for {searchText}
              </Text>
            )}
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  )
}

export default ViewAllEvents
