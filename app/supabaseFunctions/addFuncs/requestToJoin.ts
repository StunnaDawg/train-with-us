import supabase from "../../../lib/supabase"

const requestToJoin = async (
  community_id: number,
  userId: string,
  first_name: string,
  showAlert: (title: string, message: string) => void
) => {
  const { data: existingRequests, error: selectError } = await supabase
    .from("community_requests")
    .select("*")
    .eq("requested_community", community_id)
    .eq("user_id", userId)

  if (selectError) throw selectError

  console.log("existingRequests", existingRequests)

  if (existingRequests.length > 0) {
    showAlert(
      "Request Already Sent",
      "You have already sent a request to join."
    )
    return
  }

  const { error: insertError } = await supabase
    .from("community_requests")
    .insert([
      {
        requested_community: community_id,
        user_id: userId,
        first_name: first_name,
      },
    ])

  if (insertError) throw insertError

  showAlert("Request Sent", "Your request to join has been sent.")
}

export default requestToJoin
