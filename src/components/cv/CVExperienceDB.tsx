import { Briefcase } from "lucide-react";
import { useCVExperiences } from "@/hooks/useCVData";

interface CVExperienceDBProps {
  language: "pt" | "en" | "es";
  labels: {
    experience: string;
  };
}

export const CVExperienceDB = ({ language, labels }: CVExperienceDBProps) => {
  const { data: experiences, isLoading } = useCVExperiences();

  if (isLoading) {
    return (
      <section className="cv-card animate-fade-in">
        <h2 className="section-title">
          <Briefcase className="w-5 h-5" />
          {labels.experience}
        </h2>
        <div className="space-y-4">
          {[1, 2].map((i) => (
            <div key={i} className="h-32 bg-muted/50 animate-pulse rounded-lg" />
          ))}
        </div>
      </section>
    );
  }

  if (!experiences || experiences.length === 0) return null;

  const getTitle = (exp: typeof experiences[0]) => {
    switch (language) {
      case "en":
        return exp.title_en;
      case "es":
        return exp.title_es;
      default:
        return exp.title_pt;
    }
  };

  const getDescription = (exp: typeof experiences[0]) => {
    switch (language) {
      case "en":
        return exp.description_en;
      case "es":
        return exp.description_es;
      default:
        return exp.description_pt;
    }
  };

  return (
    <section className="cv-card animate-fade-in">
      <h2 className="section-title">
        <Briefcase className="w-5 h-5" />
        {labels.experience}
      </h2>
      <div className="space-y-6">
        {experiences.map((exp) => (
          <div key={exp.id} className="border-l-2 border-primary/30 pl-4">
            <h3 className="font-semibold text-foreground">{getTitle(exp)}</h3>
            <p className="text-primary font-medium">{exp.company}</p>
            <p className="text-sm text-muted-foreground mb-2">
              {exp.period} | {exp.location}
            </p>
            <ul className="text-sm text-foreground/80 space-y-1">
              {getDescription(exp).map((item, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="text-primary mt-1.5">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
};
