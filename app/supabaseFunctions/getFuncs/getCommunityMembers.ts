import { Dispatch, SetStateAction } from "react"
import supabase from "../../../lib/supabase"
import { Profile } from "../../@types/supabaseTypes"

const getCommunityMembers = async (
  setLoading: Dispatch<SetStateAction<boolean>>,
  id: number,
  setCommunityMembers: Dispatch<SetStateAction<Profile[] | null>>
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

      const { data, error: error2 } = await supabase
        .from("profiles")
        .select("*")
        .in("id", uuids)

      if (error2) throw error2

      console.log("Community members data", data)

      if (data) {
        setCommunityMembers([...data])
      } else {
        setCommunityMembers(null)
      }
    }
  } catch (error) {
    console.log(error)
  } finally {
    setLoading(false)
  }
}

export default getCommunityMembers
