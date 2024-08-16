import supabase from "../../../lib/supabase"
import { Dispatch, SetStateAction } from "react"
import { Communities } from "../../@types/supabaseTypes"

const getAllCommunities = async (
  page: number,
  limit: number,
  setLoading: Dispatch<SetStateAction<boolean>>,
  setCommunities: Dispatch<SetStateAction<Communities[] | null>>,
  currentCommunities: Communities[] | null,
  isRefreshing = false
) => {
  try {
    setLoading(true)
    const offset = (page - 1) * limit

    const query = supabase.from("communities").select()

    const { data: communities, error } = await query

    if (error) throw error

    const communitiesArray = communities ?? null

    setCommunities(communitiesArray)
  } catch (error) {
    console.log(error)
  } finally {
    setLoading(false)
  }
}

export default getAllCommunities
