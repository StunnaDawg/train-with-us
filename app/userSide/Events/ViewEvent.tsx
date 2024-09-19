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
import AboutViewEvent from "./components/AboutViewEvent"
import Checkout from "./components/Checkout"
import { useAuth } from "../../supabaseFunctions/authcontext"
import { NavigationType, RootStackParamList } from "../../@types/navigation"
import useCurrentUser from "../../supabaseFunctions/getFuncs/useCurrentUser"
import { Events, Profile } from "../../@types/supabaseTypes"
import { useNavigation, useRoute, RouteProp } from "@react-navigation/native"
import getSingleEvent from "../../supabaseFunctions/getFuncs/getSingleEvent"
import checkIfAttending from "../../supabaseFunctions/checkIfAttending"
import BackButton from "../../components/BackButton"
import LeaveEvent from "./components/LeaveEvent"
import { Text } from "react-native"
import ShareButton from "../../components/ShareButton"
import Spacer from "../../components/Spacer"
import CommunityEventCard from "./components/CommunityEventCard"
import { MotiView } from "moti"
import { Skeleton } from "moti/skeleton"
import getEventAttendees from "../../supabaseFunctions/getFuncs/getEventAttendees"
import checkIfWaitlisted from "../../supabaseFunctions/checkIfWaitlisted"
import getWaitListUsers from "../../supabaseFunctions/getFuncs/getWaitlistUsers"

const ViewEvent = () => {
  const [loading, setLoading] = useState<boolean>(true)
  const { user } = useAuth()
  const [userProfile, setUserProfile] = useState<Profile | null>(null)
  const [isAttending, setIsAttending] = useState<boolean>(false)
  const [isWaitList, setIsWaitList] = useState<boolean>(false)
  const [event, setEvent] = useState<Events | null>(null)
  const [refreshing, setRefreshing] = useState<boolean>(false)
  const [eventProfiles, setEventProfiles] = useState<Profile[] | null>(null)
  const [waitlistProfiles, setWaitlistProfiles] = useState<Profile[] | null>(
    null
  )
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
    const getUser = async () => {
      if (!user) return
      await useCurrentUser(user?.id, setUserProfile)
    }
    getUser()
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

  return (
    <View className="flex-1" style={{ backgroundColor: "#07182d" }}>
      <SafeAreaView className="flex-1">
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
            <View className="flex flex-row justify-between items-center mx-3 p-2">
              <BackButton size={22} colour="white" />
              <Text className="text-white text-lg font-bold">
                {event?.event_title || "Event"}
              </Text>
              <ShareButton eventId={eventId} userId={user?.id} />
            </View>
            <ScrollView
              showsVerticalScrollIndicator={false}
              className="flex-1"
              refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
              }
            >
              <View>
                <ViewEventTitle
                  userId={user?.id}
                  eventId={event?.id}
                  title={event?.event_title}
                  date={event?.date}
                  eventCommunityTitle={event?.community_host_name}
                  eventPhoto={event?.event_cover_photo}
                  eventStyle={event?.event_style}
                />
              </View>

              <View className="mx-5 mt-2">
                <ViewEventDetails
                  date={event?.date}
                  eventId={eventId}
                  location={event?.location}
                  price={event?.price}
                  attendanceLimit={event?.event_limit}
                  eventProfiles={eventProfiles}
                  waitlistProfiles={waitlistProfiles}
                />
              </View>

              <View>
                <AboutViewEvent description={event?.event_description} />
              </View>

              {event?.community_host ? (
                <View className="mx-2">
                  <CommunityEventCard
                    communityId={event?.community_host}
                    userId={user?.id}
                  />
                </View>
              ) : null}
            </ScrollView>

            {!isAttending && !isWaitList ? (
              <Checkout // this is used to buy a ticket and attend the event not yet implemented just adds user to events
                ticketPrice={event?.price ? event.price : 0}
                event={event}
                eventProfiles={eventProfiles}
              />
            ) : (
              <LeaveEvent
                eventId={eventId}
                userId={user?.id}
                isWaitList={isWaitList}
              />
            )}
          </>
        )}
      </SafeAreaView>
    </View>
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
