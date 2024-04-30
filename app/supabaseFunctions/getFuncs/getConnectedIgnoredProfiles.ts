import supabase from "../../../lib/supabase"

const getConnectedIgnoredProfiles = async (userId: string) => {
  try {
    const { data, error } = await supabase
      .from("profiles")
      .select("connected_users, ignored_users")
      .eq("id", userId)
      .single()

    console.log("Connected and Ignored data", data)

    if (error) {
      console.error("Error fetching user connections:", error.message)
      return null
    }

    return data
  } catch (error) {
    console.log(error)
  }
}

export default getConnectedIgnoredProfiles
