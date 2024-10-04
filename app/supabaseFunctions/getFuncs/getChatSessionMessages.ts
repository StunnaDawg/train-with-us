import { Dispatch, SetStateAction } from "react"
import supabase from "../../../lib/supabase"
import { MessageWithProfile } from "../../userSide/UserCommunities/components/MessageScreen"

const getChatSessionMessages = async (
  chatSessionId: string,
  setServerMessages: Dispatch<SetStateAction<MessageWithProfile[] | null>>,
  page: number,
  setEndOfData: Dispatch<SetStateAction<boolean>>,
  append: boolean,
  setLoading: Dispatch<SetStateAction<boolean>>
) => {
  setLoading(true)
  const { data, error } = await supabase
    .from("messages")
    .select(
      `
      *,
      sender_profile:profiles!inner(profile_pic)
    `
    )
    .eq("chat_session", chatSessionId)
    .order("sent_at", { ascending: false })
    .range(page * 20, (page + 1) * 20 - 1)

  if (error) {
    console.error("Error fetching messages:", error)
    setLoading(false)
    return
  }

  const messagesWithProfiles = data as MessageWithProfile[]

  setServerMessages((prevMessages) =>
    append && prevMessages
      ? [...prevMessages, ...messagesWithProfiles]
      : messagesWithProfiles
  )

  setEndOfData(data.length < 20)
  setLoading(false)
}

export default getChatSessionMessages
