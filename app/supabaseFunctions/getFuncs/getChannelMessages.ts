import { Dispatch, SetStateAction } from "react"
import supabase from "../../../lib/supabase"
import { CommunityChannelMessages, Messages } from "../../@types/supabaseTypes"

const getChannelSessionMessages = async (
  channelId: string,
  setMessages: Dispatch<SetStateAction<CommunityChannelMessages[] | null>>
) => {
  try {
    console.log("chatSessionId", channelId)
    const { data: messages, error } = await supabase
      .from("community_channel_messages")
      .select("*")
      .eq("channel_id", channelId)
      .order("sent_at", { ascending: false })

    if (error) {
      console.error("Failed to fetch messages:", error.message)
      throw error // Or handle it according to your application's needs
    }

    console.log("got messages,", messages)
    setMessages(messages as CommunityChannelMessages[])

    return messages
  } catch (error) {
    console.log(error)
  }
}

export default getChannelSessionMessages
