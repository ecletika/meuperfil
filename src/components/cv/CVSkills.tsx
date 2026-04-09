import { Wrench } from "lucide-react";
import { CVData } from "@/data/cvData";

interface CVSkillsProps {
  data: CVData;
  labels: { skills: string };
}

export const CVSkills = ({ data, labels }: CVSkillsProps) => {
  return (
    <section className="cv-card p-6 md:p-8 animate-slide-up delay-400">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 rounded-xl cv-gradient flex items-center justify-center">
          <Wrench className="w-6 h-6 text-primary-foreground" />
        </div>
        <h2 className="text-2xl md:text-3xl font-bold text-primary">
          {labels.skills}
        </h2>
      </div>

      <div className="flex flex-wrap gap-3">
        {data.skills.map((skill, index) => (
          <span 
            key={index}
            className="px-4 py-2 bg-secondary text-secondary-foreground rounded-full text-sm font-medium hover:bg-primary hover:text-primary-foreground transition-colors cursor-default"
          >
            {skill}
          </span>
        ))}
      </div>
    </section>
  );
};
