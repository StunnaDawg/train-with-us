import { Dispatch, SetStateAction } from "react"
import supabase from "../../../lib/supabase"
import { CommunityChannelMessageWithProfile } from "../../userSide/UserCommunities/components/ChannelMessages"

const PAGE_SIZE = 20

const getChannelSessionMessages = async (
  channelId: string,
  setMessages: Dispatch<
    SetStateAction<CommunityChannelMessageWithProfile[] | null>
  >,
  page: number,
  setEndOfData: Dispatch<SetStateAction<boolean>>,
  append: boolean,
  setLoading: Dispatch<SetStateAction<boolean>>
) => {
  setLoading(true)
  const { data, error } = await supabase
    .from("community_channel_messages")
    .select(
      `
      *,
      sender_profile:profiles!inner(profile_pic)
    `
    )
    .eq("channel_id", channelId)
    .order("sent_at", { ascending: false })
    .range(page * PAGE_SIZE, (page + 1) * PAGE_SIZE - 1)

  if (error) {
    console.error("Error fetching channel messages:", error)
    setLoading(false)
    return
  }

  const messagesWithProfiles = data as CommunityChannelMessageWithProfile[]

  setMessages((prevMessages) =>
    append && prevMessages
      ? [...prevMessages, ...messagesWithProfiles]
      : messagesWithProfiles
  )
  setEndOfData(data.length < PAGE_SIZE)
  setLoading(false)
}

export default getChannelSessionMessages
