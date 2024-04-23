import { Dispatch, SetStateAction } from "react"
import supabase from "../../../lib/supabase"

const addNewCommunity = async (
  setLoading: Dispatch<SetStateAction<boolean>>,
  userId: string,
  targetUserId: string,
  interactionChoice: string
) => {
  try {
    setLoading(true)
    const { error } = await supabase.from("connection_interaction").insert([
      {
        user_interaction: userId,
        interaction_date: new Date(),
        interaction_type: interactionChoice,
        target_interaction: targetUserId,
      },
    ])

    if (error) throw error
  } catch (error) {
    console.log(error)
  } finally {
    setLoading(false)
  }
}

export default addNewCommunity
