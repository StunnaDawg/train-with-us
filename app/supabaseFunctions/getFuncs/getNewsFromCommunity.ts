import { Dispatch, SetStateAction } from "react"
import supabase from "../../../lib/supabase"
import { News } from "../../@types/supabaseTypes"
import { fi } from "date-fns/locale"

const getNewsFromCommunity = async (
  setLoading: Dispatch<SetStateAction<boolean>>,
  communityId: number,
  setNewsArray: Dispatch<SetStateAction<News[] | null>>
) => {
  try {
    setLoading(true)
    const { data, error } = await supabase
      .from("news_posts")
      .select("*")
      .eq("community_id", communityId)

    if (error) {
      console.error("Error fetching community news:", error.message)
      return
    }

    console.log("Community news data", data)
    setNewsArray(data as News[])
    return data as News[]
  } catch (error) {
    console.log(error)
  } finally {
    setLoading(false)
  }
}

export default getNewsFromCommunity
