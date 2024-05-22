import { Dispatch, SetStateAction } from "react"
import supabase from "../../../lib/supabase"
import { Profile } from "../../@types/supabaseTypes"

const searchUsersFunction = async (
  search: string,
  setProfiles: Dispatch<SetStateAction<Profile[] | null>>,
  setLoading: Dispatch<SetStateAction<boolean>>
) => {
  try {
    setLoading(true)
    const { data, error } = await supabase
      .from("profiles")
      .select()
      .ilike("first_name || ' ' || last_name", `%${search}%`)

    if (error) throw error

    setProfiles(data)
  } catch (error) {
    console.log(error)
  } finally {
    setLoading(false)
  }
}

export default searchUsersFunction
