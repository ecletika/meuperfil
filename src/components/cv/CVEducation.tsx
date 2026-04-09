import { GraduationCap, MapPin, ExternalLink } from "lucide-react";
import { CVData } from "@/data/cvData";

interface CVEducationProps {
  data: CVData;
  labels: { education: string };
}

export const CVEducation = ({ data, labels }: CVEducationProps) => {
  return (
    <section className="cv-card p-6 md:p-8 animate-slide-up delay-100">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 rounded-xl cv-gradient flex items-center justify-center">
          <GraduationCap className="w-6 h-6 text-primary-foreground" />
        </div>
        <h2 className="text-2xl md:text-3xl font-bold text-primary">
          {labels.education}
        </h2>
      </div>

      <div className="space-y-6">
        {data.education.map((edu, index) => (
          <div 
            key={index}
            className="relative pl-6 border-l-2 border-primary/30"
          >
            <div className="cv-timeline-dot" />
            
            <div className="bg-secondary/30 rounded-xl p-5">
              <h3 className="text-lg font-bold text-primary mb-1">
                {edu.institution}
              </h3>
              <p className="font-semibold text-foreground mb-2">
                {edu.degree}
              </p>
              <p className="text-sm text-muted-foreground mb-3">
                {edu.period}
              </p>
              
              <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-sm">
                <span className="flex items-center gap-1 text-muted-foreground">
                  <MapPin className="w-4 h-4" />
                  {edu.location}
                </span>
                <a 
                  href={edu.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 text-primary hover:underline"
                >
                  <ExternalLink className="w-4 h-4" />
                  Website
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
