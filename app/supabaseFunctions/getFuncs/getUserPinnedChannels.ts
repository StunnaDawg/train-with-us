import { Dispatch, SetStateAction } from "react"
import supabase from "../../../lib/supabase"
import { CommunityChannel } from "../../@types/supabaseTypes"

const getUserPinnedChannels = async (
  setLoading: Dispatch<SetStateAction<boolean>>,
  userId: string,
  setChannels: Dispatch<SetStateAction<CommunityChannel[] | null>>
) => {
  try {
    setLoading(true)

    // Fetch user profile to get pinned channels array
    const { data: profileData, error: profileError } = await supabase
      .from("profiles")
      .select("pinned_channels")
      .eq("id", userId)
      .single() // Assume there's one profile per user ID

    if (profileError || !profileData) {
      console.error(
        "Error fetching user pinned channels:",
        profileError?.message
      )
      return
    }

    if (profileData.pinned_channels && profileData.pinned_channels.length > 0) {
      // Fetch all channels at once if there are any pinned channels
      const { data: channelsData, error: channelsError } = await supabase
        .from("community_channels")
        .select("*")
        .in("id", profileData.pinned_channels) // Fetch all pinned channels in one go

      if (channelsError) {
        console.error("Error fetching channel data:", channelsError.message)
        return
      }

      // Set the channels fetched from the database
      setChannels(channelsData)
    } else {
      // No pinned channels or empty array
      setChannels(null)
    }
  } catch (error) {
    console.error("An error occurred:", error)
  } finally {
    setLoading(false)
  }
}

export default getUserPinnedChannels
