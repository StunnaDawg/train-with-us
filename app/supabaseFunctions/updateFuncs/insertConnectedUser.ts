import { Dispatch, SetStateAction } from "react"
import getConnectedIgnoredProfiles from "../getFuncs/getConnectedIgnoredProfiles"
import supabase from "../../../lib/supabase"

const insertConnectedUser = async (
  setLoading: Dispatch<SetStateAction<boolean>>,
  userId: string,
  connectedUserId: string
) => {
  try {
    setLoading(true)
    console.log("Inserting user...")
    const currentArray = await getConnectedIgnoredProfiles(userId)

    const newArray = [...(currentArray?.connected_users || []), connectedUserId]
    console.log("Inserting connected user...", newArray)

    const { error } = await supabase
      .from("profiles")
      .upsert({ id: userId, connectedUsers: newArray })

    if (error) throw error

    console.log("User inserted successfully")
  } catch (error) {
    console.error("Failed to insert user:", error)
  } finally {
    setLoading(false)
  }
}

export default insertConnectedUser
