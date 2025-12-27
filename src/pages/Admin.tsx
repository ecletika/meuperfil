import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { useCVExperiences, useCVSkills, useCVLanguages, useCVSummary, useCVContactInfo } from "@/hooks/useCVData";
import { supabase } from "@/integrations/supabase/client";
import { useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { 
  ArrowLeft, 
  LogOut, 
  Plus, 
  Trash2, 
  Save,
  Briefcase,
  Code,
  Languages,
  User,
  Loader2,
  Contact,
  Camera
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";

const Admin = () => {
  const { user, loading, signOut } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: experiences, isLoading: expLoading } = useCVExperiences();
  const { data: skills, isLoading: skillsLoading } = useCVSkills();
  const { data: languages, isLoading: langLoading } = useCVLanguages();
  const { data: summary, isLoading: summaryLoading } = useCVSummary();
  const { data: contactInfo, isLoading: contactLoading } = useCVContactInfo();

  const [isSaving, setIsSaving] = useState(false);

  // Experience form state
  const [newExp, setNewExp] = useState({
    title_pt: "",
    title_en: "",
    title_es: "",
    company: "",
    period: "",
    location: "",
    description_pt: "",
    description_en: "",
    description_es: "",
  });

  // Skill form state
  const [newSkill, setNewSkill] = useState("");

  // Language form state
  const [newLang, setNewLang] = useState({
    language_pt: "",
    language_en: "",
    language_es: "",
    level_pt: "",
    level_en: "",
    level_es: "",
    is_native: false,
  });

  // Summary form state
  const [editSummary, setEditSummary] = useState({
    summary_pt: "",
    summary_en: "",
    summary_es: "",
  });

  // Contact form state
  const [editContact, setEditContact] = useState({
    name: "",
    birth_date: "",
    nationality_pt: "",
    nationality_en: "",
    nationality_es: "",
    phone: "",
    phone2: "",
    email: "",
    email2: "",
    whatsapp: "",
    linkedin: "",
    address: "",
    photo_url: "",
  });

  useEffect(() => {
    if (!loading && !user) {
      navigate("/auth");
    }
  }, [user, loading, navigate]);

  useEffect(() => {
    if (summary) {
      setEditSummary({
        summary_pt: summary.summary_pt,
        summary_en: summary.summary_en,
        summary_es: summary.summary_es,
      });
    }
  }, [summary]);

  useEffect(() => {
    if (contactInfo) {
      setEditContact({
        name: contactInfo.name,
        birth_date: contactInfo.birth_date,
        nationality_pt: contactInfo.nationality_pt,
        nationality_en: contactInfo.nationality_en,
        nationality_es: contactInfo.nationality_es,
        phone: contactInfo.phone,
        phone2: contactInfo.phone2 || "",
        email: contactInfo.email,
        email2: contactInfo.email2 || "",
        whatsapp: contactInfo.whatsapp,
        linkedin: contactInfo.linkedin,
        address: contactInfo.address,
        photo_url: contactInfo.photo_url || "",
      });
    }
  }, [contactInfo]);

  const handleSignOut = async () => {
    await signOut();
    navigate("/");
  };

  const handleAddExperience = async () => {
    if (!newExp.title_pt || !newExp.company) {
      toast({
        title: "Erro",
        description: "Título e empresa são obrigatórios",
        variant: "destructive",
      });
      return;
    }

    setIsSaving(true);
    const { error } = await supabase.from("cv_experiences").insert({
      title_pt: newExp.title_pt,
      title_en: newExp.title_en || newExp.title_pt,
      title_es: newExp.title_es || newExp.title_pt,
      company: newExp.company,
      period: newExp.period,
      location: newExp.location,
      description_pt: newExp.description_pt.split("\n").filter(Boolean),
      description_en: newExp.description_en.split("\n").filter(Boolean),
      description_es: newExp.description_es.split("\n").filter(Boolean),
      display_order: (experiences?.length || 0) + 1,
    });

    setIsSaving(false);

    if (error) {
      toast({
        title: "Erro",
        description: error.message,
        variant: "destructive",
      });
    } else {
      toast({
        title: "Sucesso",
        description: "Experiência adicionada",
      });
      setNewExp({
        title_pt: "",
        title_en: "",
        title_es: "",
        company: "",
        period: "",
        location: "",
        description_pt: "",
        description_en: "",
        description_es: "",
      });
      queryClient.invalidateQueries({ queryKey: ["cv-experiences"] });
    }
  };

  const handleDeleteExperience = async (id: string) => {
    const { error } = await supabase.from("cv_experiences").delete().eq("id", id);
    if (error) {
      toast({
        title: "Erro",
        description: error.message,
        variant: "destructive",
      });
    } else {
      toast({
        title: "Sucesso",
        description: "Experiência removida",
      });
      queryClient.invalidateQueries({ queryKey: ["cv-experiences"] });
    }
  };

  const handleAddSkill = async () => {
    if (!newSkill) return;

    setIsSaving(true);
    const { error } = await supabase.from("cv_skills").insert({
      name: newSkill,
      display_order: (skills?.length || 0) + 1,
    });
    setIsSaving(false);

    if (error) {
      toast({
        title: "Erro",
        description: error.message,
        variant: "destructive",
      });
    } else {
      toast({
        title: "Sucesso",
        description: "Competência adicionada",
      });
      setNewSkill("");
      queryClient.invalidateQueries({ queryKey: ["cv-skills"] });
    }
  };

  const handleDeleteSkill = async (id: string) => {
    const { error } = await supabase.from("cv_skills").delete().eq("id", id);
    if (error) {
      toast({
        title: "Erro",
        description: error.message,
        variant: "destructive",
      });
    } else {
      toast({
        title: "Sucesso",
        description: "Competência removida",
      });
      queryClient.invalidateQueries({ queryKey: ["cv-skills"] });
    }
  };

  const handleAddLanguage = async () => {
    if (!newLang.language_pt) {
      toast({
        title: "Erro",
        description: "Nome do idioma é obrigatório",
        variant: "destructive",
      });
      return;
    }

    setIsSaving(true);
    const { error } = await supabase.from("cv_languages").insert({
      ...newLang,
      language_en: newLang.language_en || newLang.language_pt,
      language_es: newLang.language_es || newLang.language_pt,
      level_en: newLang.level_en || newLang.level_pt,
      level_es: newLang.level_es || newLang.level_pt,
      display_order: (languages?.length || 0) + 1,
    });
    setIsSaving(false);

    if (error) {
      toast({
        title: "Erro",
        description: error.message,
        variant: "destructive",
      });
    } else {
      toast({
        title: "Sucesso",
        description: "Idioma adicionado",
      });
      setNewLang({
        language_pt: "",
        language_en: "",
        language_es: "",
        level_pt: "",
        level_en: "",
        level_es: "",
        is_native: false,
      });
      queryClient.invalidateQueries({ queryKey: ["cv-languages"] });
    }
  };

  const handleDeleteLanguage = async (id: string) => {
    const { error } = await supabase.from("cv_languages").delete().eq("id", id);
    if (error) {
      toast({
        title: "Erro",
        description: error.message,
        variant: "destructive",
      });
    } else {
      toast({
        title: "Sucesso",
        description: "Idioma removido",
      });
      queryClient.invalidateQueries({ queryKey: ["cv-languages"] });
    }
  };

  const handleUpdateSummary = async () => {
    if (!summary) return;

    setIsSaving(true);
    const { error } = await supabase
      .from("cv_summary")
      .update(editSummary)
      .eq("id", summary.id);
    setIsSaving(false);

    if (error) {
      toast({
        title: "Erro",
        description: error.message,
        variant: "destructive",
      });
    } else {
      toast({
        title: "Sucesso",
        description: "Resumo atualizado",
      });
      queryClient.invalidateQueries({ queryKey: ["cv-summary"] });
    }
  };

  const handleUpdateContact = async () => {
    if (!contactInfo) return;

    setIsSaving(true);
    const { error } = await supabase
      .from("cv_contact_info")
      .update({
        ...editContact,
        phone2: editContact.phone2 || null,
        email2: editContact.email2 || null,
        photo_url: editContact.photo_url || null,
      })
      .eq("id", contactInfo.id);
    setIsSaving(false);

    if (error) {
      toast({
        title: "Erro",
        description: error.message,
        variant: "destructive",
      });
    } else {
      toast({
        title: "Sucesso",
        description: "Informações de contato atualizadas",
      });
      queryClient.invalidateQueries({ queryKey: ["cv-contact-info"] });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="min-h-screen bg-background">
      <nav className="sticky top-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border py-4">
        <div className="container max-w-4xl mx-auto px-4 flex items-center justify-between">
          <Button variant="ghost" onClick={() => navigate("/")}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Ver CV
          </Button>
          <h1 className="text-xl font-bold">Painel Admin</h1>
          <Button variant="outline" onClick={handleSignOut}>
            <LogOut className="w-4 h-4 mr-2" />
            Sair
          </Button>
        </div>
      </nav>

      <main className="container max-w-4xl mx-auto px-4 py-8">
        <Tabs defaultValue="contact" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="contact" className="gap-2">
              <Contact className="w-4 h-4" />
              <span className="hidden sm:inline">Contato</span>
            </TabsTrigger>
            <TabsTrigger value="summary" className="gap-2">
              <User className="w-4 h-4" />
              <span className="hidden sm:inline">Resumo</span>
            </TabsTrigger>
            <TabsTrigger value="experiences" className="gap-2">
              <Briefcase className="w-4 h-4" />
              <span className="hidden sm:inline">Experiências</span>
            </TabsTrigger>
            <TabsTrigger value="skills" className="gap-2">
              <Code className="w-4 h-4" />
              <span className="hidden sm:inline">Competências</span>
            </TabsTrigger>
            <TabsTrigger value="languages" className="gap-2">
              <Languages className="w-4 h-4" />
              <span className="hidden sm:inline">Idiomas</span>
            </TabsTrigger>
          </TabsList>

          {/* Contact Tab */}
          <TabsContent value="contact" className="space-y-4">
            <div className="cv-card p-6">
              <h2 className="text-lg font-semibold mb-4">Informações de Contato</h2>
              
              {contactLoading ? (
                <div className="h-96 bg-muted/50 animate-pulse rounded-lg" />
              ) : (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label>Nome</Label>
                      <Input
                        value={editContact.name}
                        onChange={(e) =>
                          setEditContact({ ...editContact, name: e.target.value })
                        }
                      />
                    </div>
                    <div>
                      <Label>Data de Nascimento</Label>
                      <Input
                        value={editContact.birth_date}
                        onChange={(e) =>
                          setEditContact({ ...editContact, birth_date: e.target.value })
                        }
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <Label>Nacionalidade (PT)</Label>
                      <Input
                        value={editContact.nationality_pt}
                        onChange={(e) =>
                          setEditContact({ ...editContact, nationality_pt: e.target.value })
                        }
                      />
                    </div>
                    <div>
                      <Label>Nacionalidade (EN)</Label>
                      <Input
                        value={editContact.nationality_en}
                        onChange={(e) =>
                          setEditContact({ ...editContact, nationality_en: e.target.value })
                        }
                      />
                    </div>
                    <div>
                      <Label>Nacionalidade (ES)</Label>
                      <Input
                        value={editContact.nationality_es}
                        onChange={(e) =>
                          setEditContact({ ...editContact, nationality_es: e.target.value })
                        }
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label>Telefone Principal</Label>
                      <Input
                        value={editContact.phone}
                        onChange={(e) =>
                          setEditContact({ ...editContact, phone: e.target.value })
                        }
                      />
                    </div>
                    <div>
                      <Label>Telefone Secundário</Label>
                      <Input
                        value={editContact.phone2}
                        onChange={(e) =>
                          setEditContact({ ...editContact, phone2: e.target.value })
                        }
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label>Email Principal</Label>
                      <Input
                        value={editContact.email}
                        onChange={(e) =>
                          setEditContact({ ...editContact, email: e.target.value })
                        }
                      />
                    </div>
                    <div>
                      <Label>Email Secundário</Label>
                      <Input
                        value={editContact.email2}
                        onChange={(e) =>
                          setEditContact({ ...editContact, email2: e.target.value })
                        }
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label>WhatsApp</Label>
                      <Input
                        value={editContact.whatsapp}
                        onChange={(e) =>
                          setEditContact({ ...editContact, whatsapp: e.target.value })
                        }
                      />
                    </div>
                    <div>
                      <Label>LinkedIn URL</Label>
                      <Input
                        value={editContact.linkedin}
                        onChange={(e) =>
                          setEditContact({ ...editContact, linkedin: e.target.value })
                        }
                      />
                    </div>
                  </div>

                  <div>
                    <Label>Morada</Label>
                    <Input
                      value={editContact.address}
                      onChange={(e) =>
                        setEditContact({ ...editContact, address: e.target.value })
                      }
                    />
                  </div>

                  <div>
                    <Label>URL da Foto (opcional)</Label>
                    <Input
                      value={editContact.photo_url}
                      onChange={(e) =>
                        setEditContact({ ...editContact, photo_url: e.target.value })
                      }
                      placeholder="https://exemplo.com/minha-foto.jpg"
                    />
                    <p className="text-xs text-muted-foreground mt-1">
                      Deixe em branco para usar a foto padrão
                    </p>
                  </div>

                  <Button onClick={handleUpdateContact} disabled={isSaving}>
                    {isSaving ? (
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    ) : (
                      <Save className="w-4 h-4 mr-2" />
                    )}
                    Salvar Contato
                  </Button>
                </div>
              )}
            </div>
          </TabsContent>

          {/* Summary Tab */}
          <TabsContent value="summary" className="space-y-4">
            <div className="cv-card p-6">
              <h2 className="text-lg font-semibold mb-4">Resumo Profissional</h2>
              
              {summaryLoading ? (
                <div className="h-48 bg-muted/50 animate-pulse rounded-lg" />
              ) : (
                <div className="space-y-4">
                  <div>
                    <Label>Português</Label>
                    <Textarea
                      value={editSummary.summary_pt}
                      onChange={(e) =>
                        setEditSummary({ ...editSummary, summary_pt: e.target.value })
                      }
                      rows={4}
                    />
                  </div>
                  <div>
                    <Label>Inglês</Label>
                    <Textarea
                      value={editSummary.summary_en}
                      onChange={(e) =>
                        setEditSummary({ ...editSummary, summary_en: e.target.value })
                      }
                      rows={4}
                    />
                  </div>
                  <div>
                    <Label>Espanhol</Label>
                    <Textarea
                      value={editSummary.summary_es}
                      onChange={(e) =>
                        setEditSummary({ ...editSummary, summary_es: e.target.value })
                      }
                      rows={4}
                    />
                  </div>
                  <Button onClick={handleUpdateSummary} disabled={isSaving}>
                    {isSaving ? (
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    ) : (
                      <Save className="w-4 h-4 mr-2" />
                    )}
                    Salvar Resumo
                  </Button>
                </div>
              )}
            </div>
          </TabsContent>

          {/* Experiences Tab */}
          <TabsContent value="experiences" className="space-y-4">
            <div className="cv-card p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold">Experiências Profissionais</h2>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button>
                      <Plus className="w-4 h-4 mr-2" />
                      Adicionar
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                      <DialogTitle>Nova Experiência</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                          <Label>Título (PT)</Label>
                          <Input
                            value={newExp.title_pt}
                            onChange={(e) =>
                              setNewExp({ ...newExp, title_pt: e.target.value })
                            }
                          />
                        </div>
                        <div>
                          <Label>Título (EN)</Label>
                          <Input
                            value={newExp.title_en}
                            onChange={(e) =>
                              setNewExp({ ...newExp, title_en: e.target.value })
                            }
                          />
                        </div>
                        <div>
                          <Label>Título (ES)</Label>
                          <Input
                            value={newExp.title_es}
                            onChange={(e) =>
                              setNewExp({ ...newExp, title_es: e.target.value })
                            }
                          />
                        </div>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                          <Label>Empresa</Label>
                          <Input
                            value={newExp.company}
                            onChange={(e) =>
                              setNewExp({ ...newExp, company: e.target.value })
                            }
                          />
                        </div>
                        <div>
                          <Label>Período</Label>
                          <Input
                            value={newExp.period}
                            onChange={(e) =>
                              setNewExp({ ...newExp, period: e.target.value })
                            }
                            placeholder="01/2022 – Atual"
                          />
                        </div>
                        <div>
                          <Label>Localização</Label>
                          <Input
                            value={newExp.location}
                            onChange={(e) =>
                              setNewExp({ ...newExp, location: e.target.value })
                            }
                          />
                        </div>
                      </div>
                      <div>
                        <Label>Descrição (PT) - uma linha por item</Label>
                        <Textarea
                          value={newExp.description_pt}
                          onChange={(e) =>
                            setNewExp({ ...newExp, description_pt: e.target.value })
                          }
                          rows={4}
                        />
                      </div>
                      <div>
                        <Label>Descrição (EN) - uma linha por item</Label>
                        <Textarea
                          value={newExp.description_en}
                          onChange={(e) =>
                            setNewExp({ ...newExp, description_en: e.target.value })
                          }
                          rows={4}
                        />
                      </div>
                      <div>
                        <Label>Descrição (ES) - uma linha por item</Label>
                        <Textarea
                          value={newExp.description_es}
                          onChange={(e) =>
                            setNewExp({ ...newExp, description_es: e.target.value })
                          }
                          rows={4}
                        />
                      </div>
                      <Button onClick={handleAddExperience} disabled={isSaving}>
                        {isSaving ? (
                          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        ) : (
                          <Plus className="w-4 h-4 mr-2" />
                        )}
                        Adicionar Experiência
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>

              {expLoading ? (
                <div className="space-y-4">
                  {[1, 2].map((i) => (
                    <div key={i} className="h-24 bg-muted/50 animate-pulse rounded-lg" />
                  ))}
                </div>
              ) : (
                <div className="space-y-4">
                  {experiences?.map((exp) => (
                    <div
                      key={exp.id}
                      className="flex items-start justify-between p-4 bg-muted/30 rounded-lg"
                    >
                      <div>
                        <h3 className="font-semibold">{exp.title_pt}</h3>
                        <p className="text-sm text-muted-foreground">
                          {exp.company} | {exp.period}
                        </p>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDeleteExperience(exp.id)}
                      >
                        <Trash2 className="w-4 h-4 text-destructive" />
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </TabsContent>

          {/* Skills Tab */}
          <TabsContent value="skills" className="space-y-4">
            <div className="cv-card p-6">
              <h2 className="text-lg font-semibold mb-4">Competências Técnicas</h2>
              
              <div className="flex gap-2 mb-4">
                <Input
                  value={newSkill}
                  onChange={(e) => setNewSkill(e.target.value)}
                  placeholder="Nova competência..."
                  onKeyDown={(e) => e.key === "Enter" && handleAddSkill()}
                />
                <Button onClick={handleAddSkill} disabled={isSaving}>
                  <Plus className="w-4 h-4" />
                </Button>
              </div>

              {skillsLoading ? (
                <div className="flex flex-wrap gap-2">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <div key={i} className="h-8 w-24 bg-muted/50 animate-pulse rounded-full" />
                  ))}
                </div>
              ) : (
                <div className="flex flex-wrap gap-2">
                  {skills?.map((skill) => (
                    <div
                      key={skill.id}
                      className="flex items-center gap-1 bg-primary/10 text-primary px-3 py-1.5 rounded-full"
                    >
                      <span>{skill.name}</span>
                      <button
                        onClick={() => handleDeleteSkill(skill.id)}
                        className="hover:text-destructive"
                      >
                        <Trash2 className="w-3 h-3" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </TabsContent>

          {/* Languages Tab */}
          <TabsContent value="languages" className="space-y-4">
            <div className="cv-card p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold">Competências Linguísticas</h2>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button>
                      <Plus className="w-4 h-4 mr-2" />
                      Adicionar
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Novo Idioma</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div className="grid grid-cols-3 gap-4">
                        <div>
                          <Label>Idioma (PT)</Label>
                          <Input
                            value={newLang.language_pt}
                            onChange={(e) =>
                              setNewLang({ ...newLang, language_pt: e.target.value })
                            }
                          />
                        </div>
                        <div>
                          <Label>Idioma (EN)</Label>
                          <Input
                            value={newLang.language_en}
                            onChange={(e) =>
                              setNewLang({ ...newLang, language_en: e.target.value })
                            }
                          />
                        </div>
                        <div>
                          <Label>Idioma (ES)</Label>
                          <Input
                            value={newLang.language_es}
                            onChange={(e) =>
                              setNewLang({ ...newLang, language_es: e.target.value })
                            }
                          />
                        </div>
                      </div>
                      <div className="grid grid-cols-3 gap-4">
                        <div>
                          <Label>Nível (PT)</Label>
                          <Input
                            value={newLang.level_pt}
                            onChange={(e) =>
                              setNewLang({ ...newLang, level_pt: e.target.value })
                            }
                            placeholder="Básico, Intermediário, Fluente"
                          />
                        </div>
                        <div>
                          <Label>Nível (EN)</Label>
                          <Input
                            value={newLang.level_en}
                            onChange={(e) =>
                              setNewLang({ ...newLang, level_en: e.target.value })
                            }
                          />
                        </div>
                        <div>
                          <Label>Nível (ES)</Label>
                          <Input
                            value={newLang.level_es}
                            onChange={(e) =>
                              setNewLang({ ...newLang, level_es: e.target.value })
                            }
                          />
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Switch
                          checked={newLang.is_native}
                          onCheckedChange={(checked) =>
                            setNewLang({ ...newLang, is_native: checked })
                          }
                        />
                        <Label>Língua Materna</Label>
                      </div>
                      <Button onClick={handleAddLanguage} disabled={isSaving}>
                        {isSaving ? (
                          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        ) : (
                          <Plus className="w-4 h-4 mr-2" />
                        )}
                        Adicionar Idioma
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>

              {langLoading ? (
                <div className="space-y-4">
                  {[1, 2].map((i) => (
                    <div key={i} className="h-12 bg-muted/50 animate-pulse rounded-lg" />
                  ))}
                </div>
              ) : (
                <div className="space-y-2">
                  {languages?.map((lang) => (
                    <div
                      key={lang.id}
                      className="flex items-center justify-between p-3 bg-muted/30 rounded-lg"
                    >
                      <div>
                        <span className="font-medium">{lang.language_pt}</span>
                        {lang.is_native ? (
                          <span className="ml-2 text-xs text-primary">(Nativo)</span>
                        ) : (
                          <span className="ml-2 text-sm text-muted-foreground">
                            - {lang.level_pt}
                          </span>
                        )}
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDeleteLanguage(lang.id)}
                      >
                        <Trash2 className="w-4 h-4 text-destructive" />
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Admin;
