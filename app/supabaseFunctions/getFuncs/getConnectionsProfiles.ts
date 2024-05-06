import { Dispatch, SetStateAction } from "react"
import supabase from "../../../lib/supabase"
import getConnectedIgnoredProfiles from "./getConnectedIgnoredProfiles"
import { Profile } from "../../@types/supabaseTypes"

const getConnectionProfiles = async (
  setLoading: Dispatch<SetStateAction<boolean>>,
  userId: string,
  setProfiles: Dispatch<SetStateAction<Profile[]>>
) => {
  try {
    setLoading(true)
    const connections = await getConnectedIgnoredProfiles(userId)

    let query = supabase.from("profiles").select("*").not("id", "eq", userId) // Exclude the current user's profile by default

    if (connections) {
      const { connected_users } = connections
      const excludeIds = [...new Set([...(connected_users || [])])]
      console.log("Exclude IDs", excludeIds)

      // Apply the filter only if there are IDs to exclude
      if (excludeIds.length > 0) {
        const tupleIds = `(${excludeIds.join(", ")})`
        query = query.not("id", "in", tupleIds)
      }
    }

    const { data: profiles, error } = await query

    if (error) {
      setProfiles([])
      throw error
    }

    setProfiles(profiles)
  } catch (error) {
    console.error("Error in getting profiles:", error)
  } finally {
    setLoading(false)
  }
}

export default getConnectionProfiles
