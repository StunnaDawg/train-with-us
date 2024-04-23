import { Dispatch, SetStateAction } from "react"
import supabase from "../../../lib/supabase"
import { Communities } from "../../@types/supabaseTypes"

const getAllCommunities = async (
  setLoading: Dispatch<SetStateAction<boolean>>,
  setCommunities: Dispatch<SetStateAction<Communities[] | null>>
) => {
  try {
    setLoading(true)
    const { data: communities, error } = await supabase
      .from("communities")
      .select()

    if (error) throw error

    const communitiesArray = communities ?? null

    console.log("communities:", communitiesArray)

    setCommunities(communitiesArray)
  } catch (error) {
    console.log(error)
  } finally {
    setLoading(false)
  }
}

export default getAllCommunities
