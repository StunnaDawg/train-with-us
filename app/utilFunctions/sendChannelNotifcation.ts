import { FunctionsHttpError } from "@supabase/supabase-js"
import supabase from "../../lib/supabase"
import { CommunityChannel } from "../@types/supabaseTypes"

const sendNotification = async (
  token: string,
  title: string,
  body: string,
  channel: CommunityChannel
) => {
  console.log("Sending notification to", token)
  const { data, error } = await supabase.functions.invoke("push", {
    body: {
      token,
      titleWords: title,
      bodyWords: body,
      data: { type: "channel_message", channel: channel },
    },
  })

  if (error && error instanceof FunctionsHttpError) {
    const errorMessage = await error.context.json()
    console.log("Function returned an error", errorMessage)
  }

  console.log("Notification sent:", data)
}

const sendChannelNotification = async (
  communityId: number,
  sendersToken: string | null,
  titleWords: string,
  bodyWords: string,
  channel: CommunityChannel,
  privateChannel: boolean
) => {
  try {
    if (privateChannel) {
      const { data: privateChannelData, error: privateChannelError } =
        await supabase
          .from("community_channel_membership")
          .select("expo_push_token")
          .eq("community_id", communityId)
          .eq("channel_id", channel.id)

      if (privateChannelError) {
        console.error("Failed to fetch members:", privateChannelError.message)
        throw privateChannelError
      }

      const tokens = privateChannelData
        .filter(
          (member) =>
            member.expo_push_token !== null &&
            member.expo_push_token !== sendersToken
        )
        .map((member) => member.expo_push_token)

      tokens.forEach(async (token) => {
        await sendNotification(token, titleWords, bodyWords, channel)
      })
    } else {
      const { data: channelData, error: channelError } = await supabase
        .from("community_members")
        .select("expo_push_token")
        .eq("community_id", communityId)

      if (channelError) {
        console.error("Failed to fetch members:", channelError.message)
        throw channelError
      }

      const tokens = channelData
        .filter(
          (member) =>
            member.expo_push_token !== null &&
            member.expo_push_token !== sendersToken
        )
        .map((member) => member.expo_push_token)

      console.log("Sending notification to", tokens)

      tokens.forEach(async (token) => {
        await sendNotification(token, titleWords, bodyWords, channel)
      })
    }
  } catch (error) {
    console.log(error)
  }
}

export default sendChannelNotification
