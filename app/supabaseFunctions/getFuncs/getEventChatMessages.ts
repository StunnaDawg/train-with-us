import { Dispatch, SetStateAction } from "react"
import supabase from "../../../lib/supabase"
import { EventChatMessageWithProfile } from "../../userSide/UserCommunities/components/EventChat"

const PAGE_SIZE = 20

const getEventChatMessages = async (
  eventChatId: string,
  setMessages: Dispatch<SetStateAction<EventChatMessageWithProfile[] | null>>,
  page: number,
  setEndOfMessages: Dispatch<SetStateAction<boolean>>,
  append: boolean = true,
  setLoading: Dispatch<SetStateAction<boolean>>
) => {
  setLoading(true)
  try {
    const { data, error } = await supabase
      .from("event_messages")
      .select(
        `
        *,
        sender_profile:profiles!inner(profile_pic)
      `
      )
      .eq("event_chat", eventChatId)
      .order("sent_at", { ascending: false })
      .range(page * PAGE_SIZE, (page + 1) * PAGE_SIZE - 1)

    if (error) {
      console.error("Error fetching event chat messages:", error)
      return
    }

    const messagesWithProfiles = data as EventChatMessageWithProfile[]

    setMessages((prevMessages) =>
      append && prevMessages
        ? [...prevMessages, ...messagesWithProfiles]
        : messagesWithProfiles
    )
    setEndOfMessages(data.length < PAGE_SIZE)
  } catch (error) {
    console.error("Unexpected error in getEventChatMessages:", error)
  } finally {
    setLoading(false)
  }
}

export default getEventChatMessages
