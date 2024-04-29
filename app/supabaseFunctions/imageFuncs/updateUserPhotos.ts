import supabase from "../../../lib/supabase"

const updateUserPhotos = async (
  userId: string | undefined,
  newPhotoUrl: string
) => {
  try {
    // First, get the current list of photo URLs
    if (!userId) throw new Error("No user ID provided")
    const { data, error: fetchError } = await supabase
      .from("profiles")
      .select("photos_url")
      .eq("id", userId)
      .single() // Assumes there is exactly one matching profile

    if (fetchError) throw fetchError

    // Check if data is received and has photos_url array
    if (data && data.photos_url) {
      // Append the new photo URL to the existing array
      const updatedPhotosUrls = [...data.photos_url, newPhotoUrl]

      // Now update the profile with the new array of photo URLs
      const { error: updateError } = await supabase
        .from("profiles")
        .update({ photos_url: updatedPhotosUrls })
        .match({ id: userId })

      if (updateError) throw updateError

      console.log("Photos updated")
    } else {
      console.error("No existing photos or profile data found.")
    }
  } catch (error) {
    console.error("Error updating photos:", error)
  }
}

export default updateUserPhotos
