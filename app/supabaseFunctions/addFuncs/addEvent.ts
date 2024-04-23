import { Dispatch, SetStateAction } from "react"
import supabase from "../../../lib/supabase"

const addNewEvent = async (
  setLoading: Dispatch<SetStateAction<boolean>>,
  user_id: string,
  eventName: string,
  communityId: string,
  price: number,
  event_description: string
) => {
  try {
    setLoading(true)
    const { error } = await supabase.from("events").insert([
      {
        name: eventName,
        community_host: communityId,
        event_host: user_id,
        created_at: new Date(),
        price: price,
        event_description: event_description,
      },
    ])

    if (error) throw error
  } catch (error) {
    console.log(error)
  } finally {
    setLoading(false)
  }
}

export default addNewEvent
