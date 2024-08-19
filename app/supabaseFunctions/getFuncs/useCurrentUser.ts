import { Dispatch, SetStateAction } from "react"
import supabase from "../../../lib/supabase"
import { Profile } from "../../@types/supabaseTypes"

const useCurrentUser = async (
  id: string,
  setUserProfile: Dispatch<SetStateAction<Profile | null>>
) => {
  try {
    const startTime = Date.now()
    const { data: profiles, error } = await supabase
      .from("profiles")
      .select()
      .eq("id", id)

    if (error) throw error

    const profile = profiles[0] ?? null

    setUserProfile(profile)
    const endTime = Date.now()
    console.log(`getProfile took ${endTime - startTime} ms`)
    return profile
  } catch (error) {
    console.log(error)
  }
}

export default useCurrentUser
