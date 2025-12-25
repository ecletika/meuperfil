import { cn } from "@/lib/utils";

type Language = "pt" | "en" | "es";

interface LanguageSelectorProps {
  currentLang: Language;
  onLanguageChange: (lang: Language) => void;
}

const flags = {
  pt: "🇵🇹",
  en: "🇬🇧",
  es: "🇪🇸",
};

const langNames = {
  pt: "Português",
  en: "English",
  es: "Español",
};

export const LanguageSelector = ({ currentLang, onLanguageChange }: LanguageSelectorProps) => {
  const languages: Language[] = ["pt", "en", "es"];

  return (
    <div className="flex items-center justify-center gap-3 animate-fade-in">
      {languages.map((lang) => (
        <button
          key={lang}
          onClick={() => onLanguageChange(lang)}
          className={cn(
            "language-btn flex items-center gap-2 text-sm md:text-base",
            currentLang === lang ? "language-btn-active" : "language-btn-inactive"
          )}
        >
          <span className="text-lg md:text-xl">{flags[lang]}</span>
          <span className="hidden sm:inline">{langNames[lang]}</span>
        </button>
      ))}
    </div>
  );
};
