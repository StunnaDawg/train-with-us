import {
  View,
  ScrollView,
  SafeAreaView,
  RefreshControl,
  Platform,
  StyleSheet,
} from "react-native"
import React, { useCallback, useEffect, useState } from "react"
import ViewEventTitle from "./components/ViewEventTitle"
import ViewEventDetails from "./components/ViewEventDetails"

import { useAuth } from "../../supabaseFunctions/authcontext"
import { NavigationType, RootStackParamList } from "../../@types/navigation"
import useCurrentUser from "../../supabaseFunctions/getFuncs/useCurrentUser"
import { Communities, Events, Profile } from "../../@types/supabaseTypes"
import { useNavigation, useRoute, RouteProp } from "@react-navigation/native"
import getSingleEvent from "../../supabaseFunctions/getFuncs/getSingleEvent"
import checkIfAttending from "../../supabaseFunctions/checkIfAttending"
import Spacer from "../../components/Spacer"

import { MotiView } from "moti"
import { Skeleton } from "moti/skeleton"
import getEventAttendees from "../../supabaseFunctions/getFuncs/getEventAttendees"
import checkIfWaitlisted from "../../supabaseFunctions/checkIfWaitlisted"
import getWaitListUsers from "../../supabaseFunctions/getFuncs/getWaitlistUsers"
import { NavBar } from "../../../components"
import getSingleCommunity from "../../supabaseFunctions/getFuncs/getSingleCommunity"

const ViewEvent = () => {
  const [loading, setLoading] = useState<boolean>(true)
  const { userProfile } = useAuth()
  const [isAttending, setIsAttending] = useState<boolean>(false)
  const [isWaitList, setIsWaitList] = useState<boolean>(false)
  const [event, setEvent] = useState<Events | null>(null)
  const [refreshing, setRefreshing] = useState<boolean>(false)
  const [eventProfiles, setEventProfiles] = useState<Profile[] | null>(null)
  const [waitlistProfiles, setWaitlistProfiles] = useState<Profile[] | null>(
    null
  )
  const [communityHost, setCommunityHost] = useState<Communities | null>(null)
  const route = useRoute<RouteProp<RootStackParamList, "ViewEvent">>()
  const eventId = route.params.eventId
  const colorMode = "dark"

  const onRefresh = useCallback(() => {
    setRefreshing(true)
    setTimeout(() => {
      setRefreshing(false)
    }, 2000)
  }, [])

  useEffect(() => {
    getEventAttendees(eventId, setLoading, setEventProfiles)
    getWaitListUsers(eventId, setLoading, setWaitlistProfiles)
  }, [eventId])

  useEffect(() => {
    if (eventId === undefined) return
    getSingleEvent(setLoading, eventId, setEvent)
  }, [])

  useEffect(() => {
    if (!userProfile) return
    checkIfAttending(eventId, userProfile.id, setIsAttending)
    checkIfWaitlisted(eventId, userProfile.id, setIsWaitList)
  }, [userProfile])

  useEffect(() => {
    if (!event?.community_host) return
    getSingleCommunity(setLoading, event.community_host, setCommunityHost)
  }, [event])

  return (
    <SafeAreaView className="flex-1 bg-primary-900">
      <NavBar
        textColour="text-white"
        title={event?.event_title || "Event"}
        showFriends={false}
        showSearchCommunities={false}
        searchUsers={false}
        event={true}
      />
      <View className="flex-1 bg-primary-700">
        {loading ? (
          <View>
            <MotiView
              transition={{
                type: "timing",
              }}
              className="items-center mx-3 flex flex-row justify-center"
              animate={{ backgroundColor: "#07182d" }}
            >
              <View className="items-center">
                <Skeleton colorMode={colorMode} width={"100%"} />
                <Spacer height={8} />
                <Skeleton colorMode={colorMode} height={200} width={275} />
                <Spacer />
                <Skeleton colorMode={colorMode} width={250} />
                <Spacer height={8} />
                <Skeleton colorMode={colorMode} width={"100%"} />
                <Spacer height={8} />
                <Skeleton colorMode={colorMode} width={"100%"} />
                <Spacer height={8} />
                <Skeleton colorMode={colorMode} width={"100%"} />
                <Spacer height={8} />
                <Skeleton colorMode={colorMode} width={"100%"} />
                <Spacer height={30} />

                <Skeleton height={50} colorMode={colorMode} width={"100%"} />
              </View>
            </MotiView>
          </View>
        ) : (
          <>
            <ScrollView
              showsVerticalScrollIndicator={false}
              className="flex-1 px-2"
              refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
              }
            >
              <View>
                <ViewEventTitle
                  title={event?.event_title}
                  communityHost={communityHost}
                />
              </View>

              <View className="">
                <ViewEventDetails
                  date={event?.date}
                  event={event}
                  location={event?.location}
                  price={event?.price}
                  attendanceLimit={event?.event_limit}
                  eventProfiles={eventProfiles}
                  waitlistProfiles={waitlistProfiles}
                  description={event?.event_description}
                  userProfile={userProfile}
                />
              </View>
            </ScrollView>
          </>
        )}
      </View>
    </SafeAreaView>
  )
}

export default ViewEvent

// const styles = StyleSheet.create({
//   container: {
//     justifyContent: "center",
//   },
//   padded: {
//     padding: 16,
//   },
// })
