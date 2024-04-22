import { Dispatch, SetStateAction } from "react"
import supabase from "../../lib/supabase"
import { Database, Tables } from "../@types/supabase"
import { Profile } from "../@types/supabaseTypes"

const useCurrentUser = async (
  id: string,
  setUserProfile: Dispatch<SetStateAction<Profile | null>>
) => {
  try {
    const { data: profiles, error } = await supabase
      .from("profiles")
      .select()
      .eq("id", id)

    if (error) throw error

    const profile = profiles[0] ?? null
    console.log("Profile", profile)

    setUserProfile(profile)
  } catch (error) {
    console.log(error)
  }
}

export default useCurrentUser
