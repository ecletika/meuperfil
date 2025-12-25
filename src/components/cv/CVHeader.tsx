import { Phone, Mail, MapPin, Linkedin, MessageCircle } from "lucide-react";
import { CVData } from "@/data/cvData";
import profilePhoto from "@/assets/mauricio-profile.jpg";

interface CVHeaderProps {
  data: CVData;
  labels: {
    birthDate: string;
    nationality: string;
    phone: string;
    email: string;
    whatsapp: string;
    linkedin: string;
    address: string;
  };
}

export const CVHeader = ({ data, labels }: CVHeaderProps) => {
  return (
    <header className="cv-card p-6 md:p-8 animate-slide-up relative overflow-hidden">
      {/* Gradient top bar */}
      <div className="absolute top-0 left-0 right-0 h-1.5 cv-gradient" />
      
      <div className="flex flex-col md:flex-row items-center gap-6 md:gap-8">
        {/* Profile Photo */}
        <div className="relative">
          <div className="w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden border-4 border-primary/20 shadow-glow">
            <img 
              src={profilePhoto} 
              alt={data.personalInfo.name}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="absolute -bottom-2 -right-2 w-8 h-8 cv-gradient rounded-full flex items-center justify-center">
            <span className="text-primary-foreground text-sm font-bold">✓</span>
          </div>
        </div>

        {/* Name and Basic Info */}
        <div className="flex-1 text-center md:text-left">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold cv-gradient-text mb-4">
            {data.personalInfo.name}
          </h1>
          
          <div className="flex flex-wrap justify-center md:justify-start gap-4 text-sm text-muted-foreground">
            <span>
              <strong className="text-foreground">{labels.birthDate}:</strong> {data.personalInfo.birthDate}
            </span>
            <span className="hidden md:inline">|</span>
            <span>
              <strong className="text-foreground">{labels.nationality}:</strong> {data.personalInfo.nationality}
            </span>
          </div>
        </div>
      </div>

      {/* Contact Info Grid */}
      <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <a 
          href={`tel:${data.personalInfo.phone}`}
          className="flex items-center gap-3 p-3 rounded-lg bg-secondary/50 hover:bg-secondary transition-colors group"
        >
          <div className="w-10 h-10 rounded-full cv-gradient flex items-center justify-center group-hover:scale-110 transition-transform">
            <Phone className="w-5 h-5 text-primary-foreground" />
          </div>
          <div>
            <p className="text-xs text-muted-foreground">{labels.phone}</p>
            <p className="font-medium text-sm">{data.personalInfo.phone}</p>
          </div>
        </a>

        <a 
          href={`mailto:${data.personalInfo.email}`}
          className="flex items-center gap-3 p-3 rounded-lg bg-secondary/50 hover:bg-secondary transition-colors group"
        >
          <div className="w-10 h-10 rounded-full cv-gradient flex items-center justify-center group-hover:scale-110 transition-transform">
            <Mail className="w-5 h-5 text-primary-foreground" />
          </div>
          <div>
            <p className="text-xs text-muted-foreground">{labels.email}</p>
            <p className="font-medium text-sm truncate max-w-[180px]">{data.personalInfo.email}</p>
          </div>
        </a>

        <a 
          href={`https://wa.me/${data.personalInfo.whatsapp.replace(/\+/g, '')}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 p-3 rounded-lg bg-secondary/50 hover:bg-secondary transition-colors group"
        >
          <div className="w-10 h-10 rounded-full cv-gradient flex items-center justify-center group-hover:scale-110 transition-transform">
            <MessageCircle className="w-5 h-5 text-primary-foreground" />
          </div>
          <div>
            <p className="text-xs text-muted-foreground">{labels.whatsapp}</p>
            <p className="font-medium text-sm">{data.personalInfo.whatsapp}</p>
          </div>
        </a>

        <a 
          href={data.personalInfo.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 p-3 rounded-lg bg-secondary/50 hover:bg-secondary transition-colors group"
        >
          <div className="w-10 h-10 rounded-full cv-gradient flex items-center justify-center group-hover:scale-110 transition-transform">
            <Linkedin className="w-5 h-5 text-primary-foreground" />
          </div>
          <div>
            <p className="text-xs text-muted-foreground">{labels.linkedin}</p>
            <p className="font-medium text-sm text-primary hover:underline">LinkedIn Profile</p>
          </div>
        </a>

        <div className="flex items-center gap-3 p-3 rounded-lg bg-secondary/50 sm:col-span-2 lg:col-span-2">
          <div className="w-10 h-10 rounded-full cv-gradient flex items-center justify-center flex-shrink-0">
            <MapPin className="w-5 h-5 text-primary-foreground" />
          </div>
          <div>
            <p className="text-xs text-muted-foreground">{labels.address}</p>
            <p className="font-medium text-sm">{data.personalInfo.address}</p>
          </div>
        </div>
      </div>
    </header>
  );
};
