import { FunctionsHttpError } from "@supabase/supabase-js"
import supabase from "../../lib/supabase"
import { CommunityChannel } from "../@types/supabaseTypes"

const sendNotification = async (
  token: string,
  title: string,
  body: string,
  channel: CommunityChannel
) => {
  console.log("Sending notification in private channel to", token)
  const { error } = await supabase.functions.invoke("push", {
    body: {
      token,
      titleWords: title,
      bodyWords: body,
      data: { type: "channel", channel: channel },
    },
  })

  if (error && error instanceof FunctionsHttpError) {
    const errorMessage = await error.context.json()
    console.log(
      "private channel notification Function returned an error",
      errorMessage
    )
  }
}

const gettingPrivateChannelMembers = async (
  communityId: number,
  titleWords: string,
  bodyWords: string,
  channel: CommunityChannel
) => {
  const { data, error } = await supabase
    .from("community_channel_membership")
    .select("expo_push_token")
    .eq("community_id", communityId)
    .eq("channel_id", channel.id)

  if (error) {
    console.error("Failed to fetch members:", error.message)
    throw error
  }

  const tokens = data
    .filter((member) => member.expo_push_token !== null)
    .map((member) => member.expo_push_token)

  tokens.forEach(async (token) => {
    await sendNotification(token, titleWords, bodyWords, channel)
  })
}

export default gettingPrivateChannelMembers
