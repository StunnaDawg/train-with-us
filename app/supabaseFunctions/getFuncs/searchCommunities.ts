import supabase from "../../../lib/supabase"
import { Dispatch, SetStateAction } from "react"
import { Communities } from "../../@types/supabaseTypes"

const searchCommunitiesFunction = async (
  searchText: string,
  setCommunities: Dispatch<SetStateAction<Communities[] | null>>,
  setLoading: Dispatch<SetStateAction<boolean>>,
  page: number,
  limit: number
) => {
  try {
    setLoading(true)
    const offset = (page - 1) * limit

    const { data: communities, error } = await supabase
      .from("communities")
      .select()
      .ilike("community_title", `%${searchText}%`) // Assuming you are searching by community name
      .range(offset, offset + limit - 1)

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

export default searchCommunitiesFunction
