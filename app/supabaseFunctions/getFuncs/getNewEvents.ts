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
    const { data: events, error } = await supabase
      .from("events")
      .select()
      .order("created_at", { ascending: false })
      .limit(limit)

    if (error) throw error

    const eventsArray = events ?? null
    console.log("events:", eventsArray)

    setEvents(eventsArray)
  } catch (error) {
    console.log(error)
    setEvents(null)
  } finally {
    setLoading(false)
  }
}

export default getUpcomingEvents
