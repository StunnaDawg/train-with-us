import { Dispatch, SetStateAction } from "react"
import supabase from "../../../lib/supabase"
import { Messages } from "../../@types/supabaseTypes"

const PAGE_SIZE = 5

const getChatSessionMessages = async (
  chatSessionId: string,
  setMessages: Dispatch<SetStateAction<Messages[] | null>>,
  page: number,
  setEndOfMessages: Dispatch<SetStateAction<boolean>>
) => {
  try {
    const from = page * PAGE_SIZE
    const to = from + PAGE_SIZE - 1
    console.log("chatSessionId", chatSessionId)
    const { data: messages, error } = await supabase
      .from("messages")
      .select("*")
      .eq("chat_session", chatSessionId)
      .order("sent_at", { ascending: false })
      .range(from, to)

    if (error) {
      console.error("Failed to fetch messages:", error.message)
      throw error // Or handle it according to your application's needs
    } else {
      if (messages.length < PAGE_SIZE) {
        setEndOfMessages(true)
      }

      setMessages((prevItems: Messages[] | null) =>
        prevItems ? [...prevItems, ...messages] : messages
      )
    }
  } catch (error) {
    console.log(error)
  }
}

export default getChatSessionMessages
