import supabase from "../../../lib/supabase"

import { FunctionsHttpError } from "@supabase/supabase-js"
import addNotification from "./addNotification"

const sendNotification = async (
  token: string,
  title: string,
  body: string,
  communityId: number,
  communityTitle: string,
  userId: string | null,
  userPicture: string | null
) => {
  try {
    if (!userId) {
      console.log("No user found for notification")
    } else {
      const notificationData = {
        community_id: communityId,
        community_title: communityTitle,
      }

      addNotification(
        body,
        title,
        userId,
        "CommunityRequest",
        notificationData,
        userPicture
      )
    }

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
        data: { communityId, communityTitle, type: "community_request_sent" },
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

const requestToJoin = async (
  community_id: number,
  community_owner_id: string | null,
  community_title: string,
  userId: string,
  userPicture: string | null,
  first_name: string,
  expo_push_token: string | null,
  showAlert: (title: string, message: string) => void
) => {
  const { data: existingRequests, error: selectError } = await supabase
    .from("community_requests")
    .select("*")
    .eq("requested_community", community_id)
    .eq("user_id", userId)

  if (selectError) throw selectError

  console.log("existingRequests", existingRequests)

  if (existingRequests.length > 0) {
    showAlert(
      "Request Already Sent",
      "You have already sent a request to join."
    )
    return
  }

  const { error: insertError } = await supabase
    .from("community_requests")
    .insert([
      {
        requested_community: community_id,
        user_id: userId,
        first_name: first_name,
        expo_push_token: expo_push_token,
      },
    ])

  if (insertError) throw insertError

  showAlert("Request Sent", "Your request to join has been sent.")

  const { error: getOwnerError, data: ownerData } = await supabase
    .from("profiles")
    .select("expo_push_token")
    .eq("id", community_owner_id)
    .single()

  if (getOwnerError) throw getOwnerError

  await sendNotification(
    ownerData?.expo_push_token,
    "Request to Join",
    first_name + " has requested to join your community.",
    community_id,
    community_title,
    community_owner_id,
    userPicture
  )
}

export default requestToJoin
