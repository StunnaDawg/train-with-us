import supabase from "../../../lib/supabase"
import {
  ChatSession,
  Communities,
  CommunityChannel,
  EventChat,
} from "../../@types/supabaseTypes"

const addNotification = async (
  description: string,
  title: string,
  userId: string,
  notificationType: string,
  notificationData:
    | ChatSession
    | CommunityChannel
    | Communities
    | { community_id: number; community_title: string }
    | EventChat
    | null,
  image: string | null
) => {
  try {
    console.log("Adding notification to", userId)
    const { data, error } = await supabase.from("notifications").insert([
      {
        description: description,
        is_read: false,
        title: title,
        user_id: userId,
        notification_type: notificationType,
        data: notificationData,
        image: image,
      },
    ])
    if (error) {
      throw new Error(error.message)
    }
    return data
  } catch (error) {
    console.error("Failed to add notification:", error)
  }
}

export default addNotification
