import { Dispatch, SetStateAction } from "react"
import supabase from "../../../lib/supabase"
import { Events } from "../../@types/supabaseTypes"

const getSingleEvent = async (
  setLoading: Dispatch<SetStateAction<boolean>>,
  id: string,
  setEvent: Dispatch<SetStateAction<Events | null>>
) => {
  try {
    setLoading(true)
    const { data: event, error } = await supabase
      .from("events")
      .select()
      .eq("id", id)

    if (error) throw error

    const singleEvent = event[0] ?? null
    console.log("events:", singleEvent)

    setEvent(singleEvent)
  } catch (error) {
    console.log(error)
    setEvent(null)
  } finally {
    setLoading(false)
  }
}

export default getSingleEvent
