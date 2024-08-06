import supabase from "../../../lib/supabase"
import { CommunityChannel } from "../../@types/supabaseTypes"
import sendPrivateChannelNotification from "../../utilFunctions/sendPrivateChannelNotification"

const sendPrivateChannelMessage = async (
  message: string,
  userId: string,
  channelId: string,
  name: string,
  communityId: number,
  title: string | null,
  channel: CommunityChannel
) => {
  try {
    const notificationTtle =
      `New Message in ${title}` || "New Message in Channel"
    console.log("sending message", message, userId)
    const { error } = await supabase.from("community_channel_messages").insert([
      {
        mesage: message,
        sent_at: new Date(),
        sender_id: userId,
        channel_id: channelId,
        sender_name: name,
      },
    ])

    if (error) {
      console.log("message error", error)
      throw error
    }

    console.log("sending message", message, userId)
    const { error: updateError } = await supabase
      .from("community_channels")
      .update({
        recent_message: message, // Only the fields to update
        updated_at: new Date(),
        recent_message_sender: name,
      })
      .eq("id", channelId)

    if (updateError) {
      console.error("message error", updateError)
      throw error
    }

    await sendPrivateChannelNotification(
      communityId,
      notificationTtle,
      message,
      channel
    )
  } catch (error) {
    console.log(error)
  }
}

export default sendPrivateChannelMessage
