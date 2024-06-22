import { Dispatch, SetStateAction } from "react"
import supabase from "../../../lib/supabase"
import { FunctionsHttpError } from "@supabase/supabase-js"

const sendNotification = async (token: string, title: string, body: string) => {
  console.log("Sending notification to", token)
  const { data, error } = await supabase.functions.invoke("push", {
    body: {
      token,
      titleWords: title,
      bodyWords: body,
      data: { type: "request_denied" },
    },
  })

  if (error && error instanceof FunctionsHttpError) {
    const errorMessage = await error.context.json()
    console.log("Function returned an error", errorMessage)
  }

  console.log("Notification sent:", data)
}

const denyRequest = async (
  setLoading: Dispatch<SetStateAction<boolean>>,
  requestId: string,
  expo_push_token: string | null,
  community_title: string
) => {
  try {
    setLoading(true)
    const { data, error } = await supabase
      .from("community_requests")
      .delete()
      .eq("id", requestId)

    if (error) throw error

    if (expo_push_token) {
      await sendNotification(
        expo_push_token,
        "Request Denied",
        "Your request to join has been denied by" + community_title
      )
    }
  } catch (error) {
    console.log(error)
  } finally {
    setLoading(false)
  }
}

export default denyRequest
