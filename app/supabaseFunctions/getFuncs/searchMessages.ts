import { Dispatch, SetStateAction } from "react"
import supabase from "../../../lib/supabase"
import { ChatSession } from "../../@types/supabaseTypes"

const searchChatSessionsFunction = async (
  currentUserId: string,
  search: string,
  setChatSessions: Dispatch<SetStateAction<ChatSession[] | null>>,
  setLoading: Dispatch<SetStateAction<boolean>>
) => {
  try {
    setLoading(true)

    // First, get profile IDs from profiles table where user is not the current user and name matches the search
    const { data: profileData, error: profileError } = await supabase
      .from("profiles")
      .select("id")
      .not("id", "eq", currentUserId)
      .ilike("first_name", `%${search}%`)

    if (profileError) {
      console.error("Error fetching profiles:", profileError)
      throw profileError
    }

    // Use the profile IDs to search in chat_sessions
    const profileIds = profileData?.map((profile) => profile.id)
    if (profileIds?.length) {
      const { data: sessionData, error: sessionError } = await supabase
        .from("chat_sessions")
        .select(
          `
            *,
            user1_profile:profiles!user1(first_name),
            user2_profile:profiles!user2(first_name)
          `
        )
        .in("user1", profileIds)
        .or(`user2.in.(${profileIds.join(",")})`)

      if (sessionError) {
        console.error("Error fetching chat sessions:", sessionError)
        throw sessionError
      }

      setChatSessions(sessionData)
    } else {
      setChatSessions([])
    }
  } catch (error) {
    console.error("Failed to search chat sessions:", error)
  } finally {
    setLoading(false)
  }
}

export default searchChatSessionsFunction
