import { Dispatch, SetStateAction } from "react"
import supabase from "../../../lib/supabase"
import { FunctionsHttpError } from "@supabase/supabase-js"

const sendNotification = async (
  token: string,
  title: string,
  body: string,
  communityId: number
) => {
  console.log("Sending notification to", token)
  const { data, error } = await supabase.functions.invoke("push", {
    body: {
      token,
      titleWords: title,
      bodyWords: body,
      data: { communityId, type: "request_accepted" },
    },
  })

  if (error && error instanceof FunctionsHttpError) {
    const errorMessage = await error.context.json()
    console.log("Function returned an error", errorMessage)
  }

  console.log("Notification sent:", data)
}

const acceptRequest = async (
  setLoading: Dispatch<SetStateAction<boolean>>,
  userId: string,
  expoPushToken: string | null,
  communityId: number,
  requestId: string,
  communityTitle: string
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
          community_id: communityId,
          expo_push_token: expoPushToken,
        },
      ])

    if (insertError) throw insertError

    const { data: communityData, error: fetchError } = await supabase
      .from("communities")
      .select("member_count")
      .eq("id", communityId)
      .single()

    if (fetchError) {
      throw fetchError
    } else {
      const newMemberCount = communityData.member_count + 1

      const { error: updateError } = await supabase
        .from("communities")
        .update({ member_count: newMemberCount })
        .eq("id", communityId)

      if (updateError) {
        console.error("Error updating member count:", updateError)
      } else {
        console.log("Member count updated successfully")
      }

      if (expoPushToken)
        await sendNotification(
          expoPushToken,
          "Request Accepted",
          "Your request to join has been accepted by " + communityTitle,
          communityId
        )
    }
  } catch (error) {
    console.log(error)
  } finally {
    setLoading(false)
  }
}

export default acceptRequest
