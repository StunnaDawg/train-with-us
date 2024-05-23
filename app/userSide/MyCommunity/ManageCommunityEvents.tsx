import { View, Text, Pressable } from "react-native"
import React, { useCallback, useEffect, useState } from "react"
import {
  useFocusEffect,
  useNavigation,
  useRoute,
} from "@react-navigation/native"
import { RouteProp } from "@react-navigation/native"
import { NavigationType, RootStackParamList } from "../../@types/navigation"
import getCommunityEvents from "../../supabaseFunctions/getFuncs/getCommunityEvent"
import { Events } from "../../@types/supabaseTypes"
import { SafeAreaView } from "react-native-safe-area-context"
import formatBirthdate from "../../utilFunctions/calculateDOB"
import WhiteSkinnyButton from "../../components/WhiteSkinnyButton"

const ManageCommunityEvents = () => {
  const [loading, setLoading] = useState<boolean>(false)
  const [communityEvents, setCommunityEvents] = useState<Events[] | null>([])
  const route = useRoute<RouteProp<RootStackParamList, "MyCommunityEvents">>()
  const communityId = route.params.communityId
  const navigation = useNavigation<NavigationType>()

  useFocusEffect(
    useCallback(() => {
      let isActive = true

      const getEvents = async () => {
        setLoading(true)
        await getCommunityEvents(setLoading, communityId, (events) => {
          if (isActive) {
            setCommunityEvents(events)
          }
        })
        setLoading(false)
      }

      getEvents()

      return () => {
        isActive = false
      }
    }, [communityId, setCommunityEvents])
  )

  useEffect(() => {
    getCommunityEvents(setLoading, communityId, setCommunityEvents)
  }, [communityId])

  return (
    <SafeAreaView className="flex-1">
      <View className="flex flex-row justify-center">
        <Text className="font-bold text-3xl">My Events</Text>
      </View>

      <View className="m-5 mx-7">
        <View>
          <Text className="font-bold text-2xl">Upcoming Events:</Text>
        </View>
        {communityEvents?.map((event) => (
          <Pressable
            className="my-3"
            onPress={() =>
              navigation.navigate("EditEvent", {
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
              <Text className="font-bold">{event.community_host_name}</Text>
            </Text>
          </Pressable>
        ))}
      </View>
    </SafeAreaView>
  )
}

export default ManageCommunityEvents
