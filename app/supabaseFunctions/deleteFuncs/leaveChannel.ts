import { Dispatch, SetStateAction } from "react"
import supabase from "../../../lib/supabase"
import showAlert from "../../utilFunctions/showAlert"

const leaveChannel = async (
  setLoading: Dispatch<SetStateAction<boolean>>,
  channelId: string,
  userId: string
) => {
  setLoading(true)
  try {
    const { error } = await supabase
      .from("community_channel_membership")
      .delete()
      .match({ user_id: userId, channel_id: channelId })

    if (error) {
      showAlert({
        title: "Error leaving channel",
        message: "There was an error leaving the channel. Please try again.",
      })
      console.error("Error leaving channel:", error)
      return
    }

    showAlert({
      title: "Channel left",
      message: "You have successfully left the channel.",
    })
  } catch (error) {
    console.error("Exception when trying to leave channel:", error)
  } finally {
    setLoading(false)
  }
}

export default leaveChannel
