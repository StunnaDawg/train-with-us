import { Dispatch, SetStateAction } from "react"
import supabase from "../../../lib/supabase"

const acceptRequest = async (
  setLoading: Dispatch<SetStateAction<boolean>>,
  userId: string,
  communityId: number,
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
      .insert([{ user_id: userId, community_id: communityId }])

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
    }
  } catch (error) {
    console.log(error)
  } finally {
    setLoading(false)
  }
}

export default acceptRequest
