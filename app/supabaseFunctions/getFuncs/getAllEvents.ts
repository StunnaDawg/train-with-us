import { Dispatch, SetStateAction } from "react"
import supabase from "../../../lib/supabase"
import { Events } from "../../@types/supabaseTypes"

const getAllEvents = async (
  setLoading: Dispatch<SetStateAction<boolean>>,
  setEvents: Dispatch<SetStateAction<Events[] | null>>,
  limit: number
) => {
  try {
    setLoading(true)
    const { data: events, error } = await supabase
      .from("events")
      .select()
      .limit(limit)

    if (error) throw error

    const eventsArray = events ?? null

    setEvents(eventsArray)
  } catch (error) {
    console.log(error)
  } finally {
    setLoading(false)
  }
}

export default getAllEvents
