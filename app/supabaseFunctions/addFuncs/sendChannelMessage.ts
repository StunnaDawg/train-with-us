import { id } from "date-fns/locale"
import supabase from "../../../lib/supabase"
import sendChannelNotification from "../../utilFunctions/sendChannelNotifcation"

const sendChannelMessage = async (
  message: string,
  userId: string,
  channelId: string,
  name: string,
  communityId: number,
  title: string | null
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

    // const { error: insertError } = await supabase
    //   .from("community_channel")
    //   .upsert([
    //     {
    //       id: channelId,
    //       recent_message: message,
    //     },
    //   ])

    // if (insertError) {
    //   console.log("message error", error)
    //   throw error
    // }

    sendChannelNotification(communityId, notificationTtle, message)
  } catch (error) {
    console.log(error)
  }
}

export default sendChannelMessage
