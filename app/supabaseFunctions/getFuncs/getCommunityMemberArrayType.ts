import { Dispatch, SetStateAction } from "react"
import supabase from "../../../lib/supabase"
import { CommunityMember, Profile } from "../../@types/supabaseTypes"

const getCommunityMembersType = async (
  setLoading: Dispatch<SetStateAction<boolean>>,
  id: number,
  setCommunityMembers: Dispatch<SetStateAction<CommunityMember[] | null>>
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

      const members = communities.map((member) => member.user_id)

      console.log("Community members data", members)
      setCommunityMembers([...members])
    }
  } catch (error) {
    console.log(error)
  } finally {
    setLoading(false)
  }
}

export default getCommunityMembersType
