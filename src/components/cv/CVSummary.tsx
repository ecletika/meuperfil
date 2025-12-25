import { User } from "lucide-react";
import { useCVSummary } from "@/hooks/useCVData";

interface CVSummaryProps {
  language: "pt" | "en" | "es";
  labels: {
    summary: string;
  };
}

export const CVSummary = ({ language, labels }: CVSummaryProps) => {
  const { data: summary, isLoading } = useCVSummary();

  if (isLoading) {
    return (
      <section className="cv-card animate-fade-in">
        <h2 className="section-title">
          <User className="w-5 h-5" />
          {labels.summary}
        </h2>
        <div className="h-24 bg-muted/50 animate-pulse rounded-lg" />
      </section>
    );
  }

  if (!summary) return null;

  const getSummary = () => {
    switch (language) {
      case "en":
        return summary.summary_en;
      case "es":
        return summary.summary_es;
      default:
        return summary.summary_pt;
    }
  };

  return (
    <section className="cv-card animate-fade-in">
      <h2 className="section-title">
        <User className="w-5 h-5" />
        {labels.summary}
      </h2>
      <p className="text-foreground/80 leading-relaxed text-justify">
        {getSummary()}
      </p>
    </section>
  );
};
