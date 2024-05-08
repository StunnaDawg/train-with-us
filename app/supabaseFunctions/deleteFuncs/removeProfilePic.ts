import supabase from "../../../lib/supabase"

const removeProfilePic = async (userId: string) => {
  try {
    // Update the profile to remove the profile picture
    const { error: updateError } = await supabase
      .from("profiles")
      .update({ profile_pic: null }) // Set to null or an empty string, depending on your schema requirements
      .eq("id", userId)

    if (updateError) throw updateError

    console.log("Removed image and updated profile pic")
  } catch (error) {
    console.error("Error removing image:", error)
  }
}

export default removeProfilePic
