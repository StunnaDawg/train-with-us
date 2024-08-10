import { Dispatch, SetStateAction } from "react"
import supabase from "../../../lib/supabase"
import { Messages } from "../../@types/supabaseTypes"
import { cacheStorage } from "../../utilFunctions/mmkvStorage"

const PAGE_SIZE = 10

const getChatSessionMessages = async (
  chatSessionId: string,
  setMessages: Dispatch<SetStateAction<Messages[] | null>>,
  page: number,
  setEndOfMessages: Dispatch<SetStateAction<boolean>>,
  append: boolean = true,
  setLoading: Dispatch<SetStateAction<boolean>>
) => {
  try {
    setLoading(true)
    const cacheKey = `chatSession:${chatSessionId}:page:${page}`
    const cachedMessages = cacheStorage.getString(cacheKey)

    if (cachedMessages) {
      const messages: Messages[] = JSON.parse(cachedMessages)
      setMessages((prevItems: Messages[] | null) =>
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
      .from("messages")
      .select("*")
      .eq("chat_session", chatSessionId)
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
        setMessages((prevItems: Messages[] | null) =>
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

export default getChatSessionMessages
