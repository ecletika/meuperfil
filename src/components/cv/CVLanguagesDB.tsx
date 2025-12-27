import { Languages } from "lucide-react";
import { useCVLanguages } from "@/hooks/useCVData";

interface CVLanguagesDBProps {
  language: "pt" | "en" | "es";
  labels: {
    languages: string;
    nativeLanguage: string;
    otherLanguages: string;
  };
}

export const CVLanguagesDB = ({ language, labels }: CVLanguagesDBProps) => {
  const { data: languages, isLoading } = useCVLanguages();

  if (isLoading) {
    return (
      <section className="cv-card animate-fade-in h-fit">
        <h2 className="section-title">
          <Languages className="w-5 h-5" />
          {labels.languages}
        </h2>
        <div className="space-y-4">
          <div className="h-12 bg-muted/50 animate-pulse rounded-lg" />
        </div>
      </section>
    );
  }

  if (!languages || languages.length === 0) return null;

  const nativeLanguage = languages.find((l) => l.is_native);
  const otherLanguages = languages.filter((l) => !l.is_native);

  const getLanguageName = (lang: typeof languages[0]) => {
    switch (language) {
      case "en":
        return lang.language_en;
      case "es":
        return lang.language_es;
      default:
        return lang.language_pt;
    }
  };

  const getLevel = (lang: typeof languages[0]) => {
    switch (language) {
      case "en":
        return lang.level_en;
      case "es":
        return lang.level_es;
      default:
        return lang.level_pt;
    }
  };

  return (
    <section className="cv-card animate-fade-in h-fit p-6">
      <h2 className="section-title flex items-center gap-2 text-lg font-semibold text-foreground mb-4">
        <Languages className="w-5 h-5 text-primary" />
        {labels.languages}
      </h2>
      <div className="space-y-4">
        {nativeLanguage && (
          <div className="p-3 rounded-lg bg-secondary/50 border-l-4 border-primary">
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-1">
              {labels.nativeLanguage}
            </p>
            <p className="font-semibold text-foreground text-lg">
              {getLanguageName(nativeLanguage)}
            </p>
          </div>
        )}
        {otherLanguages.length > 0 && (
          <div className="space-y-2">
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
              {labels.otherLanguages}
            </p>
            <div className="space-y-2">
              {otherLanguages.map((lang) => (
                <div key={lang.id} className="flex justify-between items-center p-3 rounded-lg bg-secondary/30">
                  <span className="font-medium text-foreground">{getLanguageName(lang)}</span>
                  <span className="text-sm px-3 py-1 rounded-full bg-primary/10 text-primary font-medium">
                    {getLevel(lang)}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
