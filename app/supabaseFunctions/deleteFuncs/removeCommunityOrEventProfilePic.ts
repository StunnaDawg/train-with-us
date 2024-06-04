import supabase from "../../../lib/supabase"

const removeCommunityOrEventProfilePic = async (
  id: number,
  table: string,
  row: string
) => {
  try {
    const { error: updateError } = await supabase
      .from(table)
      .update({ [row]: null })
      .eq("id", id)

    if (updateError) throw updateError

    console.log("Removed image and updated profile pic")
  } catch (error) {
    console.error("Error removing image:", error)
  }
}

export default removeCommunityOrEventProfilePic
