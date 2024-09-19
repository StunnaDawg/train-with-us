import { Dispatch, SetStateAction } from "react"
import supabase from "../../../lib/supabase"
import { Profile } from "../../@types/supabaseTypes"

const getWaitListUsers = async (
  eventId: number,
  setLoading: Dispatch<SetStateAction<boolean>>,
  setUserProfiles: Dispatch<SetStateAction<Profile[] | null>>
) => {
  try {
    setLoading(true)
    const { data: eventAttendees, error: attendeesError } = await supabase
      .from("event_waitlist")
      .select("user_id")
      .eq("event_id", eventId)

    if (attendeesError) throw attendeesError

    if (!eventAttendees) {
      setUserProfiles(null)
      return
    }

    const profileIds = eventAttendees.map((attendee) => attendee.user_id)
    const { data: profiles, error: profilesError } = await supabase
      .from("profiles")
      .select("*")
      .in("id", profileIds)

    if (profilesError) throw profilesError

    setUserProfiles(profiles || null)
  } catch (error) {
    console.error("Error fetching event attendees:", error)
    setUserProfiles(null)
  } finally {
    setLoading(false)
  }
}

export default getWaitListUsers
