import { Dispatch, SetStateAction } from "react"
import supabase from "../../../lib/supabase"
import { Messages } from "../../@types/supabaseTypes"

const getChatSessionMessages = async (
  chatSessionId: string,
  setMessages: Dispatch<SetStateAction<Messages[] | null>>
) => {
  try {
    console.log("chatSessionId", chatSessionId)
    const { data: messages, error } = await supabase
      .from("messages")
      .select("*")
      .eq("chat_session", chatSessionId)
      .order("sent_at", { ascending: false })

    if (error) {
      console.error("Failed to fetch messages:", error.message)
      throw error // Or handle it according to your application's needs
    }

    console.log("got messages,", messages)
    setMessages(messages as Messages[])

    return messages
  } catch (error) {
    console.log(error)
  }
}

export default getChatSessionMessages
