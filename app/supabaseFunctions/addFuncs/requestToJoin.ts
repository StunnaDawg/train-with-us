import supabase from "../../../lib/supabase"

const requestToJoin = async (
  community_id: number,
  userId: string,
  first_name: string
) => {
  const { error } = await supabase.from("community_requests").insert([
    {
      requested_community: community_id,
      user_id: userId,
      first_name: first_name,
    },
  ])

  if (error) throw error
}

export default requestToJoin
