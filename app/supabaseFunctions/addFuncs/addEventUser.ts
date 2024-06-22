import supabase from "../../../lib/supabase"
import { FunctionsHttpError } from "@supabase/supabase-js"

const sendNotification = async (
  token: string,
  title: string,
  body: string,
  communityId: number
) => {
  console.log("Sending notification to", token)
  const { data, error } = await supabase.functions.invoke("push", {
    body: {
      token,
      titleWords: title,
      bodyWords: body,
      data: { communityId, type: "event_joined" },
    },
  })

  if (error && error instanceof FunctionsHttpError) {
    const errorMessage = await error.context.json()
    console.log("Function returned an error", errorMessage)
  }

  console.log("Notification sent:", data)
}

const addEventUser = async (
  eventId: number,
  expo_push_token: string | null | undefined,
  userId: string,
  first_name: string,
  last_name: string
) => {
  try {
    const { error } = await supabase.from("events_users").insert([
      {
        event_id: eventId,
        user_id: userId,
        first_name: first_name,
        last_name: last_name,
      },
    ])
    if (error) throw error

    if (!expo_push_token) return
    sendNotification(
      expo_push_token,
      "Event Joined",
      `${first_name} has joined your event`,
      eventId
    )
  } catch (error) {
    console.log(error)
  }
}

export default addEventUser
