import supabase from "../../../lib/supabase"
import sendChannelNotification from "../../utilFunctions/sendChannelNotifcation"
import { CommunityChannel } from "../../@types/supabaseTypes"

const sendChannelMessage = async (
  message: string,
  image: string | null,
  sendersToken: string | null,
  userId: string,
  channelId: string,
  name: string,
  communityId: number,
  title: string | null,
  channel: CommunityChannel,
  senderProfilePic: string | null
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
        image: image,
        sender_profile_pic: senderProfilePic,
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

    sendChannelNotification(
      communityId,
      sendersToken,
      notificationTtle,
      message,
      channel
    )
  } catch (error) {
    console.log(error)
  }
}

export default sendChannelMessage
