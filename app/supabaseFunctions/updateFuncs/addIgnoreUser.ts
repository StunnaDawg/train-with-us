import supabase from "../../../lib/supabase"
import { Profile } from "../../@types/supabaseTypes"
import getConnectedIgnoredProfiles from "../getFuncs/getConnectedIgnoredProfiles"

const insertIgnoreUser = async (userId: string, ignoreUserId: string) => {
  try {
    console.log("Inserting user...")
    const currentArray = await getConnectedIgnoredProfiles(userId)

    const newArray = [...(currentArray?.ignored_users || []), ignoreUserId]
    console.log("Inserting ignored user...", newArray)

    const { error } = await supabase
      .from("profiles")
      .upsert({ id: userId, ignored_users: newArray })

    if (error) throw error

    console.log("User inserted successfully")
  } catch (error) {
    console.error("Failed to insert user:", error)
  }
}

export default insertIgnoreUser
