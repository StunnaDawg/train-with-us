import { FunctionsHttpError } from "@supabase/supabase-js"
import supabase from "../../../lib/supabase"
import showAlert from "../../utilFunctions/showAlert"

const sendNotification = async (token: string, title: string, body: string) => {
  console.log("Sending notification to", token)
  const { data, error } = await supabase.functions.invoke("push", {
    body: {
      token,
      titleWords: title,
      bodyWords: body,
      data: { type: "connection_request" },
    },
  })

  if (error && error instanceof FunctionsHttpError) {
    const errorMessage = await error.context.json()
    console.log("Function returned an error", errorMessage)
  }

  console.log("Notification sent:", data)
}

const requestConnection = async (
  myName: string | null | undefined,
  message: string,
  userId: string,
  user2Id: string
) => {
  try {
    const { error } = await supabase.from("connection_requests").insert([
      {
        message: message,
        request_sent: new Date(),
        requester: userId,
        requested: user2Id,
      },
    ])

    if (error) {
      console.log("Message error", error)
      throw error
    }

    showAlert({
      title: "Request sent",
      message: "Your connection request has been sent.",
    })

    const { data: user2Data, error: user2Error } = await supabase
      .from("users")
      .select("expo_push_token")
      .eq("id", user2Id)

    if (user2Error) {
      console.log("User 2 error", user2Error)
      throw user2Error
    }

    await sendNotification(
      user2Data[0].expo_push_token,
      `Connection Request form ${myName || "Someone"}`,
      message
    )
  } catch (error) {
    console.log(error)
  } finally {
    console.log("Connection request sent")
  }
}

export default requestConnection
