import supabase from "../../../lib/supabase"

const removeChannelCoverPic = async (id: string) => {
  try {
    const { error: updateError } = await supabase
      .from("community_channels")
      .update({ channel_pic: null })
      .eq("id", id)

    if (updateError) throw updateError

    console.log("Removed image")
  } catch (error) {
    console.error("Error removing image:", error)
  }
}

export default removeChannelCoverPic
