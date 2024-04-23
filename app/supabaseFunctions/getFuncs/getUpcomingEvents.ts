import { Dispatch, SetStateAction } from "react"
import supabase from "../../../lib/supabase"
import { Events } from "../../@types/supabaseTypes"

const getUpcomingEvents = async (
  setLoading: Dispatch<SetStateAction<boolean>>,
  setEvents: Dispatch<SetStateAction<Events[] | null>>,
  limit: number
) => {
  try {
    setLoading(true)
    const currentDate = new Date().toISOString()
    const { data: events, error } = await supabase
      .from("events")
      .select()
      .gt("date", currentDate)
      .limit(limit)

    if (error) throw error

    const eventsArray = events ?? null
    console.log("events:", eventsArray)

    setEvents(eventsArray)
  } catch (error) {
    console.log(error)
  } finally {
    setLoading(false)
  }
}

export default getUpcomingEvents
