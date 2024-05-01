import supabase from "../../../lib/supabase"

const sendMessage = async (
  message: string,
  userId: string,
  chatSessionId: string
) => {
  try {
    console.log("sending message", message, userId)
    const { error } = await supabase.from("messages").insert([
      {
        message: message,
        sent_at: new Date(),
        sender: userId,
        chat_session: chatSessionId,
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

export default sendMessage
