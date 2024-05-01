import supabase from "../../../lib/supabase"
import createNewChatSession from "./newChatSession"

const sendNewMessage = async (
  message: string,
  userId: string,
  chatSessionId: string
) => {
  try {
    console.log("sending message", message, userId, chatSessionId)
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

export default sendNewMessage
