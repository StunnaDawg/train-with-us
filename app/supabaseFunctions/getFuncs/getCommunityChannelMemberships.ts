import { Dispatch, SetStateAction } from "react"
import supabase from "../../../lib/supabase"
import {
  CommunityChannel,
  CommunityMembership,
} from "../../@types/supabaseTypes"

const getCommunityMemberShips = async (
  communityId: number,
  userId: string,
  setLoading: Dispatch<SetStateAction<boolean>>,
  setCommunityChannels: Dispatch<SetStateAction<CommunityMembership[] | null>>
) => {
  setLoading(true)
  try {
    const { data, error } = await supabase
      .from("community_memberships")
      .select("*")
      .eq("community_id", communityId)
      .eq("user_id", userId)

    if (error) {
      console.error("Error fetching community channels:", error.message)
      return
    }

    console.log("Community channels data", data)
    if (data) {
      setCommunityChannels([...data])
    } else {
      setCommunityChannels(null)
    }
  } catch (error) {
    console.log(error)
  } finally {
    setLoading(false)
  }
}

export default getCommunityMemberShips
