import { Dispatch, SetStateAction } from "react"
import supabase from "../../../lib/supabase"
import { Events } from "../../@types/supabaseTypes"

const searchEventsFunction = async (
  search: string,
  setEvents: Dispatch<SetStateAction<Events[]>>,
  setLoading: Dispatch<SetStateAction<boolean>>
) => {
  try {
    setLoading(true)
    const { data, error } = await supabase
      .from("events")
      .select()
      .textSearch("event_title", search)

    if (error) throw error

    setEvents(data)
  } catch (error) {
    console.log(error)
  } finally {
    setLoading(false)
  }
}

export default searchEventsFunction
