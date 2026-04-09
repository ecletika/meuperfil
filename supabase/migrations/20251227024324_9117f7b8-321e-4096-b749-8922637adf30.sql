-- Create table for editable contact info
CREATE TABLE public.cv_contact_info (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL DEFAULT 'Mauricio da Silva Junior',
  birth_date TEXT NOT NULL DEFAULT '20/04/1989',
  nationality_pt TEXT NOT NULL DEFAULT 'Brasileira',
  nationality_en TEXT NOT NULL DEFAULT 'Brazilian',
  nationality_es TEXT NOT NULL DEFAULT 'Brasileña',
  phone TEXT NOT NULL DEFAULT '(+351) 913280532',
  phone2 TEXT DEFAULT '+351915280481',
  email TEXT NOT NULL DEFAULT 'mauricio.junior@ecletika.com',
  email2 TEXT DEFAULT 'mauriciociao@gmail.com',
  whatsapp TEXT NOT NULL DEFAULT '+351915280481',
  linkedin TEXT NOT NULL DEFAULT 'https://www.linkedin.com/in/mauricio-da-silva-junior-92b9ba8b/',
  address TEXT NOT NULL DEFAULT 'Rua Elio do Rego 4 - RC Esq 2799-342, Amadora, Portugal, 2700342',
  photo_url TEXT,
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.cv_contact_info ENABLE ROW LEVEL SECURITY;

-- Policies
CREATE POLICY "Public can view contact info"
ON public.cv_contact_info
FOR SELECT
USING (true);

CREATE POLICY "Authenticated users can update contact info"
ON public.cv_contact_info
FOR UPDATE
USING (true);

CREATE POLICY "Authenticated users can insert contact info"
ON public.cv_contact_info
FOR INSERT
WITH CHECK (true);

-- Insert default data
INSERT INTO public.cv_contact_info (
  name, birth_date, nationality_pt, nationality_en, nationality_es,
  phone, phone2, email, email2, whatsapp, linkedin, address
) VALUES (
  'Mauricio da Silva Junior',
  '20/04/1989',
  'Brasileira',
  'Brazilian', 
  'Brasileña',
  '(+351) 913280532',
  '+351915280481',
  'mauricio.junior@ecletika.com',
  'mauriciociao@gmail.com',
  '+351915280481',
  'https://www.linkedin.com/in/mauricio-da-silva-junior-92b9ba8b/',
  'Rua Elio do Rego 4 - RC Esq 2799-342, Amadora, Portugal, 2700342'
);

-- Add Grupo Med experience
INSERT INTO public.cv_experiences (
  title_pt, title_en, title_es,
  company, period, location,
  description_pt, description_en, description_es,
  display_order
) VALUES (
  'Técnico de Suporte de TI',
  'IT Support Technician',
  'Técnico de Soporte de TI',
  'Grupo Med',
  '01/03/2018 – 30/11/2019',
  'Bauru, Brasil',
  ARRAY['Suporte técnico de primeiro e segundo nível', 'Manutenção de computadores e periféricos', 'Administração de rede local', 'Suporte a sistemas hospitalares'],
  ARRAY['First and second level technical support', 'Computer and peripheral maintenance', 'Local network administration', 'Hospital systems support'],
  ARRAY['Soporte técnico de primer y segundo nivel', 'Mantenimiento de computadoras y periféricos', 'Administración de red local', 'Soporte a sistemas hospitalarios'],
  3
);