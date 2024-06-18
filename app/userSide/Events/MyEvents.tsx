import { View, Text, SafeAreaView, Pressable, ScrollView } from "react-native"
import React, { useCallback, useEffect, useState } from "react"
import { useAuth } from "../../supabaseFunctions/authcontext"
import getUserEvents from "../../supabaseFunctions/getFuncs/getUsersEvents"
import { Events, Profile } from "../../@types/supabaseTypes"
import formatBirthdate from "../../utilFunctions/calculateDOB"
import { useFocusEffect, useNavigation } from "@react-navigation/native"
import { NavigationType } from "../../@types/navigation"
import returnCommunityName from "../../utilFunctions/returnCommunityName"
import useCurrentUser from "../../supabaseFunctions/getFuncs/useCurrentUser"
import BackButton from "../../components/BackButton"
import EventCard from "./components/EventCard"

const MyEvents = () => {
  const [primaryGymName, setPrimaryGymName] = useState<string>("")
  const [profile, setProfile] = useState<Profile | null>(null)
  const [userEvents, setUserEvents] = useState<Events[] | null>(null)
  const { user } = useAuth()
  const navigation = useNavigation<NavigationType>()

  useEffect(() => {
    const getPrimaryGymName = async () => {
      if (profile?.primary_gym === null) {
        setPrimaryGymName("No Primary Gym")
        return
      }
      const PrimaryGymName = await returnCommunityName(profile?.primary_gym)
      setPrimaryGymName(PrimaryGymName)
    }

    getPrimaryGymName()
  }, [profile])

  useFocusEffect(
    useCallback(() => {
      const getUser = async () => {
        if (!user) return
        getUserEvents(user?.id, setUserEvents)
        useCurrentUser(user?.id, setProfile)
      }

      getUser()

      return () => {
        // Optional cleanup actions
      }
    }, [user, setUserEvents])
  )

  return (
    <SafeAreaView className="flex-1 bg-primary-900">
      <View className="flex flex-row justify-between m-3 items-center">
        <BackButton size={24} colour="white" />
        <Text className="font-bold text-lg text-white">
          My Registered Events
        </Text>
        <View />
      </View>
      <ScrollView>
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
// onPress={() =>
//               navigation.navigate("ViewEvent", {
//                 eventId: event.id,
//               })
