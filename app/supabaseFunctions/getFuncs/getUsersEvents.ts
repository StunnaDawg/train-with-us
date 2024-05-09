import { Dispatch, SetStateAction } from "react"
import supabase from "../../../lib/supabase"
import { Events } from "../../@types/supabaseTypes"

const getUserEvents = async (
  userId: string,
  setUserEvents: Dispatch<SetStateAction<Events[] | null>>
) => {
  try {
    const currentDate = new Date().toISOString()
    const { data: userEvents, error: userEventsError } = await supabase
      .from("events_users")
      .select("event_id")
      .eq("user_id", userId)

    if (userEventsError) throw userEventsError

    // Check if there are any events to fetch
    if (userEvents.length === 0) {
      setUserEvents(null)
      return
    }

    // Extract event_ids from the userEvents array
    const eventIds = userEvents.map((ue) => ue.event_id)

    // Fetch events from the events table where the id is one of the fetched event_ids
    const { data: eventsData, error: eventsError } = await supabase
      .from("events")
      .select("*")
      .in("id", eventIds)
      .gt("date", currentDate) // Use .in to filter by an array of IDs

    if (eventsError) throw eventsError

    // Set the events data using the state setter function passed to this function
    setUserEvents(eventsData)
  } catch (error) {
    console.error("Failed to fetch user events:", error)
    setUserEvents(null) // Handle error by resetting the events data to null or handling differently
  }
}

export default getUserEvents
