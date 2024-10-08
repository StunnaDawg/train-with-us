import supabase from "../../../lib/supabase"

const getUserToken = async (userId: string) => {
  const { data, error } = await supabase
    .from("profiles")
    .select("expo_push_token")
    .eq("id", userId)

  if (error) {
    console.error("Error fetching user token:", error.message)
    return
  }

  if (data) {
    return data[0].expo_push_token
  } else {
    return null
  }
}

export default getUserToken
