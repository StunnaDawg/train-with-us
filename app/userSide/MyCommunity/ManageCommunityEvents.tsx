import { View, Text, Pressable, Alert } from "react-native"
import React, { useCallback, useEffect, useState } from "react"
import {
  useFocusEffect,
  useNavigation,
  useRoute,
} from "@react-navigation/native"
import { RouteProp } from "@react-navigation/native"
import { NavigationType, RootStackParamList } from "../../@types/navigation"
import getCommunityEvents from "../../supabaseFunctions/getFuncs/getCommunityEvent"
import { Events } from "../../@types/supabaseTypes"
import { SafeAreaView } from "react-native-safe-area-context"
import formatBirthdate from "../../utilFunctions/calculateDOB"
import { FontAwesome6 } from "@expo/vector-icons"
import supabase from "../../../lib/supabase"
import showAlert from "../../utilFunctions/showAlert"
import BackButton from "../../components/BackButton"
import { ScrollView } from "react-native"
import { MotiView } from "moti"
import { Skeleton } from "moti/skeleton"
import EventCard from "../Events/components/EventCard"

const ManageCommunityEvents = () => {
  const [searchUpcomingEvents, setSearchUpcomingEvents] =
    React.useState<boolean>(true)
  const [pressPlus, setPressPlus] = React.useState<boolean>(false)
  const [searchPastEvents, setSearchPastEvents] = React.useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(false)
  const [upcomingEvents, setUpcomingEvents] = useState<Events[] | null>([])
  const route = useRoute<RouteProp<RootStackParamList, "MyCommunityEvents">>()
  const community = route.params.community
  const navigation = useNavigation<NavigationType>()
  const [pastEvents, setPastEvents] = React.useState<Events[] | null>([])

  const colorMode = "dark"

  const handlePressPlusIn = () => {
    setPressPlus(true)
  }

  const handlePressPlusOut = () => {
    setPressPlus(false)
  }

  const getPastCommunityEvents = async () => {
    try {
      console.log("getPastCommunityEvents")
      setLoading(true)
      const currentDate = new Date().toISOString()
      const { data: events, error } = await supabase
        .from("events")
        .select()
        .eq("community_host", community.id)
        .lte("date", currentDate)
        .limit(10)
        .order("date", { ascending: false })

      if (error) throw error

      const eventsArray = events ?? null
      console.log("events, communitiesArray", eventsArray)

      setPastEvents(eventsArray)
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  const showDeleteAlert = (onConfirm: () => void) =>
    Alert.alert(
      "Do you want to delete this channel?",
      "Please select an option.",
      [
        {
          text: "Yes",
          onPress: onConfirm,
        },
        {
          text: "Cancel",
          style: "cancel",
        },
      ],
      {
        cancelable: true,
      }
    )

  const deleteUpcomingEvent = async (eventId: number) => {
    const { error } = await supabase.from("events").delete().eq("id", eventId)

    if (error) {
      showAlert({
        title: "Error",
        message: error.message,
        buttonText: "OK",
      })

      throw error
    }

    showAlert({
      title: "Event Deleted",
      message: "Event is gone forever!",
      buttonText: "OK",
    })

    await getCommunityEvents(setLoading, community.id, setUpcomingEvents)
  }

  const deletePastEvent = async (eventId: number) => {
    const { error } = await supabase.from("events").delete().eq("id", eventId)

    if (error) {
      showAlert({
        title: "Error",
        message: error.message,
        buttonText: "OK",
      })

      throw error
    }
    await getPastCommunityEvents()
    console.log("Past event deleted")
    showAlert({
      title: "Event Deleted",
      message: "Event is gone forever!",
      buttonText: "OK",
    })
  }

  useFocusEffect(
    useCallback(() => {
      let isActive = true

      const getEvents = async () => {
        setLoading(true)
        await getCommunityEvents(setLoading, community.id, (events) => {
          if (isActive) {
            setUpcomingEvents(events)
          }
        })
        setLoading(false)
      }

      getEvents()

      return () => {
        isActive = false
      }
    }, [community, searchUpcomingEvents])
  )

  useEffect(() => {
    if (community?.id && searchUpcomingEvents) {
      getCommunityEvents(setLoading, community?.id, setUpcomingEvents)
    }
  }, [searchUpcomingEvents])

  useEffect(() => {
    if (community?.id && searchPastEvents) {
      getPastCommunityEvents()
    }
  }, [searchPastEvents])

  return (
    <SafeAreaView className="flex-1 bg-primary-900 ">
      <View className="flex flex-row justify-between m-1">
        <BackButton colour="white" />
        <View>
          <Text className="text-white font-bold text-xl">Manage Events</Text>
        </View>
        <Pressable
          onPressIn={handlePressPlusIn}
          onPressOut={handlePressPlusOut}
          onPress={() => navigation.navigate("CreateEvent")}
        >
          <FontAwesome6
            name="plus"
            size={24}
            color={`${pressPlus ? "black" : "white"}`}
          />
        </Pressable>
      </View>
      <View className="m-5 mx-7">
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
            <Text className={`text-center font-bold text-white `}>
              Upcoming
            </Text>
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
        <ScrollView showsVerticalScrollIndicator={false} className="h-full">
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
                    <Pressable
                      onPress={() =>
                        showDeleteAlert(() => deleteUpcomingEvent(event.id))
                      }
                      className="bg-black rounded-xl p-2 z-50 absolute top-0 right-1"
                    >
                      <FontAwesome6 name="trash" size={24} color="white" />
                    </Pressable>
                  </View>
                ))
              ) : (
                <Text className="font-semibold text-xl text-white">
                  No upcoming events!
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

                    <Pressable
                      onPress={() =>
                        showDeleteAlert(() => deletePastEvent(event.id))
                      }
                      className="bg-black rounded-xl p-2 z-50 absolute top-0 right-1"
                    >
                      <FontAwesome6 name="trash" size={24} color="white" />
                    </Pressable>
                  </View>
                ))
              ) : (
                <Text className="font-semibold text-white">
                  No past events!
                </Text>
              )
            ) : null}
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  )
}

export default ManageCommunityEvents
