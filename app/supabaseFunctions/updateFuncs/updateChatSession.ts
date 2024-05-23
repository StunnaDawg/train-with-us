import supabase from "../../../lib/supabase"

const upsertChatSession = async (
  chatSessionId: string,
  recentMessage: string
) => {
  try {
    const { data, error } = await supabase
      .from("chat_sessions")
      .upsert([
        {
          id: chatSessionId,
          recent_message: recentMessage,
          updated_at: new Date(),
        },
      ])

    if (error) {
      console.log("upsertChatSession error", error)
      throw error
    }
  } catch (error) {
    console.log(error)
  }
}

export default upsertChatSession
