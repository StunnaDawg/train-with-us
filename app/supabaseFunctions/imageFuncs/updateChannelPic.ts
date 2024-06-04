import supabase from "../../../lib/supabase"

const updateChannelPic = async (
  channelId: string,
  newChannelPicUrl: string
) => {
  try {
    const { error: updateError, data } = await supabase
      .from("community_channels")
      .update({ channel_pic: newChannelPicUrl })
      .eq("id", channelId)

    if (updateError) throw updateError

    console.log("Profile picture updated successfully", data)
  } catch (error) {
    console.error("Error updating profile picture:", error)
  }
}

export default updateChannelPic
