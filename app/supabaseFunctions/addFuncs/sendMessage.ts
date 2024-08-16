import supabase from "../../../lib/supabase"
import { ChatSession } from "../../@types/supabaseTypes"
import addNotification from "./addNotification"

const sendMessage = async (
  message: string,
  image: string | null,
  userId: string,
  chatSession: ChatSession,
  senderProfilePic: string | null,
  senderName: string,
  recieverId: string
) => {
  try {
    console.log("sending message", message, userId)
    const { error } = await supabase.from("messages").insert([
      {
        message: message,
        sent_at: new Date(),
        sender: userId,
        chat_session: chatSession.id,
        image: image,
        sender_profile_pic: senderProfilePic,
        sender_name: senderName,
      },
    ])

    if (error) {
      console.log("message error", error)
      throw error
    }
    const navigation_path = `MessagingScreen`
    const title = `New Message from ${senderName}`

    await addNotification(
      message,
      navigation_path,
      title,
      recieverId,
      "MessageNotification",
      chatSession,
      senderProfilePic
    )
  } catch (error) {
    console.log("message didn't send", error)
  }
}

export default sendMessage
