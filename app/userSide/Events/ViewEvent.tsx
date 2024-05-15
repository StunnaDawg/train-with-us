import { View, ScrollView, SafeAreaView, RefreshControl } from "react-native"
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
import { is } from "date-fns/locale"
import checkIfAttending from "../../supabaseFunctions/checkIfAttending"

const ViewEvent = () => {
  const [loading, setLoading] = useState<boolean>(false)
  const { user } = useAuth()
  const [userProfile, setUserProfile] = useState<Profile | null>(null)
  const navigation = useNavigation<NavigationType>()
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
    <View className="flex-1 bg-yellow-300">
      <SafeAreaView className="flex-1">
        <ScrollView
          className="flex-1"
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        >
          <View>
            <ViewEventTitle
              eventId={event?.id}
              title={event?.event_title}
              date={event?.date}
              eventPhoto={event?.event_cover_photo}
            />
          </View>

          <View className="mx-5 mt-2">
            <ViewEventDetails date={event?.date} />
          </View>

          <View>
            <AboutViewEvent description={event?.event_description} />
          </View>
        </ScrollView>
        <View className="absolute inset-x-0 bottom-0 pb-12 bg-white/75">
          <Checkout
            ticketPrice={event?.price ? event.price : 0}
            event={event}
          />
        </View>
      </SafeAreaView>
    </View>
  )
}

export default ViewEvent
