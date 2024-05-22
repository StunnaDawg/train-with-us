import { Dispatch, SetStateAction } from "react"
import supabase from "../../../lib/supabase"
import { Profile } from "../../@types/supabaseTypes"

const searchUsersFunction = async (
  search: string,
  setProfiles: Dispatch<SetStateAction<Profile[]>>,
  setLoading: Dispatch<SetStateAction<boolean>>
) => {
  try {
    setLoading(true)
    const { data, error } = await supabase
      .from("profiles")
      .select()
      .textSearch("firstName_lastName", search)

    if (error) throw error

    setProfiles(data)
  } catch (error) {
    console.log(error)
  } finally {
    setLoading(false)
  }
}

export default searchUsersFunction
