import { Dispatch, SetStateAction } from "react"
import supabase from "../../../lib/supabase"
import { CommunityMember, Profile } from "../../@types/supabaseTypes"

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
        .from("community_members")
        .select("*")
        .eq("community_id", id)

      if (error) throw error

      const uuids = communities.map((member) => member.user_id)
      setCommunityMembersUUIDs(uuids)
    }
  } catch (error) {
    console.log(error)
  } finally {
    setLoading(false)
  }
}

export default getCommunityMembersUUID
