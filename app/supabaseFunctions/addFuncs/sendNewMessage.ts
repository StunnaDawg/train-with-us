import supabase from "../../../lib/supabase"
import getChatSession from "../getFuncs/getChatSession"
import createNewChatSession from "./newChatSession"

const sendNewMessage = async (
  message: string,
  userId: string,
  user2Id: string
) => {
  try {
    const chatSessionId = await createNewChatSession(userId, user2Id)
    const { error } = await supabase.from("messages").insert([
      {
        message: message,
        sent_at: new Date(),
        sender: userId,
        chat_session: chatSessionId?.id,
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
