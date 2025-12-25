import { forwardRef } from "react";
import { Code } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useCVSkills } from "@/hooks/useCVData";

interface CVSkillsDBProps {
  labels: {
    skills: string;
  };
}

export const CVSkillsDB = forwardRef<HTMLElement, CVSkillsDBProps>(
  ({ labels }, ref) => {
    const { data: skills, isLoading } = useCVSkills();

    if (isLoading) {
      return (
        <section ref={ref} className="cv-card animate-fade-in">
          <h2 className="section-title">
            <Code className="w-5 h-5" />
            {labels.skills}
          </h2>
          <div className="flex flex-wrap gap-2">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div
                key={i}
                className="h-8 w-24 bg-muted/50 animate-pulse rounded-full"
              />
            ))}
          </div>
        </section>
      );
    }

    if (!skills || skills.length === 0) return null;

    return (
      <section ref={ref} className="cv-card animate-fade-in">
        <h2 className="section-title">
          <Code className="w-5 h-5" />
          {labels.skills}
        </h2>
        <div className="flex flex-wrap gap-2">
          {skills.map((skill) => (
            <Badge
              key={skill.id}
              variant="secondary"
              className="bg-primary/10 text-primary hover:bg-primary/20 transition-colors px-3 py-1.5"
            >
              {skill.name}
            </Badge>
          ))}
        </div>
      </section>
    );
  }
);

CVSkillsDB.displayName = "CVSkillsDB";
