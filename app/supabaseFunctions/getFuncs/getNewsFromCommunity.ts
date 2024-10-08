import { Dispatch, SetStateAction } from "react"
import supabase from "../../../lib/supabase"
import { News } from "../../@types/supabaseTypes"

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
      .order("created_at", { ascending: false })

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
