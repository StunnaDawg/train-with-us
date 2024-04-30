import { Dispatch, SetStateAction } from "react"
import supabase from "../../../lib/supabase"
import getConnectedIgnoredProfiles from "./getConnectedIgnoredProfiles"
import { Profile } from "../../@types/supabaseTypes"

const getConnectionProfiles = async (
  setLoading: Dispatch<SetStateAction<boolean>>,
  userId: string,
  setProfiles: Dispatch<SetStateAction<Profile[] | null>>
) => {
  try {
    setLoading(true)
    const connections = await getConnectedIgnoredProfiles(userId)
    if (!connections) {
      console.log("No connection data found for the user.")
      return
    }

    const { connected_users, ignored_users } = connections

    const excludeIds = [
      ...new Set([...(connected_users || []), ...(ignored_users || [])]),
    ]

    const { data: profiles, error } = await supabase
      .from("profiles")
      .select("*")
      .not("id", "in", excludeIds)
      .not("id", "eq", userId)

    if (error) throw error

    setProfiles(profiles || null)
    console.log("got profiles,", profiles)
  } catch (error) {
    console.log("Error in getting profiles:", error)
  } finally {
    setLoading(false)
  }
}

export default getConnectionProfiles
