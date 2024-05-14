import { View, Text, SafeAreaView, Pressable } from "react-native"
import React, { useEffect, useState } from "react"
import { useAuth } from "../../supabaseFunctions/authcontext"
import getUserEvents from "../../supabaseFunctions/getFuncs/getUsersEvents"
import { Events } from "../../@types/supabaseTypes"
import formatBirthdate from "../../utilFunctions/calculateDOB"
import { useNavigation } from "@react-navigation/native"
import { NavigationType } from "../../@types/navigation"
import WhiteSkinnyButton from "../../components/WhiteSkinnyButton"

const MyEvents = () => {
  const [userEvents, setUserEvents] = useState<Events[] | null>(null)
  const { user } = useAuth()
  const navigation = useNavigation<NavigationType>()

  useEffect(() => {
    if (!user) return
    getUserEvents(user?.id, setUserEvents)
  }, [])

  useEffect(() => {
    console.log(userEvents)
  }, [userEvents])
  return (
    <SafeAreaView className="flex-1">
      <View className="flex flex-row justify-center">
        <Text className="font-bold text-3xl">My Events</Text>
      </View>

      <View className="m-5 mx-7">
        <View>
          <Text className="font-bold text-2xl">Upcoming Events:</Text>
        </View>
        {userEvents?.map((event) => (
          <Pressable
            className="my-3"
            onPress={() =>
              navigation.navigate("ViewEvent", {
                eventId: event.id,
              })
            }
            key={event.id}
          >
            <View className="flex flex-row">
              <Text className="font-medium text-xl">
                {formatBirthdate(event.date)} - {event.event_title}
              </Text>
            </View>
            <Text className="font-medium text-xl">
              Hosted by:
              <Text className="font-bold"> {event.community_host_name}</Text>
            </Text>
          </Pressable>
        ))}
      </View>
    </SafeAreaView>
  )
}

export default MyEvents
