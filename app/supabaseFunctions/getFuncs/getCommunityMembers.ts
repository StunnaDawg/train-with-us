import { Dispatch, SetStateAction } from "react"
import supabase from "../../../lib/supabase"
import { Profile } from "../../@types/supabaseTypes"

const getCommunityMembersUUID = async (
  setLoading: Dispatch<SetStateAction<boolean>>,
  id: number,
  setCommunityMembersUUIDs: Dispatch<SetStateAction<string[] | null>>
) => {
  try {
    setLoading(true)
    if (id) {
      console.log("events in get func, ", id)
      const { data: communities, error } = await supabase
        .from("communities")
        .select("community_members")
        .eq("id", id)

      if (error) throw error

      const community = communities ?? null
      console.log("got communitiesArray,", community)
      setCommunityMembersUUIDs(community[0].community_members)
    }
  } catch (error) {
    console.log(error)
  } finally {
    setLoading(false)
  }
}

export default getCommunityMembersUUID
