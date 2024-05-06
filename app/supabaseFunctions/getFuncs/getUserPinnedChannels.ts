import { Dispatch, SetStateAction } from "react"
import supabase from "../../../lib/supabase"
import { CommunityChannel } from "../../@types/supabaseTypes"
import { da } from "date-fns/locale"

const getUserPinnedChannels = async (
  setLoading: Dispatch<SetStateAction<boolean>>,
  userId: string,
  setChannels: Dispatch<SetStateAction<CommunityChannel[] | null>>
) => {
  try {
    setLoading(true)
    const { data, error } = await supabase
      .from("profiles")
      .select("pinned_channels")
      .eq("id", userId)

    if (error) {
      console.error("Error fetching user pinned channels:", error.message)
      return null
    }

    console.log("Pinned channels data", data)

    for (let i = 0; i < data.length; i++) {
      const { data: channelData, error: channelError } = await supabase
        .from("community_channels")
        .select("*")
        .eq("id", data[i].pinned_channels[0])

      if (channelError) {
        console.error("Error fetching channel data:", channelError.message)
        return null
      }

      setChannels((prev: CommunityChannel[] | null) => [
        ...(prev || []),
        channelData[0],
      ])

      console.log("Channel data", channelData)
    }
  } catch (error) {
    console.log(error)
  } finally {
    setLoading(false)
  }
}

export default getUserPinnedChannels
