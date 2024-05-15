import { View, Text, Alert } from "react-native"
import React, { useEffect, useState } from "react"
import * as Calendar from "expo-calendar"
import { Events } from "../../../@types/supabaseTypes"
import GenericButton from "../../../components/GenericButton"
import getSingleEvent from "../../../supabaseFunctions/getFuncs/getSingleEvent"
import formatTimestamp from "../../../utilFunctions/formatTimeStamp"
import { da } from "date-fns/locale"

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
    <View>
      <GenericButton
        text="Add Event to Calendar"
        textSize="text-sm"
        buttonFunction={() => addEvent()}
        width={200}
        colourPressed="bg-blue-200"
        colourDefault="bg-blue-500"
        borderColourPressed="border-gray-200"
        borderColourDefault="border-black"
        roundness="rounded-xl"
      />
    </View>
  )
}

export default AddEventToCalendar
