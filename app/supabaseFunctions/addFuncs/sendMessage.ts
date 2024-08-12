import supabase from "../../../lib/supabase"

const sendMessage = async (
  message: string,
  image: string | null,
  userId: string,
  chatSessionId: string,
  senderProfilePic: string | null,
  senderName: string
) => {
  try {
    console.log("sending message", message, userId)
    const { error } = await supabase.from("messages").insert([
      {
        message: message,
        sent_at: new Date(),
        sender: userId,
        chat_session: chatSessionId,
        image: image,
        sender_profile_pic: senderProfilePic,
        sender_name: senderName,
      },
    ])

    if (error) {
      console.log("message error", error)
      throw error
    }
  } catch (error) {
    console.log("message didn't send", error)
  }
}

export default sendMessage
