import supabase from "../../lib/supabase"

const fetchCommunityMemberCount = async (communityId: number) => {
  const { data, error } = await supabase
    .from("community_members")
    .select("*")
    .eq("community_id", communityId)

  if (error) {
    console.log(error)
    return
  }

  return data.length.toString()
}

export default fetchCommunityMemberCount
