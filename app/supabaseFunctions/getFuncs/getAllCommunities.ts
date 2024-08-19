import supabase from "../../../lib/supabase"
import { Dispatch, SetStateAction } from "react"
import { Communities } from "../../@types/supabaseTypes"

const PAGE_SIZE = 10

const getAllCommunities = async (
  page: number,
  setLoading: Dispatch<SetStateAction<boolean>>,
  setCommunities: Dispatch<SetStateAction<Communities[] | null>>,
  setEndOfData: Dispatch<SetStateAction<boolean>>
) => {
  try {
    setLoading(true)
    const from = page * PAGE_SIZE
    const to = from + PAGE_SIZE - 1

    const query = supabase.from("communities").select("*").range(from, to)

    const { data: communities, error } = await query

    if (error) {
      throw new Error(error.message)
    } else {
      if (communities.length < PAGE_SIZE) {
        setEndOfData(true)
      }

      setCommunities((prevCommunities) => {
        if (prevCommunities) {
          return [...prevCommunities, ...communities]
        } else {
          return communities
        }
      })
    }

    const communitiesArray = communities ?? null

    setCommunities(communitiesArray)
  } catch (error) {
    console.log(error)
  } finally {
    setLoading(false)
  }
}

export default getAllCommunities
