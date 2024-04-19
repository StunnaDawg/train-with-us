import { Dispatch, SetStateAction } from "react"
import supabase from "../../lib/supabase"

const getUserId = async (setUserId: Dispatch<SetStateAction<string>>) => {
  try {
    const {
      data: { user },
    } = await supabase.auth.getUser()
    if (user?.id) {
      setUserId(user?.id)
    }
  } catch (error) {
    console.log(error)
  }
}

export default getUserId
