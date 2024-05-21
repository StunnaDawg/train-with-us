import supabase from "../../lib/supabase"

const sendNotification = async (token: string, title: string, body: string) => {
  const { data, error } = await supabase.functions.invoke("sendNotification", {
    body: {
      token,
      titleWords: title,
      bodyWords: body,
    },
  })

  if (error) {
    console.error("Error sending notification:", error)
    return
  }

  console.log("Notification sent:", data)
}

export default sendNotification
