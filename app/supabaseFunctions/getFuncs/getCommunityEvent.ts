import { Dispatch, SetStateAction } from "react"
import supabase from "../../../lib/supabase"

const getCommunityEvents = async (
  setLoading: Dispatch<SetStateAction<boolean>>,
  communityId: string,
  setUserProfile: Dispatch<SetStateAction<Event[] | null>>
) => {
  try {
    setLoading(true)
    const { data: events, error } = await supabase
      .from("events")
      .select()
      .eq("community_host", communityId)

    if (error) throw error

    const eventsArray = events ?? null
    console.log("events, communitiesArray")

    setUserProfile(eventsArray)
  } catch (error) {
    console.log(error)
  } finally {
    setLoading(false)
  }
}

export default getCommunityEvents
