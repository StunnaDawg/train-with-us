import { Dispatch, SetStateAction } from "react"
import supabase from "../../../lib/supabase"
import { FunctionsHttpError } from "@supabase/supabase-js"
import { Communities } from "../../@types/supabaseTypes"
import addNotification from "./addNotification"

const sendNotification = async (
  token: string,
  title: string,
  body: string,
  community: Communities,
  userId: string | null
) => {
  try {
    if (!userId) {
      console.log("No user found for notification")
    } else {
      await addNotification(
        body,
        title,
        userId,
        "CommunityRequestAccepted",
        community,
        null
      )
    }

    console.log("Sending notification to", token)
    const { data, error } = await supabase.functions.invoke("push", {
      body: {
        token,
        titleWords: title,
        bodyWords: body,
        data: { community, type: "request_accepted" },
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

const acceptRequest = async (
  setLoading: Dispatch<SetStateAction<boolean>>,
  userId: string,
  expoPushToken: string | null,
  community: Communities,
  requestId: string
) => {
  try {
    setLoading(true)
    const { error } = await supabase
      .from("community_requests")
      .delete()
      .eq("id", requestId)

    if (error) throw error

    const { error: insertError } = await supabase
      .from("community_members")
      .insert([
        {
          user_id: userId,
          community_id: community.id,
          expo_push_token: expoPushToken,
        },
      ])

    if (insertError) throw insertError

    const { data: communityData, error: fetchError } = await supabase
      .from("communities")
      .select("member_count")
      .eq("id", community.id)
      .single()

    if (fetchError) {
      throw fetchError
    } else {
      const newMemberCount = communityData.member_count + 1

      const { error: updateError } = await supabase
        .from("communities")
        .update({ member_count: newMemberCount })
        .eq("id", community.id)

      if (updateError) {
        console.error("Error updating member count:", updateError)
      } else {
        console.log("Member count updated successfully")
      }

      if (expoPushToken)
        await sendNotification(
          expoPushToken,
          "Request Accepted",
          "Your request to join has been accepted by " +
            community.community_title,
          community,
          userId
        )
    }
  } catch (error) {
    console.log(error)
  } finally {
    setLoading(false)
  }
}

export default acceptRequest
