import { Dispatch, SetStateAction } from "react"
import supabase from "../../../lib/supabase"
import { Communities } from "../../@types/supabaseTypes"

const getSingleCommunity = async (
  setLoading: Dispatch<SetStateAction<boolean>>,
  id: number,
  setCommunity: Dispatch<SetStateAction<Communities | null>>
) => {
  try {
    setLoading(true)
    if (id) {
      console.log("events in get func, ", id)
      const { data: communities, error } = await supabase
        .from("communities")
        .select()
        .eq("id", id)

      if (error) throw error

      const community = communities[0] ?? null
      console.log("got communitiesArray,", community)

      setCommunity(community)
    }
  } catch (error) {
    console.log(error)
  } finally {
    setLoading(false)
  }
}

export default getSingleCommunity
