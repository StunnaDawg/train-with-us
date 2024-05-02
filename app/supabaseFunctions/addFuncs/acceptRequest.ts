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

    await supabase
      .from("community_members")
      .insert([{ user_id: userId, community_id: communityId }])
  } catch (error) {
    console.log(error)
  } finally {
    setLoading(false)
  }
}

export default acceptRequest
