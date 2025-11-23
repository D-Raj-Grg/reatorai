// Database types generated from Supabase
// Auto-generated on 2025-11-23 via Supabase MCP

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.5"
  }
  public: {
    Tables: {
      channels: {
        Row: {
          avg_engagement_rate: number | null
          avg_view_count: number | null
          channel_handle: string | null
          channel_id: string
          channel_name: string | null
          created_at: string | null
          description: string | null
          id: string
          last_synced_at: string | null
          platform: string | null
          subscriber_count: number | null
          thumbnail_url: string | null
          total_videos: number | null
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          avg_engagement_rate?: number | null
          avg_view_count?: number | null
          channel_handle?: string | null
          channel_id: string
          channel_name?: string | null
          created_at?: string | null
          description?: string | null
          id?: string
          last_synced_at?: string | null
          platform?: string | null
          subscriber_count?: number | null
          thumbnail_url?: string | null
          total_videos?: number | null
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          avg_engagement_rate?: number | null
          avg_view_count?: number | null
          channel_handle?: string | null
          channel_id?: string
          channel_name?: string | null
          created_at?: string | null
          description?: string | null
          id?: string
          last_synced_at?: string | null
          platform?: string | null
          subscriber_count?: number | null
          thumbnail_url?: string | null
          total_videos?: number | null
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      scripts: {
        Row: {
          body_text: string | null
          created_at: string | null
          cta_text: string | null
          estimated_duration: number | null
          full_script: string | null
          hook_format: string | null
          hook_text: string | null
          id: string
          is_favorite: boolean | null
          source_video_id: string | null
          storytelling_framework: string | null
          tokens_used: number | null
          topic: string | null
          updated_at: string | null
          user_id: string | null
          visual_suggestions: string | null
          word_count: number | null
          writing_style_id: string | null
        }
        Insert: {
          body_text?: string | null
          created_at?: string | null
          cta_text?: string | null
          estimated_duration?: number | null
          full_script?: string | null
          hook_format?: string | null
          hook_text?: string | null
          id?: string
          is_favorite?: boolean | null
          source_video_id?: string | null
          storytelling_framework?: string | null
          tokens_used?: number | null
          topic?: string | null
          updated_at?: string | null
          user_id?: string | null
          visual_suggestions?: string | null
          word_count?: number | null
          writing_style_id?: string | null
        }
        Update: {
          body_text?: string | null
          created_at?: string | null
          cta_text?: string | null
          estimated_duration?: number | null
          full_script?: string | null
          hook_format?: string | null
          hook_text?: string | null
          id?: string
          is_favorite?: boolean | null
          source_video_id?: string | null
          storytelling_framework?: string | null
          tokens_used?: number | null
          topic?: string | null
          updated_at?: string | null
          user_id?: string | null
          visual_suggestions?: string | null
          word_count?: number | null
          writing_style_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "scripts_source_video_id_fkey"
            columns: ["source_video_id"]
            isOneToOne: false
            referencedRelation: "videos"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "scripts_writing_style_id_fkey"
            columns: ["writing_style_id"]
            isOneToOne: false
            referencedRelation: "user_writing_styles"
            referencedColumns: ["id"]
          },
        ]
      }
      user_subscriptions: {
        Row: {
          analyses_used_this_month: number | null
          channels_count: number | null
          created_at: string | null
          current_period_end: string | null
          current_period_start: string | null
          id: string
          max_analyses_per_month: number | null
          max_channels: number | null
          max_scripts_per_month: number | null
          plan_type: string | null
          scripts_used_this_month: number | null
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          analyses_used_this_month?: number | null
          channels_count?: number | null
          created_at?: string | null
          current_period_end?: string | null
          current_period_start?: string | null
          id?: string
          max_analyses_per_month?: number | null
          max_channels?: number | null
          max_scripts_per_month?: number | null
          plan_type?: string | null
          scripts_used_this_month?: number | null
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          analyses_used_this_month?: number | null
          channels_count?: number | null
          created_at?: string | null
          current_period_end?: string | null
          current_period_start?: string | null
          id?: string
          max_analyses_per_month?: number | null
          max_channels?: number | null
          max_scripts_per_month?: number | null
          plan_type?: string | null
          scripts_used_this_month?: number | null
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      user_writing_styles: {
        Row: {
          created_at: string | null
          example_text: string | null
          id: string
          is_default: boolean | null
          personality_traits: string[] | null
          sentence_length: string | null
          style_name: string | null
          tone: string | null
          updated_at: string | null
          user_id: string | null
          vocabulary_level: string | null
        }
        Insert: {
          created_at?: string | null
          example_text?: string | null
          id?: string
          is_default?: boolean | null
          personality_traits?: string[] | null
          sentence_length?: string | null
          style_name?: string | null
          tone?: string | null
          updated_at?: string | null
          user_id?: string | null
          vocabulary_level?: string | null
        }
        Update: {
          created_at?: string | null
          example_text?: string | null
          id?: string
          is_default?: boolean | null
          personality_traits?: string[] | null
          sentence_length?: string | null
          style_name?: string | null
          tone?: string | null
          updated_at?: string | null
          user_id?: string | null
          vocabulary_level?: string | null
        }
        Relationships: []
      }
      video_analyses: {
        Row: {
          analyzed_at: string | null
          cta_analysis: string | null
          emotional_triggers: string | null
          full_analysis: string | null
          hook_analysis: string | null
          id: string
          key_takeaways: string | null
          storytelling_analysis: string | null
          tokens_used: number | null
          user_id: string | null
          video_id: string | null
          visual_format: string | null
        }
        Insert: {
          analyzed_at?: string | null
          cta_analysis?: string | null
          emotional_triggers?: string | null
          full_analysis?: string | null
          hook_analysis?: string | null
          id?: string
          key_takeaways?: string | null
          storytelling_analysis?: string | null
          tokens_used?: number | null
          user_id?: string | null
          video_id?: string | null
          visual_format?: string | null
        }
        Update: {
          analyzed_at?: string | null
          cta_analysis?: string | null
          emotional_triggers?: string | null
          full_analysis?: string | null
          hook_analysis?: string | null
          id?: string
          key_takeaways?: string | null
          storytelling_analysis?: string | null
          tokens_used?: number | null
          user_id?: string | null
          video_id?: string | null
          visual_format?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "video_analyses_video_id_fkey"
            columns: ["video_id"]
            isOneToOne: true
            referencedRelation: "videos"
            referencedColumns: ["id"]
          },
        ]
      }
      videos: {
        Row: {
          channel_id: string | null
          comment_count: number | null
          created_at: string | null
          description: string | null
          duration: number | null
          engagement_rate: number | null
          id: string
          is_outlier: boolean | null
          like_count: number | null
          outlier_score: number | null
          platform: string | null
          published_at: string | null
          thumbnail_url: string | null
          title: string
          transcript: string | null
          transcript_fetched_at: string | null
          updated_at: string | null
          video_id: string
          view_count: number | null
        }
        Insert: {
          channel_id?: string | null
          comment_count?: number | null
          created_at?: string | null
          description?: string | null
          duration?: number | null
          engagement_rate?: number | null
          id?: string
          is_outlier?: boolean | null
          like_count?: number | null
          outlier_score?: number | null
          platform?: string | null
          published_at?: string | null
          thumbnail_url?: string | null
          title: string
          transcript?: string | null
          transcript_fetched_at?: string | null
          updated_at?: string | null
          video_id: string
          view_count?: number | null
        }
        Update: {
          channel_id?: string | null
          comment_count?: number | null
          created_at?: string | null
          description?: string | null
          duration?: number | null
          engagement_rate?: number | null
          id?: string
          is_outlier?: boolean | null
          like_count?: number | null
          outlier_score?: number | null
          platform?: string | null
          published_at?: string | null
          thumbnail_url?: string | null
          title?: string
          transcript?: string | null
          transcript_fetched_at?: string | null
          updated_at?: string | null
          video_id?: string
          view_count?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "videos_channel_id_fkey"
            columns: ["channel_id"]
            isOneToOne: false
            referencedRelation: "channels"
            referencedColumns: ["id"]
          },
        ]
      }
      watchlist_channels: {
        Row: {
          added_at: string | null
          channel_id: string | null
          id: string
          watchlist_id: string | null
        }
        Insert: {
          added_at?: string | null
          channel_id?: string | null
          id?: string
          watchlist_id?: string | null
        }
        Update: {
          added_at?: string | null
          channel_id?: string | null
          id?: string
          watchlist_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "watchlist_channels_channel_id_fkey"
            columns: ["channel_id"]
            isOneToOne: false
            referencedRelation: "channels"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "watchlist_channels_watchlist_id_fkey"
            columns: ["watchlist_id"]
            isOneToOne: false
            referencedRelation: "watchlists"
            referencedColumns: ["id"]
          },
        ]
      }
      watchlists: {
        Row: {
          channel_count: number | null
          color: string | null
          created_at: string | null
          description: string | null
          display_order: number | null
          icon: string | null
          id: string
          name: string
          total_outliers: number | null
          total_videos: number | null
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          channel_count?: number | null
          color?: string | null
          created_at?: string | null
          description?: string | null
          display_order?: number | null
          icon?: string | null
          id?: string
          name: string
          total_outliers?: number | null
          total_videos?: number | null
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          channel_count?: number | null
          color?: string | null
          created_at?: string | null
          description?: string | null
          display_order?: number | null
          icon?: string | null
          id?: string
          name?: string
          total_outliers?: number | null
          total_videos?: number | null
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      reset_monthly_usage: { Args: never; Returns: undefined }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
