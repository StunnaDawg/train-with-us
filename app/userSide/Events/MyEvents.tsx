import { View, Text, SafeAreaView, Pressable, ScrollView } from "react-native"
import React, { useCallback, useEffect, useState } from "react"
import { useAuth } from "../../supabaseFunctions/authcontext"
import getUserEvents from "../../supabaseFunctions/getFuncs/getUsersEvents"
import { Events, Profile } from "../../@types/supabaseTypes"
import { useFocusEffect, useNavigation } from "@react-navigation/native"
import { NavigationType, TabNavigationType } from "../../@types/navigation"
import EventCard from "./components/EventCard"

const MyEvents = () => {
  const [isPressed, setIsPressed] = useState<boolean>(false)
  const [userEvents, setUserEvents] = useState<Events[] | null>(null)
  const { user } = useAuth()
  const navigation = useNavigation<NavigationType>()
  const tabNavigation = useNavigation<TabNavigationType>()

  const handleOnPressIn = () => {
    setIsPressed(true)
  }

  const handleOnPressOut = () => {
    setIsPressed(false)
  }

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
    <SafeAreaView className="flex-1">
      <View className="flex flex-row justify-center m-3 items-center">
        <Text className="font-bold text-lg ">Upcoming Events</Text>
      </View>

      {userEvents && userEvents.length > 0 ? (
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
      ) : (
        <View className="flex flex-row justify-center">
          <Pressable
            onPressIn={handleOnPressIn}
            onPressOut={handleOnPressOut}
            onPress={() => tabNavigation.navigate("Events")}
            className={`${
              isPressed ? "opacity-50" : null
            } border p-2 rounded-lg bg-slate-300`}
          >
            <Text className="font-semibold">Find Events to join!</Text>
          </Pressable>
        </View>
      )}
    </SafeAreaView>
  )
}

export default MyEvents
