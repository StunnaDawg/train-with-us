import { Dispatch, SetStateAction } from "react"
import supabase from "../../../lib/supabase"
import { Profile } from "../../@types/supabaseTypes"

const getEventAttendees = async (
  eventId: string,
  setLoading: Dispatch<SetStateAction<boolean>>,
  setUserProfiles: Dispatch<SetStateAction<Profile[] | null>>
) => {
  try {
    setLoading(true)
    const { data: eventAttendees, error: attendeesError } = await supabase
      .from("event_attendees")
      .select("profile_id")
      .eq("event_id", eventId)

    if (attendeesError) throw attendeesError

    if (!eventAttendees) {
      setUserProfiles(null)
      return
    }

    const profileIds = eventAttendees.map((attendee) => attendee.profile_id)
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

export default getEventAttendees