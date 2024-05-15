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

    //Swapppp
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

    let query = supabase.from("profiles").select("*").not("id", "eq", userId)

    if (connections) {
      const { connected_users } = connections
      const excludeIds = [...new Set([...(connected_users || [])])]
      console.log("Exclude IDs", excludeIds)

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
    const shuffledProfiles = shuffleArray(profiles || [])
    setProfiles(shuffledProfiles)
  } catch (error) {
    console.error("Error in getting profiles:", error)
  } finally {
    setLoading(false)
  }
}

export default getConnectionProfiles
