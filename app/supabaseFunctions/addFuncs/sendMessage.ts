import { Dispatch, SetStateAction } from "react"
import supabase from "../../../lib/supabase"
import { ChatSession } from "../../@types/supabaseTypes"
import { cacheStorage } from "../../utilFunctions/mmkvStorage"
import sendNotification from "../../utilFunctions/sendNotification"
import addNotification from "./addNotification"

const sendMessage = async (
  message: string,
  image: string | null,
  userId: string,
  chatSession: ChatSession,
  senderProfilePic: string | null,
  senderName: string,
  recieverId: string,
  usersPushToken: string | null | undefined,
  setLoadingSentMessage: Dispatch<SetStateAction<boolean>>,
  setImage: Dispatch<SetStateAction<string>>,
  setMessageToSend: Dispatch<SetStateAction<string>>
) => {
  try {
    setLoadingSentMessage(true)
    const { error } = await supabase.from("messages").insert([
      {
        message: message,
        sent_at: new Date(),
        sender: userId,
        chat_session: chatSession.id,
        image: image,

        sender_name: senderName,
      },
    ])

    if (error) {
      console.log("message error", error)
      throw error
    }
    const title = `New Message from ${senderName}`

    if (image) {
      await addNotification(
        "Sent an Image",
        title,
        recieverId,
        "MessageNotification",
        chatSession,
        senderProfilePic
      )
    } else {
      await addNotification(
        message,
        title,
        recieverId,
        "MessageNotification",
        chatSession,
        senderProfilePic
      )
    }

    if (!usersPushToken) return
    sendNotification(usersPushToken, title, message, chatSession)
  } catch (error) {
    console.log("message didn't send", error)
  } finally {
    setLoadingSentMessage(false)
    setImage("")
    setMessageToSend("")
  }
}

export default sendMessage
