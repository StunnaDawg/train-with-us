import { Dispatch, SetStateAction } from "react"
import supabase from "../../../lib/supabase"
import { CommunityChannelMessages, Messages } from "../../@types/supabaseTypes"

const PAGE_SIZE = 10

const getChannelSessionMessages = async (
  channelId: string,
  setMessages: Dispatch<SetStateAction<CommunityChannelMessages[] | null>>,
  page: number,
  setEndOfMessages: Dispatch<SetStateAction<boolean>>,
  append: boolean = true
) => {
  try {
    const from = page * PAGE_SIZE
    const to = from + PAGE_SIZE - 1

    const { data: messages, error } = await supabase
      .from("community_channel_messages")
      .select("*")
      .eq("channel_id", channelId)
      .order("sent_at", { ascending: false })
      .range(from, to)

    if (error) {
      console.error("Failed to fetch messages:", error.message)
      throw error // Or handle it according to your application's needs
    } else {
      if (messages.length < PAGE_SIZE) {
        setEndOfMessages(true)
      }

      if (append) {
        setMessages((prevItems: CommunityChannelMessages[] | null) =>
          prevItems ? [...prevItems, ...messages] : messages
        )
      } else {
        setMessages(messages)
      }
    }
    return messages
  } catch (error) {
    console.log(error)
  }
}

export default getChannelSessionMessages
