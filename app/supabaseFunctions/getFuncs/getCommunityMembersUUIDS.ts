import { Dispatch, SetStateAction } from "react"
import supabase from "../../../lib/supabase"
import { Profile } from "../../@types/supabaseTypes"

const getCommunityMembersUUIDs = async (
  setLoading: Dispatch<SetStateAction<boolean>>,
  id: number,
  setCommunityMembersUUIDS: Dispatch<SetStateAction<string[] | null>>
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

      console.log("Community members data", uuids)
      setCommunityMembersUUIDS([...uuids])
    }
  } catch (error) {
    console.log(error)
  } finally {
    setLoading(false)
  }
}

export default getCommunityMembersUUIDs
