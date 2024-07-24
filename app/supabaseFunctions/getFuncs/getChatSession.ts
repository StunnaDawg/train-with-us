import { Dispatch, SetStateAction } from "react"
import supabase from "../../../lib/supabase"
import { ChatSession } from "../../@types/supabaseTypes"

const getChatSession = async (userId: string, user2Id: string) => {
  try {
    console.log(`user1.eq.${userId}.user2.eq.${user2Id}`)
    const { data: chatSessions, error } = await supabase
      .from("chat_sessions")
      .select("*")
      .or(
        `and(user1.eq.${userId},user2.eq.${user2Id}),and(user1.eq.${user2Id},user2.eq.${userId})`
      )

    if (error) throw error
    if (!chatSessions || chatSessions.length === 0) {
      throw new Error("No chat session found")
    }

    const chatSession: ChatSession = chatSessions[0] // Assuming you want the first matching session
    console.log("chatSession", chatSession)
    return chatSession
  } catch (error) {
    console.error("Error fetching chat session:", error)
    return null // Consider returning null or appropriate error handling
  }
}

export default getChatSession
