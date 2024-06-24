import {
  View,
  ScrollView,
  SafeAreaView,
  RefreshControl,
  Platform,
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
import CommunityCard from "../Communities/components/CommunityCard"
import CommunityEventCard from "./components/CommunityEventCard"

const ViewEvent = () => {
  const [loading, setLoading] = useState<boolean>(false)
  const { user } = useAuth()
  const [userProfile, setUserProfile] = useState<Profile | null>(null)
  const [isAttending, setIsAttending] = useState<boolean>(false)
  const [event, setEvent] = useState<Events | null>(null)
  const [refreshing, setRefreshing] = useState<boolean>(false)
  const route = useRoute<RouteProp<RootStackParamList, "ViewEvent">>()
  const eventId = route.params.eventId

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
    if (eventId === undefined) return
    getSingleEvent(setLoading, eventId, setEvent)
  }, [])

  useEffect(() => {
    if (!userProfile) return
    checkIfAttending(eventId, userProfile.id, setIsAttending)
  }, [userProfile])

  useEffect(() => {
    console.log("isAttending", isAttending)
  }, [isAttending])

  return (
    <View className="flex-1" style={{ backgroundColor: "#07182d" }}>
      <SafeAreaView className="flex-1">
        <View className="flex flex-row justify-between mx-3 p-2">
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
            />
          </View>

          <View>
            <AboutViewEvent description={event?.event_description} />
          </View>

          {event?.community_host ? (
            <View>
              <CommunityEventCard
                communityId={event?.community_host}
                userId={user?.id}
              />
            </View>
          ) : null}
        </ScrollView>

        {!isAttending ? (
          <Checkout
            ticketPrice={event?.price ? event.price : 0}
            event={event}
          />
        ) : (
          <LeaveEvent eventId={eventId} userId={user?.id} />
        )}
      </SafeAreaView>
    </View>
  )
}

export default ViewEvent
