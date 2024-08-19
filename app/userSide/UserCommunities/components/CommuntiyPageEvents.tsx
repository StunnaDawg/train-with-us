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
      <View className="flex-row justify-center mt-4 mb-2">
        <Pressable
          onPress={() => {
            setSearchUpcomingEvents(true)
            setSearchPastEvents(false)
          }}
          className={`p-2 w-36 rounded-xl m-1 bg-slate-500 ${
            searchUpcomingEvents ? "bg-slate-500" : "bg-black"
          } ${searchUpcomingEvents ? null : "opacity-50"}`}
        >
          <Text className={`text-center font-bold text-white `}>Upcoming</Text>
        </Pressable>

        <Pressable
          onPress={() => {
            setSearchUpcomingEvents(false)
            setSearchPastEvents(true)
          }}
          className={`p-2 w-36 rounded-xl m-1 bg-slate-500 ${
            searchPastEvents ? "bg-slate-500" : "bg-black"
          } ${searchPastEvents ? null : "opacity-50"}`}
        >
          <Text className={"text-center text-white"}>Past</Text>
        </Pressable>
      </View>
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
          ) : searchUpcomingEvents ? (
            upcomingEvents && upcomingEvents.length > 0 ? (
              upcomingEvents.map((event) => (
                <View key={event.id} className="mt-3 mb-1">
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
              <Text className="font-bold text-white">
                {community.community_title} has no upcoming events!
              </Text>
            )
          ) : searchPastEvents ? (
            pastEvents && pastEvents.length > 0 ? (
              pastEvents.map((event) => (
                <View key={event.id} className="mt-3 mb-1 mx-3">
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
              <Text className="font-bold text-white">No past events!</Text>
            )
          ) : null}
        </View>
      </ScrollView>
    </View>
  )
}

export default CommuntiyPageEvents
