import { Dispatch, SetStateAction } from "react"
import supabase from "../../../lib/supabase"
import { Communities } from "../../@types/supabaseTypes"

const searchCommuntiesFunction = async (
  search: string,
  setCommunities: Dispatch<SetStateAction<Communities[]>>,
  setLoading: Dispatch<SetStateAction<boolean>>
) => {
  try {
    setLoading(true)
    const { data, error } = await supabase
      .from("communities")
      .select()
      .textSearch("community_title", search)

    if (error) throw error

    setCommunities(data)
  } catch (error) {
    console.log(error)
  } finally {
    setLoading(false)
  }
}

export default searchCommuntiesFunction
