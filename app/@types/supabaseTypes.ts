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
  Database["public"]["Tables"]["community_memberships"]["Row"]
