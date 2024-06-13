import { Dispatch, SetStateAction } from "react"
import supabase from "../../../lib/supabase"
import { Profile } from "../../@types/supabaseTypes"

const getUsersConnections = async (
  userId: string,
  setUsers: Dispatch<SetStateAction<Profile[] | null>>,
  setLoading: Dispatch<SetStateAction<boolean>>
) => {
  try {
    console.log("userId", userId)
    setLoading(true)
    const { data: connectionsResult, error } = await supabase
      .from("profiles")
      .select("connected_users")
      .eq("id", userId)

    if (error) throw error

    if (!connectionsResult || connectionsResult.length === 0) {
      setUsers(null)
      return
    }

    const connectedUsers = connectionsResult[0].connected_users
    if (!connectedUsers || connectedUsers.length === 0) {
      setUsers(null)
      return
    }

    const { data: users, error: usersError } = await supabase
      .from("profiles")
      .select("*")
      .in("id", connectedUsers)
      .order("first_name", { ascending: true })

    if (usersError) throw usersError

    setUsers(users ?? null)

    console.log("users:", users)
  } catch (error) {
    console.error("Failed to fetch users:", error)
  } finally {
    setLoading(false)
  }
}

export default getUsersConnections
