import supabase from "../../../lib/supabase"
const sendPrivateChannelMessage = async (
  message: string,
  image: string | null,
  userId: string,
  channelId: string,
  name: string,
  senderProfilePic: string | null
) => {
  try {
    console.log("trying to sending message", message, userId)
    const { data, error } = await supabase
      .from("community_channel_messages")
      .insert([
        {
          channel_id: channelId,
          message: message,
          sent_at: new Date(),
          sender_id: userId,
          sender_name: name,
          image: image,
          sender_profile_pic: senderProfilePic,
        },
      ])
    console.log("Insert Response:", data, error)

    if (error) {
      console.log("private message sending error", error)
      throw error
    }
  } catch (error) {
    console.log("sending private channel message error", error)
  }
}

export default sendPrivateChannelMessage
