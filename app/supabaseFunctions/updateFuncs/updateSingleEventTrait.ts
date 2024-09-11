import { Dispatch, SetStateAction } from "react"
import supabase from "../../../lib/supabase"
import { id } from "date-fns/locale"

const updateSingleEventTrait = async (
  setLoading: Dispatch<SetStateAction<boolean>>,
  eventId: number,
  row: string,
  value: string | number | Date | string[] | null
) => {
  try {
    console.log("updating on event", eventId, row, value)
    setLoading(true)
    const { error } = await supabase
      .from("events")
      .update({ [row]: value })
      .eq("id", eventId)
    //   .upsert({ id: eventId, [row]: value })

    if (error) throw error
  } catch (error) {
    console.log(error)
  } finally {
    setLoading(false)
  }
}

export default updateSingleEventTrait
