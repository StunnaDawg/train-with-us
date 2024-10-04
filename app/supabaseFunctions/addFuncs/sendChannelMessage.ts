import { Dispatch, SetStateAction } from "react"
import supabase from "../../../lib/supabase"
import addNotification from "./addNotification"
import { CommunityChannel } from "../../@types/supabaseTypes"

const sendChannelMessage = async (
  message: string,
  image: string | null,
  userId: string,
  channel: CommunityChannel,
  name: string,

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
        channel_id: channel.id,
        sender_name: name,
        image: image,
      },
    ])

    if (error) {
      console.log("message error", error)
      throw error
    }

    // await addNotification(
    //   message,
    //   "New Message In" + channel.channel_title,
    //   userId,
    //   "ChannelNotification",
    //   channel,
    //   senderProfilePic
    // )
  } catch (error) {
    console.log(error)
  } finally {
    setLoadingSentMessage(false)
    setImage("")
    setMessageToSend("")
  }
}

export default sendChannelMessage
