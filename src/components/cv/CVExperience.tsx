import { Briefcase, MapPin, Calendar } from "lucide-react";
import { CVData } from "@/data/cvData";

interface CVExperienceProps {
  data: CVData;
  labels: { experience: string };
}

export const CVExperience = ({ data, labels }: CVExperienceProps) => {
  return (
    <section className="cv-card p-6 md:p-8 animate-slide-up delay-300">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 rounded-xl cv-gradient flex items-center justify-center">
          <Briefcase className="w-6 h-6 text-primary-foreground" />
        </div>
        <h2 className="text-2xl md:text-3xl font-bold text-primary">
          {labels.experience}
        </h2>
      </div>

      <div className="space-y-6">
        {data.experience.map((exp, index) => (
          <div 
            key={index}
            className="relative pl-6 border-l-2 border-primary/30"
          >
            <div className="cv-timeline-dot" />
            
            <div className="bg-secondary/30 rounded-xl p-5">
              <h3 className="text-lg font-bold text-primary mb-1">
                {exp.title}
              </h3>
              <p className="font-semibold text-foreground mb-3">
                {exp.company}
              </p>
              
              <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 text-sm text-muted-foreground mb-4">
                <span className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  {exp.period}
                </span>
                <span className="flex items-center gap-1">
                  <MapPin className="w-4 h-4" />
                  {exp.location}
                </span>
              </div>

              <ul className="space-y-2">
                {exp.description.map((desc, i) => (
                  <li 
                    key={i}
                    className="text-sm text-muted-foreground pl-4 relative before:content-['•'] before:absolute before:left-0 before:text-primary before:font-bold"
                  >
                    {desc}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
