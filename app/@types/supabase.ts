export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      chat_sessions: {
        Row: {
          created_at: string
          id: string
          messages: string[] | null
          user1: string | null
          user2: string | null
        }
        Insert: {
          created_at?: string
          id?: string
          messages?: string[] | null
          user1?: string | null
          user2?: string | null
        }
        Update: {
          created_at?: string
          id?: string
          messages?: string[] | null
          user1?: string | null
          user2?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "chat_sessions_user1_fkey"
            columns: ["user1"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "chat_sessions_user2_fkey1"
            columns: ["user2"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          }
        ]
      }
      communities: {
        Row: {
          channels: string[] | null
          community_members: string[] | null
          community_owner: string | null
          community_photos: string[] | null
          community_style: string | null
          community_title: string | null
          created_at: string
          id: number
        }
        Insert: {
          channels?: string[] | null
          community_members?: string[] | null
          community_owner?: string | null
          community_photos?: string[] | null
          community_style?: string | null
          community_title?: string | null
          created_at?: string
          id?: number
        }
        Update: {
          channels?: string[] | null
          community_members?: string[] | null
          community_owner?: string | null
          community_photos?: string[] | null
          community_style?: string | null
          community_title?: string | null
          created_at?: string
          id?: number
        }
        Relationships: [
          {
            foreignKeyName: "public_communities_community_owner_fkey"
            columns: ["community_owner"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          }
        ]
      }
      community_channels: {
        Row: {
          channel_title: string | null
          channel_type: string
          community: number
          community_owner: string | null
          created_at: string
          id: string
        }
        Insert: {
          channel_title?: string | null
          channel_type?: string
          community: number
          community_owner?: string | null
          created_at?: string
          id?: string
        }
        Update: {
          channel_title?: string | null
          channel_type?: string
          community?: number
          community_owner?: string | null
          created_at?: string
          id?: string
        }
        Relationships: [
          {
            foreignKeyName: "community_channels_community_fkey"
            columns: ["community"]
            isOneToOne: false
            referencedRelation: "communities"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "community_channels_community_owner_fkey"
            columns: ["community_owner"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          }
        ]
      }
      community_members: {
        Row: {
          community_id: number
          joined_at: string
          user_id: string
        }
        Insert: {
          community_id: number
          joined_at?: string
          user_id?: string
        }
        Update: {
          community_id?: number
          joined_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "public_community_members_community_id_fkey"
            columns: ["community_id"]
            isOneToOne: false
            referencedRelation: "communities"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "public_community_members_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          }
        ]
      }
      events: {
        Row: {
          community_host: number | null
          created_at: string
          date: string | null
          event_description: string | null
          event_host: string
          event_photos: string[] | null
          event_title: string | null
          id: number
          price: number | null
        }
        Insert: {
          community_host?: number | null
          created_at?: string
          date?: string | null
          event_description?: string | null
          event_host: string
          event_photos?: string[] | null
          event_title?: string | null
          id?: number
          price?: number | null
        }
        Update: {
          community_host?: number | null
          created_at?: string
          date?: string | null
          event_description?: string | null
          event_host?: string
          event_photos?: string[] | null
          event_title?: string | null
          id?: number
          price?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "public_events_community_host_fkey"
            columns: ["community_host"]
            isOneToOne: false
            referencedRelation: "communities"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "public_events_event_host_fkey"
            columns: ["event_host"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          }
        ]
      }
      events_users: {
        Row: {
          event_id: number
          user_id: string
        }
        Insert: {
          event_id: number
          user_id: string
        }
        Update: {
          event_id?: number
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "events_users_event_id_fkey"
            columns: ["event_id"]
            isOneToOne: false
            referencedRelation: "events"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "events_users_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          }
        ]
      }
      messages: {
        Row: {
          chat_session: string
          id: string
          message: string | null
          read: boolean
          sender: string | null
          sent_at: string
        }
        Insert: {
          chat_session: string
          id?: string
          message?: string | null
          read?: boolean
          sender?: string | null
          sent_at?: string
        }
        Update: {
          chat_session?: string
          id?: string
          message?: string | null
          read?: boolean
          sender?: string | null
          sent_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "messages_chat session_fkey"
            columns: ["chat_session"]
            isOneToOne: false
            referencedRelation: "chat_sessions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "messages_sender_fkey"
            columns: ["sender"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          }
        ]
      }
      profiles: {
        Row: {
          activities: string[] | null
          birthday: string | null
          community_created: number | null
          connected_users: string[] | null
          created_at: string | null
          first_name: string | null
          gender: string | null
          id: string
          ignored_users: string[] | null
          intentions: string | null
          last_name: string | null
          onboard: boolean
          photos_url: string[] | null
          username: string | null
        }
        Insert: {
          activities?: string[] | null
          birthday?: string | null
          community_created?: number | null
          connected_users?: string[] | null
          created_at?: string | null
          first_name?: string | null
          gender?: string | null
          id: string
          ignored_users?: string[] | null
          intentions?: string | null
          last_name?: string | null
          onboard?: boolean
          photos_url?: string[] | null
          username?: string | null
        }
        Update: {
          activities?: string[] | null
          birthday?: string | null
          community_created?: number | null
          connected_users?: string[] | null
          created_at?: string | null
          first_name?: string | null
          gender?: string | null
          id?: string
          ignored_users?: string[] | null
          intentions?: string | null
          last_name?: string | null
          onboard?: boolean
          photos_url?: string[] | null
          username?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "profiles_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "public_profiles_community_created_fkey"
            columns: ["community_created"]
            isOneToOne: false
            referencedRelation: "communities"
            referencedColumns: ["id"]
          }
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
      PublicSchema["Views"])
  ? (PublicSchema["Tables"] &
      PublicSchema["Views"])[PublicTableNameOrOptions] extends {
      Row: infer R
    }
    ? R
    : never
  : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
  ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
      Insert: infer I
    }
    ? I
    : never
  : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
  ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
      Update: infer U
    }
    ? U
    : never
  : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
  ? PublicSchema["Enums"][PublicEnumNameOrOptions]
  : never
