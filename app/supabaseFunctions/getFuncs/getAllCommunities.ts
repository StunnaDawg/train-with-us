import supabase from "../../../lib/supabase"
import { Dispatch, SetStateAction } from "react"
import { Communities } from "../../@types/supabaseTypes"

const getAllCommunities = async (
  page: number,
  limit: number,
  setLoading: Dispatch<SetStateAction<boolean>>,
  setCommunities: Dispatch<SetStateAction<Communities[] | null>>,
  isRefreshing = false,
  searchText: string = ""
) => {
  try {
    setLoading(true)
    const offset = (page - 1) * limit

    const query = supabase
      .from("communities")
      .select()
      .range(offset, offset + limit - 1)

    if (searchText) {
      query.ilike("community_title", `%${searchText}%`) // Assuming you are searching by community name
    }

    const { data: communities, error } = await query

    if (error) throw error

    const communitiesArray = communities ?? null

    console.log("communities:", communitiesArray)

    if (isRefreshing) {
      setCommunities(communitiesArray)
    } else {
      setCommunities((prevCommunities) =>
        prevCommunities
          ? [...prevCommunities, ...communitiesArray]
          : communitiesArray
      )
    }
  } catch (error) {
    console.log(error)
  } finally {
    setLoading(false)
  }
}

export default getAllCommunities
