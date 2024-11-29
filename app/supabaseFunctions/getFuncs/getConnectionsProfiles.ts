import { Dispatch, SetStateAction } from "react"
import supabase from "../../../lib/supabase"
import getConnectedIgnoredProfiles from "./getConnectedIgnoredProfiles"
import { Profile } from "../../@types/supabaseTypes"

const getConnectionProfiles = async (
  setLoading: Dispatch<SetStateAction<boolean>>,
  userId: string,
  appendProfiles: (newProfiles: Profile[]) => void,
  offSet: number
): Promise<Profile[]> => {
  try {
    const PAGE_COUNT = 20
    const from = offSet * PAGE_COUNT
    const to = from + PAGE_COUNT - 1
    setLoading(true)

    // Fetch both connections and profiles in parallel
    const [connections, { data: profiles, error: profilesError }] =
      await Promise.all([
        getConnectedIgnoredProfiles(userId),
        supabase
          .from("profiles")
          .select("*")
          .neq("id", userId)
          .not("photos_url", "is", null)
          .range(from, to),
      ])

    if (profilesError) throw profilesError

    // Create a Set of excluded IDs once
    const excludeIds = connections ? new Set(connections) : new Set()

    // Filter and shuffle profiles in one pass
    const filteredProfiles = profiles
      .filter((profile: Profile) => !excludeIds.has(profile.id))
      .sort(() => Math.random() - 0.5) // More efficient than separate shuffle function

    appendProfiles(filteredProfiles)
    return filteredProfiles
  } catch (error) {
    console.error("Error in getting profiles:", error)
    return []
  } finally {
    setLoading(false)
  }
}

export default getConnectionProfiles
