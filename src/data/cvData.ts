export interface CVData {
  personalInfo: {
    name: string;
    birthDate: string;
    nationality: string;
    phone: string;
    email: string;
    email2: string;
    whatsapp: string;
    linkedin: string;
    address: string;
  };
  education: {
    institution: string;
    degree: string;
    period: string;
    location: string;
    website: string;
  }[];
  languages: {
    native: string;
    others: { language: string; level: string }[];
  };
  experience: {
    title: string;
    company: string;
    period: string;
    location: string;
    description: string[];
  }[];
  skills: string[];
}

export const cvDataPT: CVData = {
  personalInfo: {
    name: "Mauricio da Silva Junior",
    birthDate: "20/04/1989",
    nationality: "Brasileira",
    phone: "(+351) 913280532",
    email: "mauricio.junior@ecletika.com",
    email2: "mauriciociao@gmail.com",
    whatsapp: "+351915280481",
    linkedin: "https://www.linkedin.com/in/mauricio-da-silva-junior-92b9ba8b/",
    address: "Rua Elio do Rego 4 - RC Esq 2799-342, Amadora, Portugal, 2700342",
  },
  education: [
    {
      institution: "FACULDADE ANHANGUERA S.A",
      degree: "GESTÃO DA TECNOLOGIA DA INFORMAÇÃO",
      period: "09/01/2013 – 29/06/2015",
      location: "Av. Moussa Nakhl Tobias, 333, BAURU, Brasil",
      website: "https://www.anhanguera.com/",
    },
  ],
  languages: {
    native: "Português",
    others: [{ language: "Inglês", level: "Básico" }],
  },
  experience: [
    {
      title: "Técnico de Informática",
      company: "iT2advise",
      period: "01/09/2022 – Atual",
      location: "Loures, Portugal",
      description: [
        "Instalação, manutenção, reparação e operação dos sistemas de informação e equipamentos de informática (computadores portáteis, computadores de secretária, servidores, tablets, telefones, equipamentos de comunicação, impressoras e redes periféricas), software (controladores, sistemas operativos, aplicações).",
        "Sistemas Operacionais Windows, Mac, Linux",
        "Administração de Office 365",
        "Sistema de Backup Veeam, ShadowProtect",
        "Servidores Windows Server, Linux, Harper-V, Administração de Controladores de Domínio",
        "Firewall - Checkpoint, VPN, LAN, WAN",
        "Sistemas de tickets",
        "Troubleshooting de Hardware e software",
      ],
    },
    {
      title: "Analista de Telecom",
      company: "PASCHOALOTTO SERVIÇOS FINANCEIROS",
      period: "15/12/2019 – 10/07/2022",
      location: "BAURU, Brasil",
      description: [
        "Gestão e manutenção de infraestruturas de telecomunicações",
        "Análise e resolução de problemas de rede",
        "Suporte técnico a sistemas de comunicação",
      ],
    },
  ],
  skills: [
    "Windows, Mac, Linux",
    "Office 365",
    "Backup (Veeam, ShadowProtect)",
    "Windows Server",
    "Firewall (Checkpoint)",
    "VPN, LAN, WAN",
    "Hardware & Software Troubleshooting",
  ],
};

export const cvDataEN: CVData = {
  personalInfo: {
    name: "Mauricio da Silva Junior",
    birthDate: "04/20/1989",
    nationality: "Brazilian",
    phone: "(+351) 913280532",
    email: "mauricio.junior@ecletika.com",
    email2: "mauriciociao@gmail.com",
    whatsapp: "+351915280481",
    linkedin: "https://www.linkedin.com/in/mauricio-da-silva-junior-92b9ba8b/",
    address: "Rua Elio do Rego 4 - RC Esq 2799-342, Amadora, Portugal, 2700342",
  },
  education: [
    {
      institution: "ANHANGUERA UNIVERSITY",
      degree: "INFORMATION TECHNOLOGY MANAGEMENT",
      period: "01/09/2013 – 06/29/2015",
      location: "Av. Moussa Nakhl Tobias, 333, BAURU, Brazil",
      website: "https://www.anhanguera.com/",
    },
  ],
  languages: {
    native: "Portuguese",
    others: [{ language: "English", level: "Basic" }],
  },
  experience: [
    {
      title: "IT Technician",
      company: "iT2advise",
      period: "09/01/2022 – Present",
      location: "Loures, Portugal",
      description: [
        "Installation, maintenance, repair and operation of information systems and IT equipment (laptops, desktop computers, servers, tablets, phones, communication equipment, printers and peripheral networks), software (drivers, operating systems, applications).",
        "Windows, Mac, Linux Operating Systems",
        "Office 365 Administration",
        "Backup Systems: Veeam, ShadowProtect",
        "Windows Server, Linux, Hyper-V, Domain Controller Administration",
        "Firewall - Checkpoint, VPN, LAN, WAN",
        "Ticketing Systems",
        "Hardware and Software Troubleshooting",
      ],
    },
    {
      title: "Telecom Analyst",
      company: "PASCHOALOTTO FINANCIAL SERVICES",
      period: "12/15/2019 – 07/10/2022",
      location: "BAURU, Brazil",
      description: [
        "Management and maintenance of telecommunications infrastructure",
        "Network problem analysis and resolution",
        "Technical support for communication systems",
      ],
    },
  ],
  skills: [
    "Windows, Mac, Linux",
    "Office 365",
    "Backup (Veeam, ShadowProtect)",
    "Windows Server",
    "Firewall (Checkpoint)",
    "VPN, LAN, WAN",
    "Hardware & Software Troubleshooting",
  ],
};

export const cvDataES: CVData = {
  personalInfo: {
    name: "Mauricio da Silva Junior",
    birthDate: "20/04/1989",
    nationality: "Brasileña",
    phone: "(+351) 913280532",
    email: "mauricio.junior@ecletika.com",
    email2: "mauriciociao@gmail.com",
    whatsapp: "+351915280481",
    linkedin: "https://www.linkedin.com/in/mauricio-da-silva-junior-92b9ba8b/",
    address: "Rua Elio do Rego 4 - RC Esq 2799-342, Amadora, Portugal, 2700342",
  },
  education: [
    {
      institution: "UNIVERSIDAD ANHANGUERA",
      degree: "GESTIÓN DE TECNOLOGÍA DE LA INFORMACIÓN",
      period: "09/01/2013 – 29/06/2015",
      location: "Av. Moussa Nakhl Tobias, 333, BAURU, Brasil",
      website: "https://www.anhanguera.com/",
    },
  ],
  languages: {
    native: "Portugués",
    others: [{ language: "Inglés", level: "Básico" }],
  },
  experience: [
    {
      title: "Técnico de Informática",
      company: "iT2advise",
      period: "01/09/2022 – Actual",
      location: "Loures, Portugal",
      description: [
        "Instalación, mantenimiento, reparación y operación de sistemas de información y equipos informáticos (portátiles, ordenadores de escritorio, servidores, tablets, teléfonos, equipos de comunicación, impresoras y redes periféricas), software (controladores, sistemas operativos, aplicaciones).",
        "Sistemas Operativos Windows, Mac, Linux",
        "Administración de Office 365",
        "Sistemas de Backup: Veeam, ShadowProtect",
        "Windows Server, Linux, Hyper-V, Administración de Controladores de Dominio",
        "Firewall - Checkpoint, VPN, LAN, WAN",
        "Sistemas de tickets",
        "Resolución de problemas de Hardware y Software",
      ],
    },
    {
      title: "Analista de Telecomunicaciones",
      company: "PASCHOALOTTO SERVICIOS FINANCIEROS",
      period: "15/12/2019 – 10/07/2022",
      location: "BAURU, Brasil",
      description: [
        "Gestión y mantenimiento de infraestructuras de telecomunicaciones",
        "Análisis y resolución de problemas de red",
        "Soporte técnico para sistemas de comunicación",
      ],
    },
  ],
  skills: [
    "Windows, Mac, Linux",
    "Office 365",
    "Backup (Veeam, ShadowProtect)",
    "Windows Server",
    "Firewall (Checkpoint)",
    "VPN, LAN, WAN",
    "Resolución de problemas de Hardware y Software",
  ],
};

export const labels = {
  pt: {
    birthDate: "Data de nascimento",
    nationality: "Nacionalidade",
    phone: "Telemóvel",
    email: "Email",
    whatsapp: "WhatsApp",
    linkedin: "LinkedIn",
    address: "Morada",
    education: "Educação e Formação",
    languages: "Competências Linguísticas",
    nativeLanguage: "Língua materna",
    otherLanguages: "Outras línguas",
    experience: "Experiência Profissional",
    skills: "Competências Técnicas",
    downloadCV: "Descarregar CV",
    present: "Atual",
  },
  en: {
    birthDate: "Date of Birth",
    nationality: "Nationality",
    phone: "Mobile",
    email: "Email",
    whatsapp: "WhatsApp",
    linkedin: "LinkedIn",
    address: "Address",
    education: "Education and Training",
    languages: "Language Skills",
    nativeLanguage: "Native Language",
    otherLanguages: "Other Languages",
    experience: "Professional Experience",
    skills: "Technical Skills",
    downloadCV: "Download CV",
    present: "Present",
  },
  es: {
    birthDate: "Fecha de nacimiento",
    nationality: "Nacionalidad",
    phone: "Teléfono",
    email: "Correo electrónico",
    whatsapp: "WhatsApp",
    linkedin: "LinkedIn",
    address: "Dirección",
    education: "Educación y Formación",
    languages: "Competencias Lingüísticas",
    nativeLanguage: "Lengua materna",
    otherLanguages: "Otros idiomas",
    experience: "Experiencia Profesional",
    skills: "Competencias Técnicas",
    downloadCV: "Descargar CV",
    present: "Actual",
  },
};
