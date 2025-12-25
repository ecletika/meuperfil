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
    <section className="cv-card animate-fade-in h-fit">
      <h2 className="section-title">
        <Languages className="w-5 h-5" />
        {labels.languages}
      </h2>
      <div className="space-y-4">
        {nativeLanguage && (
          <div>
            <p className="text-sm font-medium text-muted-foreground">
              {labels.nativeLanguage}
            </p>
            <p className="font-semibold text-foreground">
              {getLanguageName(nativeLanguage)}
            </p>
          </div>
        )}
        {otherLanguages.length > 0 && (
          <div>
            <p className="text-sm font-medium text-muted-foreground">
              {labels.otherLanguages}
            </p>
            {otherLanguages.map((lang) => (
              <div key={lang.id} className="flex justify-between items-center">
                <span className="text-foreground">{getLanguageName(lang)}</span>
                <span className="text-sm text-muted-foreground">
                  {getLevel(lang)}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
