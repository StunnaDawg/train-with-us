import { Dispatch, SetStateAction } from "react"
import supabase from "../../../lib/supabase"
import { Events } from "../../@types/supabaseTypes"

const getCommunityEvents = async (
  setLoading: Dispatch<SetStateAction<boolean>>,
  communityId: number,
  setUserProfile: Dispatch<SetStateAction<Events[] | null>>
) => {
  try {
    setLoading(true)
    const currentDate = new Date().toISOString()
    const { data: events, error } = await supabase
      .from("events")
      .select()
      .eq("community_host", communityId)
      .gte("date", currentDate)
      .limit(10)
      .order("date", { ascending: false })

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
