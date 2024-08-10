import { Dispatch, SetStateAction } from "react"
import supabase from "../../../lib/supabase"
import { CommunityChannelMessages, Messages } from "../../@types/supabaseTypes"
import { cacheStorage } from "../../utilFunctions/mmkvStorage"

const PAGE_SIZE = 10

const getChannelSessionMessages = async (
  channelId: string,
  setMessages: Dispatch<SetStateAction<CommunityChannelMessages[] | null>>,
  page: number,
  setEndOfMessages: Dispatch<SetStateAction<boolean>>,
  append: boolean = true,
  setLoading: Dispatch<SetStateAction<boolean>>
) => {
  try {
    setLoading(true)
    const cacheKey = `channl:${channelId}:page:${page}`
    const cachedMessages = cacheStorage.getString(cacheKey)

    if (cachedMessages) {
      const messages: CommunityChannelMessages[] = JSON.parse(cachedMessages)
      setMessages((prevItems: CommunityChannelMessages[] | null) =>
        append ? [...(prevItems || []), ...messages] : messages
      )
      if (messages.length < PAGE_SIZE) {
        setEndOfMessages(true)
      }
      return
    }

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

      cacheStorage.set(cacheKey, JSON.stringify(messages))

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
  } finally {
    setLoading(false)
  }
}

export default getChannelSessionMessages
