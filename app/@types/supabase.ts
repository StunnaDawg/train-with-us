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
          created_at: string | null
          session_id: number
        }
        Insert: {
          created_at?: string | null
          session_id?: number
        }
        Update: {
          created_at?: string | null
          session_id?: number
        }
        Relationships: []
      }
      events: {
        Row: {
          created_at: string
          date: string | null
          event_description: string | null
          event_host: string
          event_title: string | null
          gym_host: number | null
          id: number
          price: string | null
        }
        Insert: {
          created_at?: string
          date?: string | null
          event_description?: string | null
          event_host: string
          event_title?: string | null
          gym_host?: number | null
          id?: number
          price?: string | null
        }
        Update: {
          created_at?: string
          date?: string | null
          event_description?: string | null
          event_host?: string
          event_title?: string | null
          gym_host?: number | null
          id?: number
          price?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "public_events_event_host_fkey"
            columns: ["event_host"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "public_events_gym_host_fkey"
            columns: ["gym_host"]
            isOneToOne: false
            referencedRelation: "gyms"
            referencedColumns: ["id"]
          },
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
          },
        ]
      }
      gym_members: {
        Row: {
          gym_id: number
          user_id: string
        }
        Insert: {
          gym_id: number
          user_id: string
        }
        Update: {
          gym_id?: number
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "gym_members_gym_id_fkey"
            columns: ["gym_id"]
            isOneToOne: false
            referencedRelation: "gyms"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "gym_members_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      gyms: {
        Row: {
          created_at: string
          gym_owner: string | null
          gym_style: string | null
          gym_title: string | null
          id: number
        }
        Insert: {
          created_at?: string
          gym_owner?: string | null
          gym_style?: string | null
          gym_title?: string | null
          id?: number
        }
        Update: {
          created_at?: string
          gym_owner?: string | null
          gym_style?: string | null
          gym_title?: string | null
          id?: number
        }
        Relationships: [
          {
            foreignKeyName: "public_gyms_gym_owner_fkey"
            columns: ["gym_owner"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      messages: {
        Row: {
          message: string | null
          message_id: number
          sender_id: number | null
          sent_at: string | null
          session_id: number | null
        }
        Insert: {
          message?: string | null
          message_id?: number
          sender_id?: number | null
          sent_at?: string | null
          session_id?: number | null
        }
        Update: {
          message?: string | null
          message_id?: number
          sender_id?: number | null
          sent_at?: string | null
          session_id?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "messages_session_id_fkey"
            columns: ["session_id"]
            isOneToOne: false
            referencedRelation: "chat_sessions"
            referencedColumns: ["session_id"]
          },
        ]
      }
      profiles: {
        Row: {
          activities: string[] | null
          birthday: string | null
          created_at: string | null
          first_name: string | null
          gender: string | null
          gym_created: number | null
          id: string
          intentions: string | null
          last_name: string | null
          onboard: boolean
          photos_url: string[] | null
          username: string | null
        }
        Insert: {
          activities?: string[] | null
          birthday?: string | null
          created_at?: string | null
          first_name?: string | null
          gender?: string | null
          gym_created?: number | null
          id: string
          intentions?: string | null
          last_name?: string | null
          onboard?: boolean
          photos_url?: string[] | null
          username?: string | null
        }
        Update: {
          activities?: string[] | null
          birthday?: string | null
          created_at?: string | null
          first_name?: string | null
          gender?: string | null
          gym_created?: number | null
          id?: string
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
            foreignKeyName: "public_profiles_gym_created_fkey"
            columns: ["gym_created"]
            isOneToOne: false
            referencedRelation: "gyms"
            referencedColumns: ["id"]
          },
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
    : never = never,
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
    : never = never,
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
    : never = never,
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
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never
