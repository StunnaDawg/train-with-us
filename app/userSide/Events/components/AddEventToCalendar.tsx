import { View, Text, Alert, Pressable } from "react-native"
import React, { useEffect, useState } from "react"
import * as Calendar from "expo-calendar"
import { Events } from "../../../@types/supabaseTypes"
import getSingleEvent from "../../../supabaseFunctions/getFuncs/getSingleEvent"
import { FontAwesome6 } from "@expo/vector-icons"

type EventProps = {
  eventId: number
}

const AddEventToCalendar = ({ eventId }: EventProps) => {
  const [eventState, setEventState] = useState<Events | null>(null)
  const [loading, setLoading] = useState<boolean>(false)
  const addEvent = async () => {
    if (!eventState) {
      Alert.alert("Error", "Event details are not available.")
      return
    }

    if (!eventState.date) {
      Alert.alert("Error", "Event date is not available.")
      return
    }
    const startDatezz = new Date(eventState.date)

    const endDatezzz = new Date(eventState.date)

    console.log("startDatezz", startDatezz)

    try {
      const defaultCalendar = await Calendar.getDefaultCalendarAsync()
      await Calendar.createEventAsync(defaultCalendar.id, {
        title: eventState.event_title || "No Title",
        startDate: startDatezz,
        endDate: endDatezzz,
        location: eventState.location || "No location specified",
        notes: eventState.event_description || "",
      })
      Alert.alert("Success", "Event added to calendar successfully.")
    } catch (error) {
      console.error("Error adding event to calendar:", error)
      Alert.alert("Error", "Failed to add event to calendar.")
    }
  }

  useEffect(() => {
    if (eventId === undefined) return
    getSingleEvent(setLoading, eventId, setEventState)
  }, [eventId])
  return (
    <Pressable className="bg-white rounded-xl p-1" onPress={() => addEvent()}>
      <FontAwesome6 name="calendar-plus" size={22} color="black" />
    </Pressable>
  )
}

export default AddEventToCalendar
