import { Database } from "./supabase"

export type Profile = Database["public"]["Tables"]["profiles"]["Row"]

export type Events = Database["public"]["Tables"]["events"]["Row"]

export type Communities = Database["public"]["Tables"]["communities"]["Row"]

export type CommunityMember =
  Database["public"]["Tables"]["community_members"]["Row"]

export type Messages = Database["public"]["Tables"]["messages"]["Row"]

export type EventAttendees = Database["public"]["Tables"]["events_users"]["Row"]

export type ChatSession = Database["public"]["Tables"]["chat_sessions"]["Row"]
