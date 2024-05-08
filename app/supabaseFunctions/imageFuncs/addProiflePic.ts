import supabase from "../../../lib/supabase"

const updateProfilePic = async (userId: string, newProfilePicUrl: string) => {
  try {
    const { error: updateError, data } = await supabase
      .from("profiles")
      .update({ profile_pic: newProfilePicUrl })
      .eq("id", userId)

    if (updateError) throw updateError

    console.log("Profile picture updated successfully", data)
  } catch (error) {
    console.error("Error updating profile picture:", error)
  }
}

export default updateProfilePic
