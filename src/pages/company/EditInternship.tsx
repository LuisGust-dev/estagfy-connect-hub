
import { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, Save, Trash2 } from "lucide-react";

const EditInternship = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  // Mock data - normalmente viria de uma API baseada no ID
  const [title, setTitle] = useState("Estágio em Desenvolvimento Front-end");
  const [description, setDescription] = useState("Desenvolvimento de interfaces web utilizando React e TypeScript. O estagiário trabalhará em projetos reais e terá mentoria de desenvolvedores seniores.");
  const [requirements, setRequirements] = useState("Cursando Ciência da Computação, Engenharia de Software ou áreas relacionadas. Conhecimentos básicos em HTML, CSS e JavaScript. Desejável conhecimento em React.");
  const [location, setLocation] = useState("São Paulo, SP");
  const [type, setType] = useState("Remoto");
  const [area, setArea] = useState("Tecnologia");
  const [salary, setSalary] = useState("1500.00");

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Salvando alterações da vaga:", {
      id,
      title,
      description,
      requirements,
      location,
      type,
      area,
      salary
    });
    // TODO: Implementar salvamento das alterações
    navigate("/company/dashboard");
  };

  const handleDelete = () => {
    if (window.confirm("Tem certeza que deseja excluir esta vaga? Esta ação não pode ser desfeita.")) {
      console.log("Excluindo vaga:", id);
      // TODO: Implementar exclusão da vaga
      navigate("/company/dashboard");
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar isLoggedIn={true} userType="company" />
      
      <div className="container mx-auto px-4 py-8 flex-grow">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center">
              <Button variant="outline" size="sm" asChild className="mr-4">
                <Link to="/company/dashboard">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Voltar
                </Link>
              </Button>
              <h1 className="text-3xl font-bold">Editar Vaga de Estágio</h1>
            </div>
            
            <Button variant="destructive" onClick={handleDelete}>
              <Trash2 className="mr-2 h-4 w-4" />
              Excluir Vaga
            </Button>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Informações da Vaga</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSave} className="space-y-6">
                <div>
                  <Label htmlFor="title">Título da Vaga</Label>
                  <Input
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Ex: Estágio em Desenvolvimento Web"
                    required
                  />
                </div>
                
                <div>
                  <Label htmlFor="description">Descrição</Label>
                  <Textarea
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Descreva as atividades e responsabilidades do estágio"
                    required
                    rows={4}
                  />
                </div>
                
                <div>
                  <Label htmlFor="requirements">Requisitos</Label>
                  <Textarea
                    id="requirements"
                    value={requirements}
                    onChange={(e) => setRequirements(e.target.value)}
                    placeholder="Liste os requisitos necessários para a vaga"
                    required
                    rows={3}
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="location">Localização</Label>
                    <Input
                      id="location"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      placeholder="Ex: São Paulo, SP"
                      required
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="type">Tipo</Label>
                    <Select value={type} onValueChange={setType} required>
                      <SelectTrigger id="type">
                        <SelectValue placeholder="Selecione o tipo" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Remoto">Remoto</SelectItem>
                        <SelectItem value="Presencial">Presencial</SelectItem>
                        <SelectItem value="Híbrido">Híbrido</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="area">Área</Label>
                    <Select value={area} onValueChange={setArea} required>
                      <SelectTrigger id="area">
                        <SelectValue placeholder="Selecione a área" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Tecnologia">Tecnologia</SelectItem>
                        <SelectItem value="Marketing">Marketing</SelectItem>
                        <SelectItem value="Administração">Administração</SelectItem>
                        <SelectItem value="Design">Design</SelectItem>
                        <SelectItem value="Financeiro">Financeiro</SelectItem>
                        <SelectItem value="Recursos Humanos">Recursos Humanos</SelectItem>
                        <SelectItem value="Jurídico">Jurídico</SelectItem>
                        <SelectItem value="Comunicação">Comunicação</SelectItem>
                        <SelectItem value="Engenharia">Engenharia</SelectItem>
                        <SelectItem value="Saúde">Saúde</SelectItem>
                        <SelectItem value="Outro">Outro</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <Label htmlFor="salary">Bolsa (R$)</Label>
                    <Input
                      id="salary"
                      value={salary}
                      onChange={(e) => setSalary(e.target.value)}
                      placeholder="Ex: 1000,00"
                      type="number"
                      min="0"
                      step="0.01"
                    />
                  </div>
                </div>
                
                <div className="flex justify-end">
                  <Button type="submit" className="flex items-center">
                    <Save className="mr-2 h-4 w-4" />
                    Salvar Alterações
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default EditInternship;
