import { Dispatch, SetStateAction } from "react"
import supabase from "../../../lib/supabase"
import { EventChatMessages, Messages } from "../../@types/supabaseTypes"
import { cacheStorage } from "../../utilFunctions/mmkvStorage"

const PAGE_SIZE = 10

const getEventChatMessages = async (
  eventChatId: string,
  setMessages: Dispatch<SetStateAction<EventChatMessages[] | null>>,
  page: number,
  setEndOfMessages: Dispatch<SetStateAction<boolean>>,
  append: boolean = true,
  setLoading: Dispatch<SetStateAction<boolean>>
) => {
  try {
    setLoading(true)

    const from = page * PAGE_SIZE
    const to = from + PAGE_SIZE - 1

    const { data: messages, error } = await supabase
      .from("event_messages")
      .select("*")
      .eq("event_chat", eventChatId)
      .order("sent_at", { ascending: false })
      .range(from, to)

    if (error) {
      console.error("Failed to fetch messages:", error.message)
      throw error
    } else {
      if (messages.length < PAGE_SIZE) {
        setEndOfMessages(true)
      }

      // cacheStorage.set(cacheKey, JSON.stringify(messages))

      if (append) {
        setMessages((prevItems: EventChatMessages[] | null) =>
          prevItems ? [...prevItems, ...messages] : messages
        )
      } else {
        setMessages(messages)
      }
    }
  } catch (error) {
    console.log(error)
  } finally {
    setLoading(false)
  }
}

export default getEventChatMessages
