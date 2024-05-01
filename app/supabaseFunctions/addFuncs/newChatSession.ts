import supabase from "../../../lib/supabase"
import { ChatSession } from "../../@types/supabaseTypes"

const createNewChatSession = async (user1Id: string, user2Id: string) => {
  try {
    const { data, error } = await supabase.from("chat_sessions").insert([
      {
        user1: user1Id,
        user2: user2Id,
        created_at: new Date(),
      },
    ])

    if (error) throw error
    if (!data) throw new Error("Chat session not created")
    const newSession = data[0] as ChatSession
    console.log("newSession", newSession)
    return newSession
  } catch (error) {
    console.log(error)
  }
}

export default createNewChatSession
