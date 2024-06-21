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
    ;(async () => {
      const { status } = await Calendar.requestCalendarPermissionsAsync()
      if (status === "granted") {
        const calendars = await Calendar.getCalendarsAsync(
          Calendar.EntityTypes.EVENT
        )
        console.log("Here are all your calendars:")
        console.log({ calendars })
      }
    })()
    try {
      // Fetch all calendars
      const calendars = await Calendar.getCalendarsAsync(
        Calendar.EntityTypes.EVENT
      )
      console.log("Available calendars:", calendars)

      // Filter for writable calendars, prioritize primary, else take the first writable one
      const writableCalendars = calendars.filter(
        (c) => c.allowsModifications === true
      )
      const selectedCalendar =
        writableCalendars.find((c) => c.isPrimary) || writableCalendars[0]

      if (!selectedCalendar) {
        Alert.alert(
          "No Accessible Calendars",
          "No writable calendars are available."
        )
        return
      }

      if (!eventState || !eventState.date) {
        Alert.alert("Error", "Event details or date is not available.")
        return
      }

      const startDate = new Date(eventState.date)
      const endDate = new Date(eventState.date) // Adjust if end date is different

      // Create event in the selected calendar
      await Calendar.createEventAsync(selectedCalendar.id, {
        title: eventState.event_title || "No Title",
        startDate,
        endDate,
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
