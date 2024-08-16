export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  graphql_public: {
    Tables: {
      [_ in never]: never
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      graphql: {
        Args: {
          operationName?: string
          query?: string
          variables?: Json
          extensions?: Json
        }
        Returns: Json
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
  public: {
    Tables: {
      chat_sessions: {
        Row: {
          created_at: string
          id: string
          recent_message: string | null
          updated_at: string | null
          user1: string | null
          user1_read: boolean
          user2: string | null
          user2_read: boolean
        }
        Insert: {
          created_at?: string
          id?: string
          recent_message?: string | null
          updated_at?: string | null
          user1?: string | null
          user1_read?: boolean
          user2?: string | null
          user2_read?: boolean
        }
        Update: {
          created_at?: string
          id?: string
          recent_message?: string | null
          updated_at?: string | null
          user1?: string | null
          user1_read?: boolean
          user2?: string | null
          user2_read?: boolean
        }
        Relationships: [
          {
            foreignKeyName: "chat_sessions_user1_fkey"
            columns: ["user1"]
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "chat_sessions_user2_fkey1"
            columns: ["user2"]
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          }
        ]
      }
      communities: {
        Row: {
          about: string | null
          address: string | null
          channels: string[] | null
          city: string
          community_members: string[] | null
          community_owner: string | null
          community_photos: string[] | null
          community_profile_pic: string | null
          community_style: string | null
          community_title: string | null
          created_at: string
          id: number
          member_count: number
          phone_number: string | null
          public_community: boolean
        }
        Insert: {
          about?: string | null
          address?: string | null
          channels?: string[] | null
          city?: string
          community_members?: string[] | null
          community_owner?: string | null
          community_photos?: string[] | null
          community_profile_pic?: string | null
          community_style?: string | null
          community_title?: string | null
          created_at?: string
          id?: number
          member_count?: number
          phone_number?: string | null
          public_community?: boolean
        }
        Update: {
          about?: string | null
          address?: string | null
          channels?: string[] | null
          city?: string
          community_members?: string[] | null
          community_owner?: string | null
          community_photos?: string[] | null
          community_profile_pic?: string | null
          community_style?: string | null
          community_title?: string | null
          created_at?: string
          id?: number
          member_count?: number
          phone_number?: string | null
          public_community?: boolean
        }
        Relationships: [
          {
            foreignKeyName: "public_communities_community_owner_fkey"
            columns: ["community_owner"]
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          }
        ]
      }
      community_channel_membership: {
        Row: {
          channel_id: string
          community_id: number
          expo_push_token: string | null
          muted: boolean | null
          user_id: string
        }
        Insert: {
          channel_id?: string
          community_id: number
          expo_push_token?: string | null
          muted?: boolean | null
          user_id?: string
        }
        Update: {
          channel_id?: string
          community_id?: number
          expo_push_token?: string | null
          muted?: boolean | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "public_community_channel_membership_channel_id_fkey"
            columns: ["channel_id"]
            referencedRelation: "community_channels"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "public_community_channel_membership_community_id_fkey"
            columns: ["community_id"]
            referencedRelation: "communities"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "public_community_channel_membership_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          }
        ]
      }
      community_channel_messages: {
        Row: {
          channel_id: string | null
          community_id: number | null
          community_or_event_link: boolean
          eventId: number | null
          id: string
          image: string | null
          message: string | null
          sender_id: string | null
          sender_name: string | null
          sender_profile_pic: string | null
          sent_at: string
        }
        Insert: {
          channel_id?: string | null
          community_id?: number | null
          community_or_event_link?: boolean
          eventId?: number | null
          id?: string
          image?: string | null
          message?: string | null
          sender_id?: string | null
          sender_name?: string | null
          sender_profile_pic?: string | null
          sent_at?: string
        }
        Update: {
          channel_id?: string | null
          community_id?: number | null
          community_or_event_link?: boolean
          eventId?: number | null
          id?: string
          image?: string | null
          message?: string | null
          sender_id?: string | null
          sender_name?: string | null
          sender_profile_pic?: string | null
          sent_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "public_community_channel_messages_channel_id_fkey"
            columns: ["channel_id"]
            referencedRelation: "community_channels"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "public_community_channel_messages_community_id_fkey"
            columns: ["community_id"]
            referencedRelation: "communities"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "public_community_channel_messages_eventId_fkey"
            columns: ["eventId"]
            referencedRelation: "events"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "public_community_channel_messages_sender_id_fkey"
            columns: ["sender_id"]
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          }
        ]
      }
      community_channels: {
        Row: {
          channel_pic: string | null
          channel_title: string | null
          channel_type: string
          community: number
          community_name: string
          community_owner: string | null
          created_at: string
          id: string
          private: boolean
          recent_message: string | null
          recent_message_sender: string | null
          updated_at: string | null
        }
        Insert: {
          channel_pic?: string | null
          channel_title?: string | null
          channel_type?: string
          community: number
          community_name?: string
          community_owner?: string | null
          created_at?: string
          id?: string
          private?: boolean
          recent_message?: string | null
          recent_message_sender?: string | null
          updated_at?: string | null
        }
        Update: {
          channel_pic?: string | null
          channel_title?: string | null
          channel_type?: string
          community?: number
          community_name?: string
          community_owner?: string | null
          created_at?: string
          id?: string
          private?: boolean
          recent_message?: string | null
          recent_message_sender?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "community_channels_community_fkey"
            columns: ["community"]
            referencedRelation: "communities"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "community_channels_community_owner_fkey"
            columns: ["community_owner"]
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          }
        ]
      }
      community_members: {
        Row: {
          community_id: number
          community_owner: string | null
          expo_push_token: string | null
          joined_at: string
          role: string
          user_id: string
        }
        Insert: {
          community_id: number
          community_owner?: string | null
          expo_push_token?: string | null
          joined_at?: string
          role?: string
          user_id?: string
        }
        Update: {
          community_id?: number
          community_owner?: string | null
          expo_push_token?: string | null
          joined_at?: string
          role?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "public_community_members_community_id_fkey"
            columns: ["community_id"]
            referencedRelation: "communities"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "public_community_members_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          }
        ]
      }
      community_requests: {
        Row: {
          created_at: string
          expo_push_token: string | null
          first_name: string | null
          id: string
          requested_community: number | null
          user_id: string | null
        }
        Insert: {
          created_at?: string
          expo_push_token?: string | null
          first_name?: string | null
          id?: string
          requested_community?: number | null
          user_id?: string | null
        }
        Update: {
          created_at?: string
          expo_push_token?: string | null
          first_name?: string | null
          id?: string
          requested_community?: number | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "community_requests_requested_community_fkey"
            columns: ["requested_community"]
            referencedRelation: "communities"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "community_requests_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          }
        ]
      }
      connection_requests: {
        Row: {
          message: string
          request_sent: string | null
          requested: string
          requester: string
        }
        Insert: {
          message?: string
          request_sent?: string | null
          requested?: string
          requester?: string
        }
        Update: {
          message?: string
          request_sent?: string | null
          requested?: string
          requester?: string
        }
        Relationships: [
          {
            foreignKeyName: "public_connection_requests_requested_fkey"
            columns: ["requested"]
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "public_connection_requests_requester_fkey"
            columns: ["requester"]
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          }
        ]
      }
      events: {
        Row: {
          community_host: number | null
          community_host_name: string | null
          created_at: string
          date: string | null
          event_cover_photo: string | null
          event_description: string | null
          event_host: string
          event_limit: number | null
          event_photos: string[] | null
          event_style: string | null
          event_title: string | null
          id: number
          location: string | null
          price: number | null
          public_event: boolean
        }
        Insert: {
          community_host?: number | null
          community_host_name?: string | null
          created_at?: string
          date?: string | null
          event_cover_photo?: string | null
          event_description?: string | null
          event_host: string
          event_limit?: number | null
          event_photos?: string[] | null
          event_style?: string | null
          event_title?: string | null
          id?: number
          location?: string | null
          price?: number | null
          public_event?: boolean
        }
        Update: {
          community_host?: number | null
          community_host_name?: string | null
          created_at?: string
          date?: string | null
          event_cover_photo?: string | null
          event_description?: string | null
          event_host?: string
          event_limit?: number | null
          event_photos?: string[] | null
          event_style?: string | null
          event_title?: string | null
          id?: number
          location?: string | null
          price?: number | null
          public_event?: boolean
        }
        Relationships: [
          {
            foreignKeyName: "public_events_community_host_fkey"
            columns: ["community_host"]
            referencedRelation: "communities"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "public_events_event_host_fkey"
            columns: ["event_host"]
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          }
        ]
      }
      events_users: {
        Row: {
          event_id: number
          first_name: string | null
          last_name: string | null
          user_id: string
        }
        Insert: {
          event_id: number
          first_name?: string | null
          last_name?: string | null
          user_id: string
        }
        Update: {
          event_id?: number
          first_name?: string | null
          last_name?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "public_events_users_event_id_fkey"
            columns: ["event_id"]
            referencedRelation: "events"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "public_events_users_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          }
        ]
      }
      messages: {
        Row: {
          chat_session: string
          community_id: number | null
          community_or_event_link: boolean
          eventId: number | null
          id: string
          image: string | null
          message: string | null
          read: boolean
          sender: string | null
          sender_name: string | null
          sender_profile_pic: string | null
          sent_at: string
        }
        Insert: {
          chat_session: string
          community_id?: number | null
          community_or_event_link?: boolean
          eventId?: number | null
          id?: string
          image?: string | null
          message?: string | null
          read?: boolean
          sender?: string | null
          sender_name?: string | null
          sender_profile_pic?: string | null
          sent_at?: string
        }
        Update: {
          chat_session?: string
          community_id?: number | null
          community_or_event_link?: boolean
          eventId?: number | null
          id?: string
          image?: string | null
          message?: string | null
          read?: boolean
          sender?: string | null
          sender_name?: string | null
          sender_profile_pic?: string | null
          sent_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "messages_chat session_fkey"
            columns: ["chat_session"]
            referencedRelation: "chat_sessions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "messages_sender_fkey"
            columns: ["sender"]
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "public_messages_community_id_fkey"
            columns: ["community_id"]
            referencedRelation: "communities"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "public_messages_eventId_fkey"
            columns: ["eventId"]
            referencedRelation: "events"
            referencedColumns: ["id"]
          }
        ]
      }
      news_posts: {
        Row: {
          author: string
          author_name: string
          community_id: number
          content: string
          created_at: string
          id: string
          title: string | null
        }
        Insert: {
          author: string
          author_name?: string
          community_id: number
          content?: string
          created_at?: string
          id?: string
          title?: string | null
        }
        Update: {
          author?: string
          author_name?: string
          community_id?: number
          content?: string
          created_at?: string
          id?: string
          title?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "public_news_posts_author_fkey"
            columns: ["author"]
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "public_news_posts_community_id_fkey"
            columns: ["community_id"]
            referencedRelation: "communities"
            referencedColumns: ["id"]
          }
        ]
      }
      notifications: {
        Row: {
          created_at: string
          data: Json | null
          description: string
          id: string
          image: string | null
          is_read: boolean
          navigation_path: string
          notification_type: string
          title: string
          user_id: string
        }
        Insert: {
          created_at?: string
          data?: Json | null
          description: string
          id?: string
          image?: string | null
          is_read: boolean
          navigation_path: string
          notification_type?: string
          title: string
          user_id?: string
        }
        Update: {
          created_at?: string
          data?: Json | null
          description?: string
          id?: string
          image?: string | null
          is_read?: boolean
          navigation_path?: string
          notification_type?: string
          title?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "public_notifications_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          }
        ]
      }
      profiles: {
        Row: {
          about: string | null
          activities: string[] | null
          actvitiy_time: string | null
          allowed_create_community: boolean
          birthday: string | null
          bucket_list: string | null
          city: string
          community_created: number | null
          community_preference: string[] | null
          created_at: string | null
          expo_push_token: string | null
          first_name: string | null
          fitness_goals: string[] | null
          fitness_lvl: string | null
          fitness_records: string[] | null
          gender: string | null
          hobbies: string | null
          id: string
          ignored_users: string[] | null
          intentions: string | null
          last_name: string | null
          music_pref: string | null
          new_update_modal: boolean
          onboard: boolean
          photos_url: string[] | null
          pinned_channels: string[] | null
          primary_gym: number | null
          profile_pic: string | null
          secondary_gym: number | null
          sexuality: string | null
          username: string | null
          firstname_lastname: string | null
        }
        Insert: {
          about?: string | null
          activities?: string[] | null
          actvitiy_time?: string | null
          allowed_create_community?: boolean
          birthday?: string | null
          bucket_list?: string | null
          city?: string
          community_created?: number | null
          community_preference?: string[] | null
          created_at?: string | null
          expo_push_token?: string | null
          first_name?: string | null
          fitness_goals?: string[] | null
          fitness_lvl?: string | null
          fitness_records?: string[] | null
          gender?: string | null
          hobbies?: string | null
          id: string
          ignored_users?: string[] | null
          intentions?: string | null
          last_name?: string | null
          music_pref?: string | null
          new_update_modal?: boolean
          onboard?: boolean
          photos_url?: string[] | null
          pinned_channels?: string[] | null
          primary_gym?: number | null
          profile_pic?: string | null
          secondary_gym?: number | null
          sexuality?: string | null
          username?: string | null
        }
        Update: {
          about?: string | null
          activities?: string[] | null
          actvitiy_time?: string | null
          allowed_create_community?: boolean
          birthday?: string | null
          bucket_list?: string | null
          city?: string
          community_created?: number | null
          community_preference?: string[] | null
          created_at?: string | null
          expo_push_token?: string | null
          first_name?: string | null
          fitness_goals?: string[] | null
          fitness_lvl?: string | null
          fitness_records?: string[] | null
          gender?: string | null
          hobbies?: string | null
          id?: string
          ignored_users?: string[] | null
          intentions?: string | null
          last_name?: string | null
          music_pref?: string | null
          new_update_modal?: boolean
          onboard?: boolean
          photos_url?: string[] | null
          pinned_channels?: string[] | null
          primary_gym?: number | null
          profile_pic?: string | null
          secondary_gym?: number | null
          sexuality?: string | null
          username?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "profiles_id_fkey"
            columns: ["id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "public_profiles_community_created_fkey"
            columns: ["community_created"]
            referencedRelation: "communities"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "public_profiles_primary_gym_fkey"
            columns: ["primary_gym"]
            referencedRelation: "communities"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "public_profiles_secondary_gym_fkey"
            columns: ["secondary_gym"]
            referencedRelation: "communities"
            referencedColumns: ["id"]
          }
        ]
      }
      user_tokens: {
        Row: {
          id: string
          user_token: string
        }
        Insert: {
          id?: string
          user_token: string
        }
        Update: {
          id?: string
          user_token?: string
        }
        Relationships: [
          {
            foreignKeyName: "public_user_tokens_id_fkey"
            columns: ["id"]
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          }
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      firstname_lastname: {
        Args: {
          "": unknown
        }
        Returns: string
      }
      get_profiles_with_min_urls: {
        Args: {
          user_id: string
        }
        Returns: {
          about: string | null
          activities: string[] | null
          actvitiy_time: string | null
          allowed_create_community: boolean
          birthday: string | null
          bucket_list: string | null
          city: string
          community_created: number | null
          community_preference: string[] | null
          created_at: string | null
          expo_push_token: string | null
          first_name: string | null
          fitness_goals: string[] | null
          fitness_lvl: string | null
          fitness_records: string[] | null
          gender: string | null
          hobbies: string | null
          id: string
          ignored_users: string[] | null
          intentions: string | null
          last_name: string | null
          music_pref: string | null
          new_update_modal: boolean
          onboard: boolean
          photos_url: string[] | null
          pinned_channels: string[] | null
          primary_gym: number | null
          profile_pic: string | null
          secondary_gym: number | null
          sexuality: string | null
          username: string | null
        }[]
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
  storage: {
    Tables: {
      buckets: {
        Row: {
          allowed_mime_types: string[] | null
          avif_autodetection: boolean | null
          created_at: string | null
          file_size_limit: number | null
          id: string
          name: string
          owner: string | null
          owner_id: string | null
          public: boolean | null
          updated_at: string | null
        }
        Insert: {
          allowed_mime_types?: string[] | null
          avif_autodetection?: boolean | null
          created_at?: string | null
          file_size_limit?: number | null
          id: string
          name: string
          owner?: string | null
          owner_id?: string | null
          public?: boolean | null
          updated_at?: string | null
        }
        Update: {
          allowed_mime_types?: string[] | null
          avif_autodetection?: boolean | null
          created_at?: string | null
          file_size_limit?: number | null
          id?: string
          name?: string
          owner?: string | null
          owner_id?: string | null
          public?: boolean | null
          updated_at?: string | null
        }
        Relationships: []
      }
      migrations: {
        Row: {
          executed_at: string | null
          hash: string
          id: number
          name: string
        }
        Insert: {
          executed_at?: string | null
          hash: string
          id: number
          name: string
        }
        Update: {
          executed_at?: string | null
          hash?: string
          id?: number
          name?: string
        }
        Relationships: []
      }
      objects: {
        Row: {
          bucket_id: string | null
          created_at: string | null
          id: string
          last_accessed_at: string | null
          metadata: Json | null
          name: string | null
          owner: string | null
          owner_id: string | null
          path_tokens: string[] | null
          updated_at: string | null
          version: string | null
        }
        Insert: {
          bucket_id?: string | null
          created_at?: string | null
          id?: string
          last_accessed_at?: string | null
          metadata?: Json | null
          name?: string | null
          owner?: string | null
          owner_id?: string | null
          path_tokens?: string[] | null
          updated_at?: string | null
          version?: string | null
        }
        Update: {
          bucket_id?: string | null
          created_at?: string | null
          id?: string
          last_accessed_at?: string | null
          metadata?: Json | null
          name?: string | null
          owner?: string | null
          owner_id?: string | null
          path_tokens?: string[] | null
          updated_at?: string | null
          version?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "objects_bucketId_fkey"
            columns: ["bucket_id"]
            referencedRelation: "buckets"
            referencedColumns: ["id"]
          }
        ]
      }
      s3_multipart_uploads: {
        Row: {
          bucket_id: string
          created_at: string
          id: string
          in_progress_size: number
          key: string
          owner_id: string | null
          upload_signature: string
          version: string
        }
        Insert: {
          bucket_id: string
          created_at?: string
          id: string
          in_progress_size?: number
          key: string
          owner_id?: string | null
          upload_signature: string
          version: string
        }
        Update: {
          bucket_id?: string
          created_at?: string
          id?: string
          in_progress_size?: number
          key?: string
          owner_id?: string | null
          upload_signature?: string
          version?: string
        }
        Relationships: [
          {
            foreignKeyName: "s3_multipart_uploads_bucket_id_fkey"
            columns: ["bucket_id"]
            referencedRelation: "buckets"
            referencedColumns: ["id"]
          }
        ]
      }
      s3_multipart_uploads_parts: {
        Row: {
          bucket_id: string
          created_at: string
          etag: string
          id: string
          key: string
          owner_id: string | null
          part_number: number
          size: number
          upload_id: string
          version: string
        }
        Insert: {
          bucket_id: string
          created_at?: string
          etag: string
          id?: string
          key: string
          owner_id?: string | null
          part_number: number
          size?: number
          upload_id: string
          version: string
        }
        Update: {
          bucket_id?: string
          created_at?: string
          etag?: string
          id?: string
          key?: string
          owner_id?: string | null
          part_number?: number
          size?: number
          upload_id?: string
          version?: string
        }
        Relationships: [
          {
            foreignKeyName: "s3_multipart_uploads_parts_bucket_id_fkey"
            columns: ["bucket_id"]
            referencedRelation: "buckets"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "s3_multipart_uploads_parts_upload_id_fkey"
            columns: ["upload_id"]
            referencedRelation: "s3_multipart_uploads"
            referencedColumns: ["id"]
          }
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      can_insert_object: {
        Args: {
          bucketid: string
          name: string
          owner: string
          metadata: Json
        }
        Returns: undefined
      }
      extension: {
        Args: {
          name: string
        }
        Returns: string
      }
      filename: {
        Args: {
          name: string
        }
        Returns: string
      }
      foldername: {
        Args: {
          name: string
        }
        Returns: string[]
      }
      get_size_by_bucket: {
        Args: Record<PropertyKey, never>
        Returns: {
          size: number
          bucket_id: string
        }[]
      }
      list_multipart_uploads_with_delimiter: {
        Args: {
          bucket_id: string
          prefix_param: string
          delimiter_param: string
          max_keys?: number
          next_key_token?: string
          next_upload_token?: string
        }
        Returns: {
          key: string
          id: string
          created_at: string
        }[]
      }
      list_objects_with_delimiter: {
        Args: {
          bucket_id: string
          prefix_param: string
          delimiter_param: string
          max_keys?: number
          start_after?: string
          next_token?: string
        }
        Returns: {
          name: string
          id: string
          metadata: Json
          updated_at: string
        }[]
      }
      operation: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      search: {
        Args: {
          prefix: string
          bucketname: string
          limits?: number
          levels?: number
          offsets?: number
          search?: string
          sortcolumn?: string
          sortorder?: string
        }
        Returns: {
          name: string
          id: string
          updated_at: string
          created_at: string
          last_accessed_at: string
          metadata: Json
        }[]
      }
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
