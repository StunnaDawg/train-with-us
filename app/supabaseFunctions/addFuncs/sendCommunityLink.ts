import supabase from "../../../lib/supabase"
import upsertChatSession from "../updateFuncs/updateChatSession"

const sendCommunityLink = async (
  userId: string,
  chatSessionId: string,
  communityId: number
) => {
  try {
    const { error } = await supabase.from("messages").insert([
      {
        message: "Check out this Community!",
        sent_at: new Date(),
        sender: userId,
        chat_session: chatSessionId,
        community_id: communityId,
        community_or_event_link: true,
      },
    ])

    if (error) {
      console.log("message error", error)
      throw error
    }

    await upsertChatSession(chatSessionId, "Check out this Event!")
  } catch (error) {
    console.log(error)
  }
}

export default sendCommunityLink
