import { Dispatch, SetStateAction } from "react"
import supabase from "../../../lib/supabase"
import showAlert from "../../utilFunctions/showAlert"

const joinChannel = async (
  setLoading: Dispatch<SetStateAction<boolean>>,
  channelId: string,
  userId: string,
  communityId: number,
  pushToken: string,
  channelName: string
) => {
  setLoading(true)
  console.log("Joining channel", channelId, userId, communityId, pushToken)
  try {
    const { data: userProfile, error: profileError } = await supabase
      .from("profiles")
      .select("id")
      .eq("id", userId)
      .single()

    if (profileError || !userProfile) {
      console.error("User ID does not exist in profiles table.")
      return
    }

    const { error } = await supabase.from("community_memberships").insert([
      {
        user_id: userId,
        channel_id: channelId,
        community_id: communityId,
        expo_push_token: pushToken,
      },
    ])

    if (error) {
      showAlert({
        title: "Error joining channel",
        message: "There was an error joining the channel. Please try again.",
      })
      throw error
    }
    showAlert({
      title: "Channel joined",
      message: "You have successfully joined the channel",
    })
  } catch (error) {
    console.log(error)
  } finally {
    setLoading(false)
  }
}

export default joinChannel
