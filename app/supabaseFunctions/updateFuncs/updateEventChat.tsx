import supabase from "../../../lib/supabase"

const upsertEventChatSession = async (
  eventChatId: string,
  recentMessage: string
) => {
  try {
    const { error } = await supabase.from("event_chat").upsert([
      {
        id: eventChatId,
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

export default upsertEventChatSession
