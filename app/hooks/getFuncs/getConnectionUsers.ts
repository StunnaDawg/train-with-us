import { Dispatch, SetStateAction } from "react"
import supabase from "../../../lib/supabase"
import { Profile } from "../../@types/supabaseTypes"

const getConnectionUsers = async (
  userId: string,
  setLoading: Dispatch<SetStateAction<boolean>>,
  setProfiles: Dispatch<SetStateAction<Profile[] | null>>
) => {
  try {
    setLoading(true)
    const { data: interactions, error: interactionError } = await supabase
      .from("connection_interaction")
      .select("target_interaction")
      .eq("user_interaction", userId)

    if (interactionError) throw interactionError

    const interactedUserIds = interactions.map(
      (interaction) => interaction.target_interaction
    )

    const { data: uninteractedProfiles, error: profilesError } = await supabase
      .from("profiles")
      .select("*")
      .not("id", "in", interactedUserIds)

    if (profilesError) throw profilesError

    setProfiles(uninteractedProfiles || null)
  } catch (error) {
    console.log(error)
    setProfiles(null)
  } finally {
    setLoading(false)
  }
}

export default getConnectionUsers
