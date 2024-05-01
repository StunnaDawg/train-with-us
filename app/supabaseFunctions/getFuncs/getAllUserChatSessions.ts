import { Dispatch, SetStateAction } from "react"
import supabase from "../../../lib/supabase"
import { ChatSession } from "../../@types/supabaseTypes"

const getAllUserChatSessions = async (
  userId: string,
  setChatSessions: Dispatch<SetStateAction<ChatSession[] | null>>
) => {
  try {
    const { data: chatSessions, error } = await supabase
      .from("chat_sessions")
      .select("*")
      .or(`user1.eq.${userId}` || `user2.eq.${userId}`)

    if (error) throw error
    if (!chatSessions || chatSessions.length === 0) {
      throw new Error("No chat session found")
    }
    const chatSession: ChatSession[] = chatSessions

    if (!chatSession) {
      setChatSessions(null)
      throw new Error("No chat session found")
    }
    setChatSessions(chatSession)
  } catch (error) {
    console.error("Error fetching chat session:", error)
    return null // Consider returning null or appropriate error handling
  }
}

export default getAllUserChatSessions
