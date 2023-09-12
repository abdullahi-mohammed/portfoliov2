export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[];

export interface Database {
  public: {
    Tables: {
      giftcard_rates: {
        Row: {
          created_at: string | null;
          description: string | null;
          id: number;
          imageUrl: string | null;
          name: string | null;
          rates: Json | null;
        };
        Insert: {
          created_at?: string | null;
          description?: string | null;
          id?: number;
          imageUrl?: string | null;
          name?: string | null;
          rates?: Json | null;
        };
        Update: {
          created_at?: string | null;
          description?: string | null;
          id?: number;
          imageUrl?: string | null;
          name?: string | null;
          rates?: Json | null;
        };
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
}
