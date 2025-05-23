
import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { User, Save, Plus, X } from "lucide-react";

const StudentProfile = () => {
  const [name, setName] = useState("João Silva");
  const [email, setEmail] = useState("joao.silva@email.com");
  const [phone, setPhone] = useState("(11) 99999-9999");
  const [course, setCourse] = useState("Ciência da Computação");
  const [university, setUniversity] = useState("Universidade de São Paulo (USP)");
  const [semester, setSemester] = useState("5");
  const [bio, setBio] = useState("Estudante de Ciência da Computação apaixonado por tecnologia e desenvolvimento web. Busco oportunidades para aplicar conhecimentos em projetos reais.");
  const [skills, setSkills] = useState(["JavaScript", "React", "Python", "Git", "HTML", "CSS"]);
  const [newSkill, setNewSkill] = useState("");
  const [linkedinUrl, setLinkedinUrl] = useState("https://linkedin.com/in/joaosilva");
  const [githubUrl, setGithubUrl] = useState("https://github.com/joaosilva");
  const [portfolioUrl, setPortfolioUrl] = useState("");

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Salvando perfil do estudante:", {
      name,
      email,
      phone,
      course,
      university,
      semester,
      bio,
      skills,
      linkedinUrl,
      githubUrl,
      portfolioUrl
    });
    // TODO: Implementar salvamento do perfil
  };

  const addSkill = () => {
    if (newSkill.trim() && !skills.includes(newSkill.trim())) {
      setSkills([...skills, newSkill.trim()]);
      setNewSkill("");
    }
  };

  const removeSkill = (skillToRemove: string) => {
    setSkills(skills.filter(skill => skill !== skillToRemove));
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addSkill();
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar isLoggedIn={true} userType="student" />
      
      <div className="container mx-auto px-4 py-8 flex-grow">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center mb-6">
            <User className="mr-3 h-8 w-8 text-estagfy-600" />
            <h1 className="text-3xl font-bold">Meu Perfil</h1>
          </div>

          <form onSubmit={handleSave}>
            <div className="grid gap-6">
              {/* Informações Pessoais */}
              <Card>
                <CardHeader>
                  <CardTitle>Informações Pessoais</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="name">Nome Completo</Label>
                    <Input
                      id="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="phone">Telefone</Label>
                      <Input
                        id="phone"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="bio">Sobre Mim</Label>
                    <Textarea
                      id="bio"
                      value={bio}
                      onChange={(e) => setBio(e.target.value)}
                      rows={4}
                      placeholder="Conte um pouco sobre você, seus interesses e objetivos profissionais..."
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Informações Acadêmicas */}
              <Card>
                <CardHeader>
                  <CardTitle>Informações Acadêmicas</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="university">Universidade</Label>
                    <Input
                      id="university"
                      value={university}
                      onChange={(e) => setUniversity(e.target.value)}
                      required
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="course">Curso</Label>
                      <Input
                        id="course"
                        value={course}
                        onChange={(e) => setCourse(e.target.value)}
                        required
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="semester">Período Atual</Label>
                      <Select value={semester} onValueChange={setSemester}>
                        <SelectTrigger id="semester">
                          <SelectValue placeholder="Selecione o período" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1">1º período</SelectItem>
                          <SelectItem value="2">2º período</SelectItem>
                          <SelectItem value="3">3º período</SelectItem>
                          <SelectItem value="4">4º período</SelectItem>
                          <SelectItem value="5">5º período</SelectItem>
                          <SelectItem value="6">6º período</SelectItem>
                          <SelectItem value="7">7º período</SelectItem>
                          <SelectItem value="8">8º período</SelectItem>
                          <SelectItem value="9">9º período</SelectItem>
                          <SelectItem value="10">10º período</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Habilidades */}
              <Card>
                <CardHeader>
                  <CardTitle>Habilidades</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex flex-wrap gap-2 mb-4">
                    {skills.map((skill, index) => (
                      <Badge key={index} variant="secondary" className="text-sm">
                        {skill}
                        <button
                          type="button"
                          onClick={() => removeSkill(skill)}
                          className="ml-2 hover:bg-gray-200 rounded-full p-1"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </Badge>
                    ))}
                  </div>
                  
                  <div className="flex gap-2">
                    <Input
                      value={newSkill}
                      onChange={(e) => setNewSkill(e.target.value)}
                      onKeyPress={handleKeyPress}
                      placeholder="Digite uma habilidade e pressione Enter"
                    />
                    <Button type="button" onClick={addSkill} size="sm">
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Links Externos */}
              <Card>
                <CardHeader>
                  <CardTitle>Links Externos</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="linkedinUrl">LinkedIn</Label>
                    <Input
                      id="linkedinUrl"
                      type="url"
                      value={linkedinUrl}
                      onChange={(e) => setLinkedinUrl(e.target.value)}
                      placeholder="https://linkedin.com/in/seuperfil"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="githubUrl">GitHub</Label>
                    <Input
                      id="githubUrl"
                      type="url"
                      value={githubUrl}
                      onChange={(e) => setGithubUrl(e.target.value)}
                      placeholder="https://github.com/seuusuario"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="portfolioUrl">Portfólio</Label>
                    <Input
                      id="portfolioUrl"
                      type="url"
                      value={portfolioUrl}
                      onChange={(e) => setPortfolioUrl(e.target.value)}
                      placeholder="https://seuportfolio.com"
                    />
                  </div>
                </CardContent>
              </Card>

              <div className="flex justify-end">
                <Button type="submit" className="flex items-center">
                  <Save className="mr-2 h-4 w-4" />
                  Salvar Perfil
                </Button>
              </div>
            </div>
          </form>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default StudentProfile;
