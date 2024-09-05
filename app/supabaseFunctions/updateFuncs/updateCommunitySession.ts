import supabase from "../../../lib/supabase"

const upsertCommunitySession = async (
  channelId: string,
  name: string,
  message: string
) => {
  try {
    const { error: updateError } = await supabase
      .from("community_channels")
      .update({
        recent_message: message,
        updated_at: new Date(),
        recent_message_sender: name,
      })
      .eq("id", channelId)

    if (updateError) {
      console.error("community session error", updateError)
      throw updateError
    }
  } catch (error) {
    console.log(error)
  }
}

export default upsertCommunitySession
