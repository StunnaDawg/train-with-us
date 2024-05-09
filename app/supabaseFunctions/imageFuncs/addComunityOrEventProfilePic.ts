import supabase from "../../../lib/supabase"

const updateCommunityOrEventProfilePic = async (
  id: number,
  newProfilePicUrl: string,
  table: string,
  row: string
) => {
  try {
    const { error: updateError, data } = await supabase
      .from(table)
      .update({ [row]: newProfilePicUrl })
      .eq("id", id)

    if (updateError) throw updateError

    console.log("Profile picture updated successfully", data)
  } catch (error) {
    console.error("Error updating profile picture:", error)
  }
}

export default updateCommunityOrEventProfilePic
