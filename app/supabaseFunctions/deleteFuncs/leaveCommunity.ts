import supabase from "../../../lib/supabase"
import showAlert from "../../utilFunctions/showAlert"

const leaveCommunity = async (communityId: number, userId: string) => {
  try {
    const { error } = await supabase
      .from("community_members")
      .delete()
      .eq("community_id", communityId)
      .eq("user_id", userId)

    if (error) throw error

    const { data: communityData, error: fetchError } = await supabase
      .from("communities")
      .select("member_count")
      .eq("id", communityId)
      .single()

    if (fetchError) {
      throw fetchError
    } else {
      const newMemberCount = communityData.member_count + 1

      const { error: updateError } = await supabase
        .from("communities")
        .update({ member_count: newMemberCount })
        .eq("id", communityId)

      if (updateError) {
        console.error("Error updating member count:", updateError)
      } else {
        console.log("Member count updated successfully")
      }
    }

    showAlert({
      title: "You have left the community",
      message: "You can rejoin at any time.",
      buttonText: "OK",
    })
  } catch (error) {
    console.error("Error leaving community:", error)
  }
}

export default leaveCommunity
