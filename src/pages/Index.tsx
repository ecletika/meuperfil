import { useState } from "react";
import { LanguageSelector } from "@/components/cv/LanguageSelector";
import { CVHeader } from "@/components/cv/CVHeader";
import { CVEducation } from "@/components/cv/CVEducation";
import { CVLanguages } from "@/components/cv/CVLanguages";
import { CVExperience } from "@/components/cv/CVExperience";
import { CVSkills } from "@/components/cv/CVSkills";
import { DownloadButton } from "@/components/cv/DownloadButton";
import { cvDataPT, cvDataEN, cvDataES, labels, CVData } from "@/data/cvData";

type Language = "pt" | "en" | "es";

const cvDataMap: Record<Language, CVData> = {
  pt: cvDataPT,
  en: cvDataEN,
  es: cvDataES,
};

const Index = () => {
  const [currentLang, setCurrentLang] = useState<Language>("pt");
  
  const cvData = cvDataMap[currentLang];
  const currentLabels = labels[currentLang];

  return (
    <div className="min-h-screen bg-background">
      {/* Fixed Header with Language Selector and Download */}
      <nav className="sticky top-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border py-4">
        <div className="container max-w-4xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <LanguageSelector 
            currentLang={currentLang} 
            onLanguageChange={setCurrentLang} 
          />
          <DownloadButton 
            label={currentLabels.downloadCV}
            targetId="cv-content"
            fileName={`CV_Mauricio_Silva_${currentLang.toUpperCase()}`}
          />
        </div>
      </nav>

      {/* CV Content */}
      <main 
        id="cv-content"
        className="container max-w-4xl mx-auto px-4 py-8 space-y-6"
      >
        <CVHeader data={cvData} labels={currentLabels} />
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <CVEducation data={cvData} labels={currentLabels} />
          <CVLanguages data={cvData} labels={currentLabels} />
        </div>
        
        <CVExperience data={cvData} labels={currentLabels} />
        
        <CVSkills data={cvData} labels={currentLabels} />
      </main>

      {/* Footer */}
      <footer className="border-t border-border py-6 mt-12">
        <div className="container max-w-4xl mx-auto px-4 text-center">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Mauricio da Silva Junior. 
            {currentLang === "pt" && " Todos os direitos reservados."}
            {currentLang === "en" && " All rights reserved."}
            {currentLang === "es" && " Todos los derechos reservados."}
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
