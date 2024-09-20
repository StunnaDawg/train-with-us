import { Database } from "./supabase"

// Rows from the database

export type Profile = Database["public"]["Tables"]["profiles"]["Row"]

export type Events = Database["public"]["Tables"]["events"]["Row"]

export type Communities = Database["public"]["Tables"]["communities"]["Row"]

export type CommunityMember =
  Database["public"]["Tables"]["community_members"]["Row"]

export type Messages = Database["public"]["Tables"]["messages"]["Row"]

export type EventAttendees = Database["public"]["Tables"]["events_users"]["Row"]

export type ChatSession = Database["public"]["Tables"]["chat_sessions"]["Row"]

export type CommunityRequests =
  Database["public"]["Tables"]["community_requests"]["Row"]

export type CommunityChannel =
  Database["public"]["Tables"]["community_channels"]["Row"]

export type CommunityChannelMessages =
  Database["public"]["Tables"]["community_channel_messages"]["Row"]

// Inserting data into the database

export type NewProfile = Database["public"]["Tables"]["profiles"]["Insert"]

export type NewEvent = Database["public"]["Tables"]["events"]["Insert"]

export type NewCommunity = Database["public"]["Tables"]["communities"]["Insert"]

export type NewCommunityMember =
  Database["public"]["Tables"]["community_members"]["Insert"]

export type NewMessage = Database["public"]["Tables"]["messages"]["Insert"]

export type NewEventAttendee =
  Database["public"]["Tables"]["events_users"]["Insert"]

export type NewChatSession =
  Database["public"]["Tables"]["chat_sessions"]["Insert"]

export type CommunityMembership =
  Database["public"]["Tables"]["community_channel_membership"]["Row"]

export type ConnectionRequest =
  Database["public"]["Tables"]["connection_requests"]["Row"]

export type News = Database["public"]["Tables"]["news_posts"]["Row"]

export type SupaNotification =
  Database["public"]["Tables"]["notifications"]["Row"]

export type CommunityClasses =
  Database["public"]["Tables"]["community_classes"]["Row"]

export type CommunitySchedule =
  Database["public"]["Tables"]["community_class_schedule"]["Row"]

export type EventWaitList =
  Database["public"]["Tables"]["event_waitlist"]["Row"]

export type EventChat = Database["public"]["Tables"]["event_chat"]["Row"]

export type EventChatMessages =
  Database["public"]["Tables"]["event_messages"]["Row"]

// custom types

export type CommunityWithCompatibility = Communities & {
  compatibility_score: number
}

export type EventWithCompatibility = Events & {
  compatibility_score: number
}
