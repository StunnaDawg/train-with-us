import supabase from "../../../lib/supabase"

const upsertCommunitySession = async (
  channelId: string,
  recentMessage: string
) => {
  try {
    const { error } = await supabase.from("community_channels").upsert([
      {
        id: channelId,
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

export default upsertCommunitySession
