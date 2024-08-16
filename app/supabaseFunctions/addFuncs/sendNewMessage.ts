import { FunctionsHttpError } from "@supabase/supabase-js"
import supabase from "../../../lib/supabase"
import createNewChatSession from "./newChatSession"
import { ChatSession } from "../../@types/supabaseTypes"
import getUserToken from "../getFuncs/getUserExpoToken"
import addNotification from "./addNotification"

const sendNotification = async (
  token: string,
  title: string,
  body: string,
  chatSession: ChatSession,
  userId: string,
  userImage: string | null
) => {
  try {
    await addNotification(
      body,
      title,
      userId,
      "ConnectionAccepted",
      chatSession,
      userImage
    )
    if (!token) {
      console.log("No token found for user")
      return
    }
    console.log("Sending notification to", token)
    const { data, error } = await supabase.functions.invoke("push", {
      body: {
        token,
        titleWords: title,
        bodyWords: body,
        data: { chatSession, type: "connection_accepted" },
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

const sendNewMessage = async (
  message: string,
  myName: string,
  userId: string,
  user2Id: string,
  user2Photo: string | null
) => {
  try {
    const userExpotoken = await getUserToken(user2Id)
    const chatSession = await createNewChatSession(userId, user2Id)
    const { error } = await supabase.from("messages").insert([
      {
        message: message,
        sent_at: new Date(),
        sender: user2Id,
        chat_session: chatSession?.id,
      },
    ])

    if (error) {
      console.log("Message error", error)
      throw error
    }

    if (!chatSession) {
      console.error("No chat session found")
      return
    }
    await sendNotification(
      userExpotoken,
      `Connection Accepted from ${myName}, Chat Now!`,
      message,
      chatSession,
      user2Id,
      user2Photo
    )
  } catch (error) {
    console.error("sendNewMessage error:", error)
  }
}

export default sendNewMessage
