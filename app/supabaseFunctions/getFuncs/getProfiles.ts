import { Dispatch, SetStateAction } from "react"
import supabase from "../../../lib/supabase"
import { set } from "date-fns"
import { Profile } from "../../@types/supabaseTypes"

const getProfiles = async (
  setLoading: Dispatch<SetStateAction<boolean>>,
  commmunityMemberUUIDs: string[],
  setCommunityMembers: Dispatch<SetStateAction<Profile[] | null>>
) => {
  try {
    setLoading(true)
    const { data: profiles, error } = await supabase
      .from("profiles")
      .select("*")
      .in("id", commmunityMemberUUIDs)

    if (error) throw error

    console.log("got profiles,", profiles)
    setCommunityMembers(profiles)
  } catch (error) {
    console.log(error)
  } finally {
    setLoading(false)
  }
}

export default getProfiles
