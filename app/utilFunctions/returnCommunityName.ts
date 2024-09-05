import supabase from "../../lib/supabase"

const returnCommunityName = async (communityId: number) => {
  const { data, error } = await supabase
    .from("communities")
    .select("community_title")
    .eq("id", communityId)
    .single()

  if (error) {
    console.error("Error fetching community name:", error.message)
    throw error
  }

  return data.community_title
}

export default returnCommunityName
