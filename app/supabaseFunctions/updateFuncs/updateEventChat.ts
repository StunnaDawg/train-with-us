import supabase from "../../../lib/supabase"

const upsertEventChatSession = async (
  eventChatId: string,
  recentMessage: string,
  eventId: number,
  senderName: string
) => {
  try {
    const { error } = await supabase
      .from("event_chat")
      .update({
        recent_message: recentMessage,
        updated_at: new Date(),
        event_id: eventId,
        recent_sender_name: senderName,
      })
      .eq("id", eventChatId)

    if (error) {
      console.log("upsertChatSession error", error)
      throw error
    }
  } catch (error) {
    console.log(error)
  }
}

export default upsertEventChatSession
