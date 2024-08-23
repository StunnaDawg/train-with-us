import { FunctionsHttpError } from "@supabase/supabase-js"
import supabase from "../../../lib/supabase"
import showAlert from "../../utilFunctions/showAlert"
import getUserToken from "../getFuncs/getUserExpoToken"
import addNotification from "./addNotification"

const sendNotification = async (
  token: string,
  title: string,
  body: string,
  userId: string,
  senderProfilePic: string | null
) => {
  try {
    await addNotification(
      body,
      title,
      userId,
      "ConnectionRequest",
      null,
      senderProfilePic
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
        data: { type: "connection_request" },
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

const requestConnection = async (
  myName: string | null | undefined,
  message: string,
  userId: string,
  user2Id: string,
  user2ProfilePic: string | null
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

    const expoPushToken = await getUserToken(user2Id)

    await sendNotification(
      expoPushToken,
      `Connection Request from ${myName || "Someone"}`,
      message,
      user2Id,
      user2ProfilePic
    )
  } catch (error) {
    console.log(error)
  } finally {
    console.log("Connection request sent")
  }
}

export default requestConnection
