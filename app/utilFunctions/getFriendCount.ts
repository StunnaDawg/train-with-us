import supabase from "../../lib/supabase"

const getFriendCount = async (communityId: number, userId: string) => {
  const { data, error } = await supabase.rpc("get_community_friend_count", {
    user_id: userId,
    community_id: communityId,
  })

  if (error) {
    console.error("Error getting friend count:", error)
    return 0
  }

  return data
}

export default getFriendCount
