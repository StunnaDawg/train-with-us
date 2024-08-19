import { FunctionsHttpError } from "@supabase/supabase-js"
import supabase from "../../lib/supabase"
import { CommunityChannel } from "../@types/supabaseTypes"
import addNotification from "../supabaseFunctions/addFuncs/addNotification"

const sendNotification = async (
  token: string | null,
  userId: string,
  title: string,
  body: string,
  channel: CommunityChannel
) => {
  try {
    console.log("Sending channel notification", channel)
    await addNotification(
      body,
      title,
      userId,
      "ChannelNotification",
      channel,
      null
    )

    if (!token) {
      console.log("No token found for user", userId)
      return
    }
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
  } catch (error) {
    console.error("Failed to send notification:", error)
  }
}

const sendChannelNotification = async (
  communityId: number,
  senderId: string,
  senderToken: string | null,
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
          .select("expo_push_token, user_id")
          .eq("community_id", communityId)
          .eq("channel_id", channel.id)

      if (privateChannelError) {
        console.error("Failed to fetch members:", privateChannelError.message)
        throw privateChannelError
      }

      const users = privateChannelData
        .filter((member) => member.user_id !== senderId)
        .map((member) => ({
          token: member.expo_push_token,
          userId: member.user_id,
        }))

      console.log("Sending notification to ahhhhhhh", users)

      users.forEach(async (member) => {
        await sendNotification(
          member.token,
          member.userId,
          titleWords,
          bodyWords,
          channel
        )
      })
    } else {
      const { data: channelData, error: channelError } = await supabase
        .from("community_members")
        .select("expo_push_token, user_id")
        .eq("community_id", communityId)

      if (channelError) {
        console.error("Failed to fetch members:", channelError.message)
        throw channelError
      }

      const users = channelData
        .filter((member) => member.user_id !== senderId)
        .map((member) => ({
          token: member.expo_push_token,
          userId: member.user_id,
        }))

      users.forEach(async (member) => {
        await sendNotification(
          member.token,
          member.userId,
          titleWords,
          bodyWords,
          channel
        )
      })
    }
  } catch (error) {
    console.log(error)
  }
}

export default sendChannelNotification
