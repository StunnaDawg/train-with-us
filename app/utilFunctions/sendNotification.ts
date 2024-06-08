import { FunctionsHttpError } from "@supabase/supabase-js"
import supabase from "../../lib/supabase"

const sendNotification = async (token: string, title: string, body: string) => {
  console.log("Sending notification to", token)
  const { data, error } = await supabase.functions.invoke("push", {
    body: {
      token,
      titleWords: title,
      bodyWords: body,
    },
  })

  if (error && error instanceof FunctionsHttpError) {
    const errorMessage = await error.context.json()
    console.log("Function returned an error", errorMessage)
  }

  console.log("Notification sent:", data)
}

export default sendNotification
