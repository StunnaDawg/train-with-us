import { Dispatch, SetStateAction } from "react"
import supabase from "../../lib/supabase"

const checkIfAttending = async (
  eventId: number,
  userId: string,
  setIsAttending: Dispatch<SetStateAction<boolean>>
) => {
  try {
    const { data, error } = await supabase
      .from("events_users")
      .select("*")
      .eq("event_id", eventId)
      .eq("user_id", userId)
      .maybeSingle()

    if (error) {
      console.error("Error querying events_users:", error)
      setIsAttending(false)
      return
    }

    setIsAttending(data !== null)
  } catch (error) {
    console.error("Exception when checking attendance:", error)
    setIsAttending(false)
  }
}

export default checkIfAttending
