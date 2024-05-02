import { Dispatch, SetStateAction } from "react"
import supabase from "../../../lib/supabase"

const denyRequest = async (
  setLoading: Dispatch<SetStateAction<boolean>>,
  requestId: string
) => {
  try {
    setLoading(true)
    const { data, error } = await supabase
      .from("community_requests")
      .delete()
      .eq("id", requestId)

    if (error) throw error
    console.log(data)
  } catch (error) {
    console.log(error)
  } finally {
    setLoading(false)
  }
}

export default denyRequest
