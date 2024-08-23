import { Dispatch, SetStateAction } from "react"
import supabase from "../../../lib/supabase"

const sendChannelMessage = async (
  message: string,
  image: string | null,
  userId: string,
  channelId: string,
  name: string,
  senderProfilePic: string | null,
  setLoadingSentMessage: Dispatch<SetStateAction<boolean>>,
  setImage: Dispatch<SetStateAction<string>>,
  setMessageToSend: Dispatch<SetStateAction<string>>
) => {
  try {
    console.log("sending message", message, userId)
    const { error } = await supabase.from("community_channel_messages").insert([
      {
        message: message,
        sent_at: new Date(),
        sender_id: userId,
        channel_id: channelId,
        sender_name: name,
        image: image,
        sender_profile_pic: senderProfilePic,
      },
    ])

    if (error) {
      console.log("message error", error)
      throw error
    }
  } catch (error) {
    console.log(error)
  } finally {
    setLoadingSentMessage(false)
    setImage("")
    setMessageToSend("")
  }
}

export default sendChannelMessage
