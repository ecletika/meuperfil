import { Languages } from "lucide-react";
import { CVData } from "@/data/cvData";

interface CVLanguagesProps {
  data: CVData;
  labels: {
    languages: string;
    nativeLanguage: string;
    otherLanguages: string;
  };
}

export const CVLanguages = ({ data, labels }: CVLanguagesProps) => {
  return (
    <section className="cv-card p-6 md:p-8 animate-slide-up delay-200">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 rounded-xl cv-gradient flex items-center justify-center">
          <Languages className="w-6 h-6 text-primary-foreground" />
        </div>
        <h2 className="text-2xl md:text-3xl font-bold text-primary">
          {labels.languages}
        </h2>
      </div>

      <div className="space-y-4">
        <div className="bg-secondary/30 rounded-xl p-4">
          <p className="text-sm text-muted-foreground mb-1">{labels.nativeLanguage}</p>
          <p className="font-semibold text-primary text-lg">{data.languages.native}</p>
        </div>

        {data.languages.others.length > 0 && (
          <div className="bg-secondary/30 rounded-xl p-4">
            <p className="text-sm text-muted-foreground mb-2">{labels.otherLanguages}</p>
            <div className="space-y-2">
              {data.languages.others.map((lang, index) => (
                <div key={index} className="flex items-center justify-between">
                  <span className="font-semibold text-primary">{lang.language}</span>
                  <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm">
                    {lang.level}
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
