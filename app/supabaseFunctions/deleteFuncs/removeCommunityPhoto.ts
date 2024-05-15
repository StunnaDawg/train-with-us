import supabase from "../../../lib/supabase"

const removeCommunityPhoto = async (photoId: string, communityId: number) => {
  try {
    // Fetch the current array of photo URLs
    let { data, error: fetchError } = await supabase
      .from("communities")
      .select("community_photos")
      .eq("id", communityId)
      .single()

    if (fetchError) throw fetchError

    if (!data) return
    const updatedPhotoUrls = data.community_photos.filter(
      (url: string) => url !== photoId
    )

    const { error: updateError } = await supabase
      .from("communities")
      .update({ community_photos: updatedPhotoUrls })
      .eq("id", communityId)

    if (updateError) throw updateError

    console.log("Removed Image from array")
  } catch (error) {
    console.error("Error removing image:", error)
  }
}

export default removeCommunityPhoto
