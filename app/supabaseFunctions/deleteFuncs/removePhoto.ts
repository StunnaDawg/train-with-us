import supabase from "../../../lib/supabase"

const removePhoto = async (photoId: string, userId: string) => {
  try {
    // Fetch the current array of photo URLs
    let { data, error: fetchError } = await supabase
      .from("profiles")
      .select("photos_url")
      .eq("id", userId)
      .single()

    if (fetchError) throw fetchError

    if (!data) return
    const updatedPhotoUrls = data.photos_url.filter(
      (url: string) => url !== photoId
    )

    const { error: updateError } = await supabase
      .from("profiles")
      .update({ photos_url: updatedPhotoUrls })
      .eq("id", userId)

    if (updateError) throw updateError

    console.log("Removed Image")
  } catch (error) {
    console.error("Error removing image:", error)
  }
}

export default removePhoto
