import { FunctionsHttpError } from "@supabase/supabase-js"
import supabase from "../../../lib/supabase"
import createNewChatSession from "./newChatSession"
import { ChatSession } from "../../@types/supabaseTypes"
import getUserToken from "../getFuncs/getUserExpoToken"

const sendNotification = async (
  token: string,
  title: string,
  body: string,
  chatSession: ChatSession
) => {
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
}

const sendNewMessage = async (
  message: string,
  userId: string,
  user2Id: string
) => {
  try {
    const userExpotoken = await getUserToken(user2Id)
    const chatSession = await createNewChatSession(userId, user2Id)
    const { error } = await supabase.from("messages").insert([
      {
        message: message,
        sent_at: new Date(),
        sender: userId,
        chat_session: chatSession?.id,
      },
    ])

    if (error) {
      console.log("Message error", error)
      throw error
    }

    const updateConnection = async (
      userIdToUpdate: string,
      otherUserId: string
    ) => {
      const { data, error: fetchError } = await supabase
        .from("profiles")
        .select("connected_users")
        .eq("id", userIdToUpdate)
        .single()

      if (fetchError) {
        console.error("Error fetching user profile:", fetchError)
        return
      }

      // Prevent duplicate entries

      const { error: updateError } = await supabase
        .from("profiles")
        .update({
          connected_users: data.connected_users
            ? [...data.connected_users, otherUserId]
            : [otherUserId],
        })
        .eq("id", userIdToUpdate)

      if (updateError) {
        console.error("Failed to update connected users", updateError)
        return
      }
    }

    // Update connections for both users
    await Promise.all([
      updateConnection(userId, user2Id),
      updateConnection(user2Id, userId),
    ])

    if (!chatSession) {
      console.error("No chat session found")
      return
    }
    await sendNotification(
      userExpotoken,
      "Connection Accepted",
      message,
      chatSession
    )
  } catch (error) {
    console.error("sendNewMessage error:", error)
  }
}

export default sendNewMessage
