import { Dispatch, SetStateAction } from "react"
import supabase from "../../../lib/supabase"
import { Events } from "../../@types/supabaseTypes"

const getNewEvents = async (
  setLoading: Dispatch<SetStateAction<boolean>>,
  setEvents: Dispatch<SetStateAction<Events[] | null>>,
  limit: number
) => {
  try {
    setLoading(true)
    const currentDate = new Date()
    currentDate.setDate(currentDate.getDate() - 5)
    const isoDate = currentDate.toISOString()

    const { data: events, error } = await supabase
      .from("events")
      .select()
      .gte("created_at", isoDate)
      .order("created_at", { ascending: false })
      .limit(limit)

    if (error) throw error

    const eventsArray = events ?? null

    setEvents(eventsArray)
  } catch (error) {
    console.log(error)
    setEvents(null)
  } finally {
    setLoading(false)
  }
}

export default getNewEvents
