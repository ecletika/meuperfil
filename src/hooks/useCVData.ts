import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export interface CVExperience {
  id: string;
  title_pt: string;
  title_en: string;
  title_es: string;
  company: string;
  period: string;
  location: string;
  description_pt: string[];
  description_en: string[];
  description_es: string[];
  display_order: number;
}

export interface CVSkill {
  id: string;
  name: string;
  display_order: number;
}

export interface CVLanguage {
  id: string;
  language_pt: string;
  language_en: string;
  language_es: string;
  level_pt: string;
  level_en: string;
  level_es: string;
  is_native: boolean;
  display_order: number;
}

export interface CVSummary {
  id: string;
  summary_pt: string;
  summary_en: string;
  summary_es: string;
}

export interface CVContactInfo {
  id: string;
  name: string;
  birth_date: string;
  nationality_pt: string;
  nationality_en: string;
  nationality_es: string;
  phone: string;
  phone2: string | null;
  email: string;
  email2: string | null;
  whatsapp: string;
  linkedin: string;
  address: string;
  photo_url: string | null;
}

export const useCVExperiences = () => {
  return useQuery({
    queryKey: ["cv-experiences"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("cv_experiences")
        .select("*")
        .order("display_order", { ascending: true });
      
      if (error) throw error;
      return data as CVExperience[];
    },
  });
};

export const useCVSkills = () => {
  return useQuery({
    queryKey: ["cv-skills"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("cv_skills")
        .select("*")
        .order("display_order", { ascending: true });
      
      if (error) throw error;
      return data as CVSkill[];
    },
  });
};

export const useCVLanguages = () => {
  return useQuery({
    queryKey: ["cv-languages"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("cv_languages")
        .select("*")
        .order("display_order", { ascending: true });
      
      if (error) throw error;
      return data as CVLanguage[];
    },
  });
};

export const useCVSummary = () => {
  return useQuery({
    queryKey: ["cv-summary"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("cv_summary")
        .select("*")
        .maybeSingle();
      
      if (error) throw error;
      return data as CVSummary | null;
    },
  });
};

export const useCVContactInfo = () => {
  return useQuery({
    queryKey: ["cv-contact-info"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("cv_contact_info")
        .select("*")
        .maybeSingle();
      
      if (error) throw error;
      return data as CVContactInfo | null;
    },
  });
};
