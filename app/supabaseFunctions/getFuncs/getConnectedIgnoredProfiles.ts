import supabase from "../../../lib/supabase"

const getConnectedIgnoredProfiles = async (userId: string) => {
  try {
    const { data, error } = await supabase
      .from("chat_sessions")
      .select("*")
      .or(`user1.eq.${userId},user2.eq.${userId}`)

    console.log("Connected and Ignored data", data)

    if (error) {
      console.error("Error fetching user connections:", error.message)
      return null
    }

    const connectedIds = data
      .map((session) => {
        if (session.user1 === userId) {
          return session.user2
        } else if (session.user2 === userId) {
          return session.user1
        } else {
          return null
        }
      })
      .filter((id) => id !== null)

    return connectedIds
  } catch (error) {
    console.log(error)
  }
}

export default getConnectedIgnoredProfiles
