import { Dispatch, SetStateAction } from "react"
import { Events } from "../../@types/supabaseTypes"
import supabase from "../../../lib/supabase"

const getEventOnType = async (
  setLoading: Dispatch<SetStateAction<boolean>>,
  setEvents: Dispatch<SetStateAction<Events[] | null>>,
  type: string
) => {
  try {
    setLoading(true)
    const { data: events, error } = await supabase
      .from("events")
      .select("*")
      .eq("event_style", type)

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

export default getEventOnType
