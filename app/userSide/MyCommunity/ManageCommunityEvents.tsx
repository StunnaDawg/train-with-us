import { View, Text, Pressable, Alert } from "react-native"
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
import { FontAwesome6 } from "@expo/vector-icons"
import supabase from "../../../lib/supabase"
import showAlert from "../../utilFunctions/showAlert"

const ManageCommunityEvents = () => {
  const [loading, setLoading] = useState<boolean>(false)
  const [communityEvents, setCommunityEvents] = useState<Events[] | null>([])
  const route = useRoute<RouteProp<RootStackParamList, "MyCommunityEvents">>()
  const communityId = route.params.communityId
  const navigation = useNavigation<NavigationType>()

  const showDeleteAlert = (onConfirm: () => void) =>
    Alert.alert(
      "Do you want to delete this channel?",
      "Please select an option.",
      [
        {
          text: "Yes",
          onPress: onConfirm,
        },
        {
          text: "Cancel",
          style: "cancel",
        },
      ],
      {
        cancelable: true,
      }
    )

  const deleteEvent = async (eventId: number) => {
    const { error } = await supabase.from("events").delete().eq("id", eventId)

    if (error) {
      showAlert({
        title: "Error",
        message: "Error deleting channel",
        buttonText: "OK",
      })
      throw error
    }

    getCommunityEvents(setLoading, communityId, setCommunityEvents)
  }

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
          <Text className="font-bold text-2xl">My Upcoming Events:</Text>
        </View>
        {communityEvents?.map((event) => (
          <View className="flex flex-row justify-between my-3" key={event.id}>
            <View className="flex flex-row">
              <Text className="font-medium text-xl">
                {formatBirthdate(event.date)} - {event.event_title}
              </Text>
            </View>

            <View className="flex flex-row">
              <Pressable
                className="mx-6"
                onPress={() =>
                  navigation.navigate("EditEvent", {
                    eventId: event.id,
                  })
                }
              >
                <FontAwesome6 name="edit" size={24} color="black" />
              </Pressable>

              <Pressable
                onPress={() => {
                  showDeleteAlert(() => {
                    deleteEvent(event.id)
                  })
                }}
              >
                <FontAwesome6 name="trash" size={24} color="black" />
              </Pressable>
            </View>
          </View>
        ))}
      </View>
    </SafeAreaView>
  )
}

export default ManageCommunityEvents
