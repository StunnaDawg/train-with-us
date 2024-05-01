import { Dispatch, SetStateAction } from "react"
import supabase from "../../../lib/supabase"
import { set } from "date-fns"
import { Profile } from "../../@types/supabaseTypes"

const getSingleProfile = async (id: string) => {
  try {
    const { data: profiles, error } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", id)

    if (error) throw error

    console.log("got profiles,", profiles)

    const profile: Profile = profiles[0] ?? null
    return profile
  } catch (error) {
    console.log(error)
  }
}

export default getSingleProfile
