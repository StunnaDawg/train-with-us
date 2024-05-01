import { Dispatch, SetStateAction } from "react"
import { Communities } from "../../@types/supabaseTypes"
import supabase from "../../../lib/supabase"

const getAllUsersCommunities = async (
  userId: string,
  setLoading: Dispatch<SetStateAction<boolean>>,
  setCommunities: Dispatch<SetStateAction<Communities[] | null>>
) => {
  try {
    setLoading(true)
    console.log("userId", userId)
    // Fetch community memberships for the user
    const { data: communityMemberships, error: membershipError } =
      await supabase
        .from("community_members")
        .select("community_id") // Assuming the column that holds the community ID is named 'community_id'
        .eq("user_id", userId)

    console.log("communityMemberships", communityMemberships)

    if (membershipError) throw membershipError

    // Check if there are memberships
    if (!communityMemberships || communityMemberships.length === 0) {
      setCommunities(null)
      return
    }

    // Extract community IDs
    const communityIds = communityMemberships.map(
      (membership) => membership.community_id
    )

    // Fetch details for these communities
    const { data: communities, error: communitiesError } = await supabase
      .from("communities")
      .select("*")
      .in("id", communityIds) // Fetch all communities whose IDs are in the list

    console.log("communities", communities)

    if (communitiesError) throw communitiesError

    setCommunities(communities ?? null)
  } catch (error) {
    console.error("Failed to fetch communities:", error)
  } finally {
    setLoading(false)
  }
}

export default getAllUsersCommunities
