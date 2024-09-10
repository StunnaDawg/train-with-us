import supabase from "../../../lib/supabase"
import { Dispatch, SetStateAction } from "react"
import {
  Communities,
  CommunityWithCompatibility,
} from "../../@types/supabaseTypes"

const PAGE_SIZE = 10

const getCompatibleCommunities = async (
  userId: string,
  page: number,
  setLoading: Dispatch<SetStateAction<boolean>>,
  setCommunities: Dispatch<SetStateAction<CommunityWithCompatibility[]>>,
  setEndOfData: Dispatch<SetStateAction<boolean>>
) => {
  try {
    setLoading(true)
    const from = page * PAGE_SIZE
    const to = from + PAGE_SIZE - 1

    const { data: communities, error } = await supabase
      .rpc("get_compatible_communities", { user_id: userId })
      .range(from, to)

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
  } catch (error) {
    console.log(error)
  } finally {
    setLoading(false)
  }
}

export default getCompatibleCommunities
