import { View, Text, SafeAreaView, Pressable, ScrollView } from "react-native"
import React, { useCallback, useState } from "react"
import { useAuth } from "../../supabaseFunctions/authcontext"
import getUserEvents from "../../supabaseFunctions/getFuncs/getUsersEvents"
import { Events } from "../../@types/supabaseTypes"
import { useFocusEffect, useNavigation } from "@react-navigation/native"
import { NavigationType, TabNavigationType } from "../../@types/navigation"
import EventCard from "./components/EventCard"
import { FontAwesome6 } from "@expo/vector-icons"

const MyEvents = () => {
  const [isPressed, setIsPressed] = useState<boolean>(false)
  const [userEvents, setUserEvents] = useState<Events[] | null>(null)
  const { user } = useAuth()
  const navigation = useNavigation<NavigationType>()
  const tabNavigation = useNavigation<TabNavigationType>()

  const handleOnPressIn = () => setIsPressed(true)
  const handleOnPressOut = () => setIsPressed(false)

  useFocusEffect(
    useCallback(() => {
      if (user) getUserEvents(user.id, setUserEvents)
    }, [user])
  )

  return (
    <SafeAreaView className="flex-1 bg-primary-900">
      <View className="px-4 py-6">
        <Text className="text-2xl font-bold text-white text-center mb-6">
          Upcoming Events
        </Text>

        {userEvents && userEvents.length > 0 ? (
          <ScrollView className="pb-24">
            <View className="flex-row flex-wrap justify-between">
              {userEvents.map((event) => (
                <Pressable
                  key={event.id}
                  className="w-[48%] mb-4"
                  onPress={() =>
                    navigation.navigate("ViewEvent", { eventId: event.id })
                  }
                >
                  <EventCard
                    eventId={event.id}
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
          <View className="flex-1 justify-center items-center">
            <Text className="text-white text-lg mb-6 text-center">
              You haven't joined any events yet.
            </Text>
            <Pressable
              onPressIn={handleOnPressIn}
              onPressOut={handleOnPressOut}
              onPress={() => tabNavigation.navigate("Events")}
              className={`
                flex-row items-center justify-center
                bg-white rounded-full px-6 py-3
                ${isPressed ? "opacity-80" : ""}
              `}
            >
              <FontAwesome6 name="search" size={18} color="#000" />
              <Text className="font-semibold text-lg ml-2">
                Find Events to Join
              </Text>
            </Pressable>
          </View>
        )}
      </View>
    </SafeAreaView>
  )
}

export default MyEvents
