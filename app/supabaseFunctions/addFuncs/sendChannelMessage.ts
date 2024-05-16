import supabase from "../../../lib/supabase"

const sendChannelMessage = async (
  message: string,
  userId: string,
  channelId: string
) => {
  try {
    console.log("sending message", message, userId)
    const { error } = await supabase.from("community_channel_messages").insert([
      {
        mesage: message,
        sent_at: new Date(),
        sender_id: userId,
        channel_id: channelId,
      },
    ])

    if (error) {
      console.log("message error", error)
      throw error
    }
  } catch (error) {
    console.log(error)
  }
}

export default sendChannelMessage
