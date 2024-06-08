import supabase from "../../lib/supabase"
import sendNotification from "./sendNotification"

const sendChannelNotification = async (
  communityId: number,
  titleWords: string,
  bodyWords: string
) => {
  const { data, error } = await supabase
    .from("community_members")
    .select("expo_push_token")
    .eq("community_id", communityId)

  if (error) throw error

  const tokens = data.map((member) => member.expo_push_token)

  console.log("Sending notification to", tokens)

  tokens.forEach(async (token) => {
    await sendNotification(token, titleWords, bodyWords)
  })
}

export default sendChannelNotification
