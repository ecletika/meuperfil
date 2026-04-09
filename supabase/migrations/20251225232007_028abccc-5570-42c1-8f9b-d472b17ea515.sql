-- Create cv_experiences table
CREATE TABLE public.cv_experiences (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title_pt TEXT NOT NULL,
  title_en TEXT NOT NULL,
  title_es TEXT NOT NULL,
  company TEXT NOT NULL,
  period TEXT NOT NULL,
  location TEXT NOT NULL,
  description_pt TEXT[] NOT NULL DEFAULT '{}',
  description_en TEXT[] NOT NULL DEFAULT '{}',
  description_es TEXT[] NOT NULL DEFAULT '{}',
  display_order INT NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create cv_skills table
CREATE TABLE public.cv_skills (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  display_order INT NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create cv_languages table
CREATE TABLE public.cv_languages (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  language_pt TEXT NOT NULL,
  language_en TEXT NOT NULL,
  language_es TEXT NOT NULL,
  level_pt TEXT NOT NULL,
  level_en TEXT NOT NULL,
  level_es TEXT NOT NULL,
  is_native BOOLEAN NOT NULL DEFAULT false,
  display_order INT NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create cv_summary table
CREATE TABLE public.cv_summary (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  summary_pt TEXT NOT NULL,
  summary_en TEXT NOT NULL,
  summary_es TEXT NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.cv_experiences ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.cv_skills ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.cv_languages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.cv_summary ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access
CREATE POLICY "Public can view experiences" ON public.cv_experiences FOR SELECT USING (true);
CREATE POLICY "Public can view skills" ON public.cv_skills FOR SELECT USING (true);
CREATE POLICY "Public can view languages" ON public.cv_languages FOR SELECT USING (true);
CREATE POLICY "Public can view summary" ON public.cv_summary FOR SELECT USING (true);

-- Create policies for authenticated admin access (all authenticated users can manage for now)
CREATE POLICY "Authenticated users can insert experiences" ON public.cv_experiences FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Authenticated users can update experiences" ON public.cv_experiences FOR UPDATE TO authenticated USING (true);
CREATE POLICY "Authenticated users can delete experiences" ON public.cv_experiences FOR DELETE TO authenticated USING (true);

CREATE POLICY "Authenticated users can insert skills" ON public.cv_skills FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Authenticated users can update skills" ON public.cv_skills FOR UPDATE TO authenticated USING (true);
CREATE POLICY "Authenticated users can delete skills" ON public.cv_skills FOR DELETE TO authenticated USING (true);

CREATE POLICY "Authenticated users can insert languages" ON public.cv_languages FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Authenticated users can update languages" ON public.cv_languages FOR UPDATE TO authenticated USING (true);
CREATE POLICY "Authenticated users can delete languages" ON public.cv_languages FOR DELETE TO authenticated USING (true);

CREATE POLICY "Authenticated users can insert summary" ON public.cv_summary FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Authenticated users can update summary" ON public.cv_summary FOR UPDATE TO authenticated USING (true);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Create triggers for automatic timestamp updates
CREATE TRIGGER update_cv_experiences_updated_at
BEFORE UPDATE ON public.cv_experiences
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_cv_summary_updated_at
BEFORE UPDATE ON public.cv_summary
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Insert initial data
INSERT INTO public.cv_summary (summary_pt, summary_en, summary_es) VALUES (
  'Na IT2Advise, o meu papel gira em torno do fortalecimento das infraestruturas de TI com foco na administração de Windows Server e implementação de medidas de segurança de endpoints. As recentes certificações Check Point em Harmony Connect e Quantum Spark sublinham o nosso compromisso com a segurança de rede de topo. A nossa equipa valoriza soluções inovadoras, desde a configuração de firewalls até à implementação de sistemas de backup robustos, garantindo a continuidade operacional e reforçando a confiança dos clientes. Colaborando com colegas, desenvolvemos VPNs e integrámos soluções Omada Controller, refletindo a nossa abordagem estratégica à gestão de redes. Estas iniciativas não só aumentaram a produtividade dentro da nossa organização, como também solidificaram a nossa reputação de fornecer suporte de TI abrangente. As minhas competências analíticas, aperfeiçoadas ao longo de vários anos, desempenham um papel crucial na entrega de soluções de segurança personalizadas que se alinham com a nossa missão de manter operações de TI sem problemas.',
  'At IT2Advise, my role revolves around fortifying IT infrastructures with a focus on Windows Server administration and deploying endpoint security measures. The recent Check Point certifications in Harmony Connect and Quantum Spark underline our commitment to top-tier network security. Our team values innovative solutions, from configuring firewalls to implementing robust backup systems, ensuring operational continuity and reinforcing client confidence. Collaborating with colleagues, we''ve developed VPNs and integrated Omada Controller solutions, reflecting our strategic approach to network management. These initiatives have not only bolstered productivity within our organization but have also solidified our reputation for providing comprehensive IT support. My analytical skills, honed over multiple years, play a crucial role in delivering tailored security solutions that align with our mission to maintain seamless IT operations.',
  'En IT2Advise, mi rol gira en torno al fortalecimiento de las infraestructuras de TI con un enfoque en la administración de Windows Server y el despliegue de medidas de seguridad de endpoints. Las recientes certificaciones Check Point en Harmony Connect y Quantum Spark subrayan nuestro compromiso con la seguridad de red de primer nivel. Nuestro equipo valora las soluciones innovadoras, desde la configuración de firewalls hasta la implementación de sistemas de backup robustos, asegurando la continuidad operativa y reforzando la confianza del cliente. Colaborando con colegas, hemos desarrollado VPNs e integrado soluciones Omada Controller, reflejando nuestro enfoque estratégico para la gestión de redes. Estas iniciativas no solo han aumentado la productividad dentro de nuestra organización, sino que también han solidificado nuestra reputación de proporcionar soporte de TI integral. Mis habilidades analíticas, perfeccionadas a lo largo de varios años, juegan un papel crucial en la entrega de soluciones de seguridad personalizadas que se alinean con nuestra misión de mantener operaciones de TI sin problemas.'
);

INSERT INTO public.cv_languages (language_pt, language_en, language_es, level_pt, level_en, level_es, is_native, display_order) VALUES 
('Português', 'Portuguese', 'Portugués', 'Nativo', 'Native', 'Nativo', true, 1),
('Inglês', 'English', 'Inglés', 'Básico', 'Basic', 'Básico', false, 2);

INSERT INTO public.cv_skills (name, display_order) VALUES 
('Windows, Mac, Linux', 1),
('Office 365', 2),
('Backup (Veeam, ShadowProtect)', 3),
('Windows Server', 4),
('Firewall (Checkpoint)', 5),
('VPN, LAN, WAN', 6),
('Hardware & Software Troubleshooting', 7),
('Check Point Harmony Connect', 8),
('Check Point Quantum Spark', 9),
('Omada Controller', 10),
('Hyper-V', 11),
('Domain Controller Administration', 12);

INSERT INTO public.cv_experiences (title_pt, title_en, title_es, company, period, location, description_pt, description_en, description_es, display_order) VALUES 
(
  'Técnico de Informática',
  'IT Technician',
  'Técnico de Informática',
  'iT2advise',
  '01/09/2022 – Atual',
  'Loures, Portugal',
  ARRAY['Instalação, manutenção, reparação e operação dos sistemas de informação e equipamentos de informática (computadores portáteis, computadores de secretária, servidores, tablets, telefones, equipamentos de comunicação, impressoras e redes periféricas), software (controladores, sistemas operativos, aplicações).', 'Sistemas Operacionais Windows, Mac, Linux', 'Administração de Office 365', 'Sistema de Backup Veeam, ShadowProtect', 'Servidores Windows Server, Linux, Hyper-V, Administração de Controladores de Domínio', 'Firewall - Checkpoint, VPN, LAN, WAN', 'Certificações Check Point: Harmony Connect, Quantum Spark', 'Integração de soluções Omada Controller', 'Sistemas de tickets', 'Troubleshooting de Hardware e software'],
  ARRAY['Installation, maintenance, repair and operation of information systems and IT equipment (laptops, desktop computers, servers, tablets, phones, communication equipment, printers and peripheral networks), software (drivers, operating systems, applications).', 'Windows, Mac, Linux Operating Systems', 'Office 365 Administration', 'Backup Systems: Veeam, ShadowProtect', 'Windows Server, Linux, Hyper-V, Domain Controller Administration', 'Firewall - Checkpoint, VPN, LAN, WAN', 'Check Point Certifications: Harmony Connect, Quantum Spark', 'Omada Controller solutions integration', 'Ticketing Systems', 'Hardware and Software Troubleshooting'],
  ARRAY['Instalación, mantenimiento, reparación y operación de sistemas de información y equipos informáticos (portátiles, ordenadores de escritorio, servidores, tablets, teléfonos, equipos de comunicación, impresoras y redes periféricas), software (controladores, sistemas operativos, aplicaciones).', 'Sistemas Operativos Windows, Mac, Linux', 'Administración de Office 365', 'Sistemas de Backup: Veeam, ShadowProtect', 'Windows Server, Linux, Hyper-V, Administración de Controladores de Dominio', 'Firewall - Checkpoint, VPN, LAN, WAN', 'Certificaciones Check Point: Harmony Connect, Quantum Spark', 'Integración de soluciones Omada Controller', 'Sistemas de tickets', 'Resolución de problemas de Hardware y Software'],
  1
),
(
  'Analista de Telecom',
  'Telecom Analyst',
  'Analista de Telecomunicaciones',
  'PASCHOALOTTO SERVIÇOS FINANCEIROS',
  '15/12/2019 – 10/07/2022',
  'BAURU, Brasil',
  ARRAY['Gestão e manutenção de infraestruturas de telecomunicações', 'Análise e resolução de problemas de rede', 'Suporte técnico a sistemas de comunicação', 'Configuração e monitoramento de equipamentos de rede'],
  ARRAY['Management and maintenance of telecommunications infrastructure', 'Network problem analysis and resolution', 'Technical support for communication systems', 'Network equipment configuration and monitoring'],
  ARRAY['Gestión y mantenimiento de infraestructuras de telecomunicaciones', 'Análisis y resolución de problemas de red', 'Soporte técnico para sistemas de comunicación', 'Configuración y monitoreo de equipos de red'],
  2
);