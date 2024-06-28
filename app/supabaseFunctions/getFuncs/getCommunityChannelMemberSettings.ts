import { Dispatch, SetStateAction } from "react"
import supabase from "../../../lib/supabase"
import {
  CommunityChannel,
  CommunityMembership,
} from "../../@types/supabaseTypes"

const getSingleChannelSettings = async (
  communityId: number,
  channelId: string,
  userId: string,
  setLoading: Dispatch<SetStateAction<boolean>>,
  setSettings: Dispatch<SetStateAction<CommunityMembership | null>>
) => {
  setLoading(true)
  try {
    const { data, error } = await supabase
      .from("community_channel_membership")
      .select("*")
      .eq("channel_id", channelId)
      .eq("community_id", communityId)
      .eq("user_id", userId)

    if (error) {
      console.error("Error fetching community channels:", error.message)
      return
    }

    console.log("Community channels data", data)
    if (data) {
      setSettings(data[0])
    } else {
      setSettings(null)
    }
  } catch (error) {
    console.log(error)
  } finally {
    setLoading(false)
  }
}

export default getSingleChannelSettings
