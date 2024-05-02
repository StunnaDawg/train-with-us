import supabase from "../../../lib/supabase"

const requestToJoin = async (community_id: number, userId: string) => {
  const { error } = await supabase.from("community_requests").insert([
    {
      requested_community: community_id,
      user_id: userId,
    },
  ])

  if (error) throw error
}

export default requestToJoin
