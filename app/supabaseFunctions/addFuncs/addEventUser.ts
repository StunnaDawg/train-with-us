import { ca } from "date-fns/locale"
import supabase from "../../../lib/supabase"

const addEventUser = async (
  eventId: number,
  userId: string,
  first_name: string,
  last_name: string
) => {
  try {
    const { error } = await supabase.from("events_users").insert([
      {
        event_id: eventId,
        user_id: userId,
        first_name: first_name,
        last_name: last_name,
      },
    ])
    if (error) throw error
  } catch (error) {
    console.log(error)
  }
}

export default addEventUser
