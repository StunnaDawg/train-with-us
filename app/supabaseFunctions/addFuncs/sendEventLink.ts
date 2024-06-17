import supabase from "../../../lib/supabase"

const sendEventLink = async (
  userId: string,
  chatSessionId: string,
  eventId: number
) => {
  try {
    const { error } = await supabase.from("messages").insert([
      {
        message: "Check out this Event!",
        sent_at: new Date(),
        sender: userId,
        chat_session: chatSessionId,
        eventId: eventId,
        community_or_event_link: true,
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

export default sendEventLink
