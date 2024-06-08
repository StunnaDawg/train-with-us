import { View, Text, SafeAreaView, Pressable } from "react-native"
import React, { useEffect, useState } from "react"
import { useAuth } from "../../supabaseFunctions/authcontext"
import getUserEvents from "../../supabaseFunctions/getFuncs/getUsersEvents"
import { Events, Profile } from "../../@types/supabaseTypes"
import formatBirthdate from "../../utilFunctions/calculateDOB"
import { useNavigation } from "@react-navigation/native"
import { NavigationType } from "../../@types/navigation"
import returnCommunityName from "../../utilFunctions/returnCommunityName"
import useCurrentUser from "../../supabaseFunctions/getFuncs/useCurrentUser"
import BackButton from "../../components/BackButton"

const MyEvents = () => {
  const [primaryGymName, setPrimaryGymName] = useState<string>("")
  const [profile, setProfile] = useState<Profile | null>(null)
  const [userEvents, setUserEvents] = useState<Events[] | null>(null)
  const { user } = useAuth()
  const navigation = useNavigation<NavigationType>()

  useEffect(() => {
    if (!user) return
    getUserEvents(user?.id, setUserEvents)
    useCurrentUser(user?.id, setProfile)
  }, [])

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

  return (
    <SafeAreaView className="flex-1">
      <View className="flex flex-row justify-between m-3 items-center">
        <BackButton size={32} />
        <Text className="font-bold text-3xl">My Registered Events</Text>
        <View />
      </View>

      <View className="m-5 mx-7">
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
                {formatBirthdate(event.date)} -{" "}
                <Text className="font-bold mx-1">{event.event_title}</Text>
              </Text>
            </View>
            <Text className="font-medium text-xl">
              Hosted by:
              <Text className="font-bold mx-1"> {primaryGymName}</Text>
            </Text>
          </Pressable>
        ))}
      </View>
    </SafeAreaView>
  )
}

export default MyEvents
