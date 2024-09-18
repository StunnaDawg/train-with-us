import { Dispatch, SetStateAction } from "react"
import supabase from "../../lib/supabase"

const checkIfWaitlisted = async (
  eventId: number,
  userId: string,
  setIsWaitlisted: Dispatch<SetStateAction<boolean>>
) => {
  try {
    const { data, error } = await supabase
      .from("event_waitlist")
      .select("*")
      .eq("event_id", eventId)
      .eq("user_id", userId)
      .maybeSingle()

    if (error) {
      console.error("Error querying events_users:", error)
      setIsWaitlisted(false)
      return
    }

    setIsWaitlisted(data !== null)
  } catch (error) {
    console.error("Exception when checking attendance:", error)
    setIsWaitlisted(false)
  }
}

export default checkIfWaitlisted
