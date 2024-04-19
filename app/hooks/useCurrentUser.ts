import { Dispatch, SetStateAction } from "react"
import supabase from "../../lib/supabase"
import { Database, Tables } from "../@types/supabase"

const useCurrentUser = async (
  id: string,
  setUserProfile: Dispatch<
    SetStateAction<Database["public"]["Tables"]["profiles"]["Row"] | null>
  >
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
