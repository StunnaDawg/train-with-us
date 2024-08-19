import supabase from "../../../lib/supabase"
import { Dispatch, SetStateAction } from "react"
import { Communities } from "../../@types/supabaseTypes"
import { se } from "date-fns/locale"

const PAGE_SIZE = 10

const searchCommunitiesFunction = async (
  searchText: string,
  setCommunities: Dispatch<SetStateAction<Communities[] | null>>,
  setLoading: Dispatch<SetStateAction<boolean>>,
  page: number,
  setEndOfData: Dispatch<SetStateAction<boolean>>
) => {
  try {
    setCommunities(null)
    setLoading(true)
    const to = page * PAGE_SIZE
    const from = to - PAGE_SIZE

    const { data: communities, error } = await supabase
      .from("communities")
      .select()
      .ilike("community_title", `%${searchText}%`) // Assuming you are searching by community name
      .range(from, to)

    if (error) {
      throw new Error(error.message)
    } else {
      if (communities.length < PAGE_SIZE) {
        setEndOfData(true)
      }
      setCommunities(communities)
    }
  } catch (error) {
    console.log(error)
  } finally {
    setLoading(false)
  }
}

export default searchCommunitiesFunction
