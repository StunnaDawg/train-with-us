import { Dispatch, SetStateAction } from "react"
import supabase from "../../../lib/supabase"
import { EventWithCompatibility } from "../../@types/supabaseTypes"

const PAGE_SIZE = 10

const getCompatibleEvents = async (
  userId: string,
  page: number,
  setLoading: Dispatch<SetStateAction<boolean>>,
  setEvents: Dispatch<SetStateAction<EventWithCompatibility[]>>,
  setEndOfData: Dispatch<SetStateAction<boolean>>
) => {
  try {
    setLoading(true)
    const from = page * PAGE_SIZE
    const to = from + PAGE_SIZE - 1

    const { data: events, error } = await supabase
      .rpc("get_compatible_events", { user_id: userId })
      .range(from, to)

    if (error) {
      throw new Error(error.message)
    } else {
      if (events.length < PAGE_SIZE) {
        setEndOfData(true)
      }

      setEvents((prevEvents) => {
        if (prevEvents) {
          return [...prevEvents, ...events]
        } else {
          return events
        }
      })
    }
  } catch (error) {
    console.log(error)
  } finally {
    setLoading(false)
  }
}

export default getCompatibleEvents
