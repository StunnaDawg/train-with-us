import { View, Text, ScrollView, Pressable } from "react-native"
import React, { useEffect } from "react"
import { MotiView } from "moti"
import { Skeleton } from "moti/skeleton"
import EventCard from "../../Events/components/EventCard"
import { Communities, Events } from "../../../@types/supabaseTypes"
import getCommunityEvents from "../../../supabaseFunctions/getFuncs/getCommunityEvent"
import { se } from "date-fns/locale"
import supabase from "../../../../lib/supabase"

type CommuntiyPageEventsProps = { community: Communities }

const CommuntiyPageEvents = ({ community }: CommuntiyPageEventsProps) => {
  const [searchUpcomingEvents, setSearchUpcomingEvents] =
    React.useState<boolean>(true)
  const [searchPastEvents, setSearchPastEvents] = React.useState<boolean>(false)
  const [loading, setLoading] = React.useState<boolean>(false)
  const [upcomingEvents, setUpcomingEvents] = React.useState<Events[] | null>(
    []
  )
  const [pastEvents, setPastEvents] = React.useState<Events[] | null>([])
  const colorMode = "dark"

  const getPastCommunityEvents = async () => {
    if (pastEvents && pastEvents.length > 0) {
      return
    }
    try {
      console.log("getPastCommunityEvents")
      setLoading(true)
      const currentDate = new Date().toISOString()
      const { data: events, error } = await supabase
        .from("events")
        .select()
        .eq("community_host", community?.id)
        .lte("date", currentDate)
        .limit(10)
        .order("date", { ascending: false })

      if (error) throw error

      const eventsArray = events ?? null
      console.log("events, communitiesArray")

      setPastEvents(eventsArray)
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (community?.id && searchUpcomingEvents) {
      getCommunityEvents(setLoading, community?.id, setUpcomingEvents)
    } else {
      console.log("No community id")
    }
  }, [community, searchUpcomingEvents])

  useEffect(() => {
    if (community?.id && searchPastEvents) {
      getPastCommunityEvents()
    } else {
      console.log("No community id")
    }
  }, [community, searchPastEvents])
  return (
    <View className="flex-1 bg-primary-900">
      <View className="flex-row justify-center mt-6 mb-4">
        <Pressable
          onPress={() => {
            setSearchUpcomingEvents(true)
            setSearchPastEvents(false)
          }}
          className={`py-3 px-6 rounded-full mx-2 ${
            searchUpcomingEvents ? "bg-blue-600" : "bg-gray-700"
          }`}
        >
          <Text className={`text-center font-bold text-white`}>Upcoming</Text>
        </Pressable>

        <Pressable
          onPress={() => {
            setSearchUpcomingEvents(false)
            setSearchPastEvents(true)
          }}
          className={`py-3 px-6 rounded-full mx-2 ${
            searchPastEvents ? "bg-blue-600" : "bg-gray-700"
          }`}
        >
          <Text className={`text-center font-bold text-white`}>Past</Text>
        </Pressable>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 20 }}
      >
        <View className="flex-1 px-4 flex-wrap flex-row justify-center">
          {loading ? (
            <MotiView
              transition={{
                type: "timing",
              }}
              className="flex-row flex-wrap justify-center"
              animate={{ backgroundColor: "#07182d" }}
            >
              {[...Array(6)].map((_, index) => (
                <View key={index} className="m-2">
                  <Skeleton
                    colorMode={colorMode}
                    radius="round"
                    height={180}
                    width={160}
                  />
                </View>
              ))}
            </MotiView>
          ) : searchUpcomingEvents ? (
            upcomingEvents && upcomingEvents.length > 0 ? (
              upcomingEvents.map((event) => (
                <View key={event.id} className="mb-4">
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
              <Text className="font-bold text-white text-center mt-8 text-lg">
                {community.community_title} has no upcoming events!
              </Text>
            )
          ) : searchPastEvents ? (
            pastEvents && pastEvents.length > 0 ? (
              pastEvents.map((event) => (
                <View key={event.id} className="mb-4">
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
              <Text className="font-bold text-white text-center mt-8 text-lg">
                No past events!
              </Text>
            )
          ) : null}
        </View>
      </ScrollView>
    </View>
  )
}

export default CommuntiyPageEvents
