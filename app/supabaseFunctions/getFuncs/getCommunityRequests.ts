import { Dispatch, SetStateAction } from "react"
import supabase from "../../../lib/supabase"
import { CommunityRequests } from "../../@types/supabaseTypes"

const getCommunityRequests = async (
  setLoading: Dispatch<SetStateAction<boolean>>,
  communityId: number,
  setRequests: Dispatch<SetStateAction<CommunityRequests[] | null>>
) => {
  try {
    setLoading(true)
    const { data, error } = await supabase
      .from("community_requests")
      .select("*")
      .eq("requested_community", communityId)

    if (error) throw error

    setRequests(data)
  } catch (error) {
    console.log(error)
  } finally {
    setLoading(false)
  }
}

export default getCommunityRequests
