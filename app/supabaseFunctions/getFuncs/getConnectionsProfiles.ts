import { Dispatch, SetStateAction } from "react"
import supabase from "../../../lib/supabase"
import getConnectedIgnoredProfiles from "./getConnectedIgnoredProfiles"
import { Profile } from "../../@types/supabaseTypes"

function shuffleArray(array: any[]) {
  let currentIndex = array.length,
    randomIndex

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex)
    currentIndex--
    ;[array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ]
  }

  return array
}

const getConnectionProfiles = async (
  setLoading: Dispatch<SetStateAction<boolean>>,
  userId: string,
  setProfiles: Dispatch<SetStateAction<Profile[]>>
) => {
  try {
    setLoading(true)
    const connections = await getConnectedIgnoredProfiles(userId)

    const { data: profiles, error: rpcError } = await supabase.rpc(
      "get_profiles_with_min_urls",
      {
        user_id: userId,
      }
    )

    if (rpcError) {
      setProfiles([])
      throw rpcError
    }

    let filteredProfiles = profiles.filter(
      (profile: Profile) => profile.id !== userId
    )

    if (connections) {
      const { connected_users } = connections
      const excludeIds = new Set([...(connected_users || [])])
      filteredProfiles = filteredProfiles.filter(
        (profile: Profile) => !excludeIds.has(profile.id)
      )
    }

    const shuffledProfiles = shuffleArray(filteredProfiles || [])
    setProfiles(shuffledProfiles)
  } catch (error) {
    console.error("Error in getting profiles:", error)
  } finally {
    setLoading(false)
  }
}

export default getConnectionProfiles
