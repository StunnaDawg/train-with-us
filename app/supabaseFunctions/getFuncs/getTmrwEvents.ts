import { Dispatch, SetStateAction } from "react"
import supabase from "../../../lib/supabase"
import { Events } from "../../@types/supabaseTypes"

const getTmrwEvents = async (
  setLoading: Dispatch<SetStateAction<boolean>>,
  setEvents: Dispatch<SetStateAction<Events[] | null>>,
  limit: number,
  tmrwDate: string,
  dayAfterTmrw: string
) => {
  try {
    setLoading(true)

    const { data: events, error } = await supabase
      .from("events")
      .select()
      .gte("date", tmrwDate)
      .lt("date", dayAfterTmrw)
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

export default getTmrwEvents
