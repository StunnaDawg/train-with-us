import supabase from "../../../lib/supabase"
import { FunctionsHttpError } from "@supabase/supabase-js"
import showAlert from "../../utilFunctions/showAlert"

const sendNotification = async (
  token: string,
  title: string,
  body: string,
  eventId: number
) => {
  console.log("Sending notification to", token)
  const { data, error } = await supabase.functions.invoke("push", {
    body: {
      token,
      titleWords: title,
      bodyWords: body,
      data: { eventId: eventId, type: "event_joined" },
    },
  })

  console.log("Sending notification with data:", {
    token,
    titleWords: title,
    bodyWords: body,
    data: { eventId: eventId, type: "event_joined" },
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
    if (error) {
      showAlert({
        title: "Error",
        message: error.message,
      })
      throw error
    } else {
      showAlert({
        title: "Success",
        message: "You have successfully joined this event",
      })
    }

    if (!expo_push_token) return
    console.log("Sending notification to", expo_push_token)
    sendNotification(
      expo_push_token,
      "Event Joined",
      `${first_name} has joined your event`,
      eventId
    )
  } catch (error) {
    console.log(error)
  } finally {
    return true
  }
}

export default addEventUser
