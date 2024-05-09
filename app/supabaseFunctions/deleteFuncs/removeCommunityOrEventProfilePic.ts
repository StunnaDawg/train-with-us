import supabase from "../../../lib/supabase"

const removeCommunityOrEventProfilePic = async (
  id: number,
  table: string,
  row: string
) => {
  try {
    // Update the profile to remove the profile picture
    const { error: updateError } = await supabase
      .from(table)
      .update({ [row]: null }) // Set to null or an empty string, depending on your schema requirements
      .eq("id", id)

    if (updateError) throw updateError

    console.log("Removed image and updated profile pic")
  } catch (error) {
    console.error("Error removing image:", error)
  }
}

export default removeCommunityOrEventProfilePic
