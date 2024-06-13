import { Dispatch, SetStateAction } from "react"
import supabase from "../../../lib/supabase"
import { Profile } from "../../@types/supabaseTypes"
import getUsersConnections from "../getFuncs/getUsersConnections"

const removeConnectedUser = async (
  userId: string,
  userIdToRemove: string,
  userProfiles: Profile[],
  setNewProfiles: Dispatch<SetStateAction<Profile[] | null>>,
  setLoading: Dispatch<SetStateAction<boolean>>
) => {
  try {
    const newConnectedUsers = userProfiles
      .filter((profile) => profile.id !== userIdToRemove)
      .map((profile) => profile.id)

    console.log("newConnectedUsers:", newConnectedUsers)

    const { error } = await supabase
      .from("profiles")
      .update({ connected_users: newConnectedUsers })
      .eq("id", userId)

    if (error) throw error

    getUsersConnections(userId, setNewProfiles, setLoading)
  } catch (error) {
    console.error("Failed to remove connected user:", error)
  }
}

export default removeConnectedUser
