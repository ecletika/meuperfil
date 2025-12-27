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
    PostgrestVersion: "14.1"
  }
  public: {
    Tables: {
      cv_contact_info: {
        Row: {
          address: string
          birth_date: string
          email: string
          email2: string | null
          id: string
          linkedin: string
          name: string
          nationality_en: string
          nationality_es: string
          nationality_pt: string
          phone: string
          phone2: string | null
          photo_url: string | null
          updated_at: string
          whatsapp: string
        }
        Insert: {
          address?: string
          birth_date?: string
          email?: string
          email2?: string | null
          id?: string
          linkedin?: string
          name?: string
          nationality_en?: string
          nationality_es?: string
          nationality_pt?: string
          phone?: string
          phone2?: string | null
          photo_url?: string | null
          updated_at?: string
          whatsapp?: string
        }
        Update: {
          address?: string
          birth_date?: string
          email?: string
          email2?: string | null
          id?: string
          linkedin?: string
          name?: string
          nationality_en?: string
          nationality_es?: string
          nationality_pt?: string
          phone?: string
          phone2?: string | null
          photo_url?: string | null
          updated_at?: string
          whatsapp?: string
        }
        Relationships: []
      }
      cv_experiences: {
        Row: {
          company: string
          created_at: string
          description_en: string[]
          description_es: string[]
          description_pt: string[]
          display_order: number
          id: string
          location: string
          period: string
          title_en: string
          title_es: string
          title_pt: string
          updated_at: string
        }
        Insert: {
          company: string
          created_at?: string
          description_en?: string[]
          description_es?: string[]
          description_pt?: string[]
          display_order?: number
          id?: string
          location: string
          period: string
          title_en: string
          title_es: string
          title_pt: string
          updated_at?: string
        }
        Update: {
          company?: string
          created_at?: string
          description_en?: string[]
          description_es?: string[]
          description_pt?: string[]
          display_order?: number
          id?: string
          location?: string
          period?: string
          title_en?: string
          title_es?: string
          title_pt?: string
          updated_at?: string
        }
        Relationships: []
      }
      cv_languages: {
        Row: {
          created_at: string
          display_order: number
          id: string
          is_native: boolean
          language_en: string
          language_es: string
          language_pt: string
          level_en: string
          level_es: string
          level_pt: string
        }
        Insert: {
          created_at?: string
          display_order?: number
          id?: string
          is_native?: boolean
          language_en: string
          language_es: string
          language_pt: string
          level_en: string
          level_es: string
          level_pt: string
        }
        Update: {
          created_at?: string
          display_order?: number
          id?: string
          is_native?: boolean
          language_en?: string
          language_es?: string
          language_pt?: string
          level_en?: string
          level_es?: string
          level_pt?: string
        }
        Relationships: []
      }
      cv_skills: {
        Row: {
          created_at: string
          display_order: number
          id: string
          name: string
        }
        Insert: {
          created_at?: string
          display_order?: number
          id?: string
          name: string
        }
        Update: {
          created_at?: string
          display_order?: number
          id?: string
          name?: string
        }
        Relationships: []
      }
      cv_summary: {
        Row: {
          id: string
          summary_en: string
          summary_es: string
          summary_pt: string
          updated_at: string
        }
        Insert: {
          id?: string
          summary_en: string
          summary_es: string
          summary_pt: string
          updated_at?: string
        }
        Update: {
          id?: string
          summary_en?: string
          summary_es?: string
          summary_pt?: string
          updated_at?: string
        }
        Relationships: []
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
