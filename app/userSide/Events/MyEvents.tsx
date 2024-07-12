import { View, Text, SafeAreaView, Pressable, ScrollView } from "react-native"
import React, { useCallback, useEffect, useState } from "react"
import { useAuth } from "../../supabaseFunctions/authcontext"
import getUserEvents from "../../supabaseFunctions/getFuncs/getUsersEvents"
import { Events, Profile } from "../../@types/supabaseTypes"
import { useFocusEffect, useNavigation } from "@react-navigation/native"
import { NavigationType } from "../../@types/navigation"
import BackButton from "../../components/BackButton"
import EventCard from "./components/EventCard"

const MyEvents = () => {
  const [userEvents, setUserEvents] = useState<Events[] | null>(null)
  const { user } = useAuth()
  const navigation = useNavigation<NavigationType>()

  useFocusEffect(
    useCallback(() => {
      const getUser = async () => {
        if (!user) return
        getUserEvents(user?.id, setUserEvents)
      }

      getUser()

      return () => {
        // Optional cleanup actions
      }
    }, [user, setUserEvents])
  )

  return (
    <SafeAreaView className="flex-1 ">
      <View className="flex flex-row justify-between m-3 items-center">
        <Text className="font-bold text-lg ">Upcoming Events</Text>
        <View />
      </View>
      <ScrollView horizontal={true}>
        <View className="flex flex-row flex-wrap">
          {userEvents?.map((event) => (
            <Pressable
              className="my-1"
              onPress={() =>
                navigation.navigate("ViewEvent", {
                  eventId: event.id,
                })
              }
            >
              <EventCard
                eventId={event.id}
                key={event.id}
                title={event.event_title}
                date={event.date}
                eventCoverPhoto={event.event_cover_photo}
                eventPrice={event.price}
                communityId={event.community_host}
              />
            </Pressable>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default MyEvents
