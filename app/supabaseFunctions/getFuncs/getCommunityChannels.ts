import { Dispatch, SetStateAction } from "react"
import supabase from "../../../lib/supabase"
import { CommunityChannel } from "../../@types/supabaseTypes"
import { set } from "date-fns"

const getCommunityChannels = async (
  communityId: number,
  setLoading: Dispatch<SetStateAction<boolean>>,
  setCommunityChannels: Dispatch<SetStateAction<CommunityChannel[] | null>>
) => {
  try {
    setLoading(true)
    const { data, error } = await supabase
      .from("community_channels")
      .select("*")
      .eq("community", communityId)

    if (error) {
      console.error("Error fetching community channels:", error.message)
      return
    }

    console.log("Community channels data", data)
    if (data) {
      setCommunityChannels([...data])
    } else {
      setCommunityChannels(null)
    }
  } catch (error) {
    console.log(error)
  } finally {
    setLoading(false)
  }
}

export default getCommunityChannels
