import { FunctionsHttpError } from "@supabase/supabase-js"
import supabase from "../../lib/supabase"
import { CommunityChannel, EventChat } from "../@types/supabaseTypes"
import addNotification from "../supabaseFunctions/addFuncs/addNotification"

const sendNotification = async (
  token: string | null,
  userId: string,
  title: string,
  body: string,
  channel: EventChat,
  senderProfilePic: string | null
) => {
  try {
    console.log("Sending channel notification", channel)
    await addNotification(
      body,
      title,
      userId,
      "EventChannelNotification",
      channel,
      senderProfilePic
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
        data: { type: "event_channel_message", channel: channel },
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

const sendEventChannelNotification = async (
  senderId: string,
  senderProfilePic: string | null,
  titleWords: string,
  bodyWords: string,
  eventChannel: EventChat
) => {
  try {
    const { data: eventChannelData, error: channelError } = await supabase
      .from("events_users")
      .select("expo_push_token, user_id")
      .eq("event_chat", eventChannel.id)

    if (channelError) {
      console.error("Failed to fetch members:", channelError.message)
      throw channelError
    }

    const users = eventChannelData
      .filter((member) => member.user_id !== senderId)
      .map((member) => ({
        token: member.expo_push_token,
        userId: member.user_id,
      }))

    console.log("Sending notification to ahhhhhhh", senderId, users)

    users.forEach(async (member) => {
      await sendNotification(
        member.token,
        member.userId,
        titleWords,
        bodyWords,
        eventChannel,
        senderProfilePic
      )
    })
  } catch (error) {
    console.log(error)
  }
}

export default sendEventChannelNotification
