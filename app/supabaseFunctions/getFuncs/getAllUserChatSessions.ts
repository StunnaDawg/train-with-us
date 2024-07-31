import { Dispatch, SetStateAction } from "react"
import supabase from "../../../lib/supabase"
import { ChatSession } from "../../@types/supabaseTypes"

const getAllUserChatSessions = async (
  userId: string,
  setChatSessions: Dispatch<SetStateAction<ChatSession[] | null>>
): Promise<void> => {
  try {
    const { data: chatSessions, error } = await supabase
      .from("chat_sessions")
      .select("*")
      .or(`user1.eq.${userId},user2.eq.${userId}`)
      .order("updated_at", { ascending: false })

    if (error) throw error

    const chatSession: ChatSession[] = chatSessions

    if (!chatSession) {
      setChatSessions(null)
      throw new Error("No chat session found")
    }
    setChatSessions(chatSession)
  } catch (error) {
    console.error("Error fetching chat session:", error)
    setChatSessions(null)
  }
}

export default getAllUserChatSessions
