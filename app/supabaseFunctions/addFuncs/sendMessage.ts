import supabase from "../../../lib/supabase"

const sendNewMessage = async (message: string, userId: string) => {
  try {
    console.log("sending message", message, userId)
    const { error } = await supabase.from("messages").insert([
      {
        message: message,
        sent_at: new Date(),
        sender: userId,
      },
    ])

    if (error) {
      console.log("message error", error)
      throw error
    }
  } catch (error) {
    console.log(error)
  }
}

export default sendNewMessage