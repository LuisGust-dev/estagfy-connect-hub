
import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Building, Plus, User } from "lucide-react";
import { Link } from "react-router-dom";

// Mock data for internships posted by this company
const postedInternships = [
  {
    id: 1,
    title: "Estágio em Desenvolvimento Front-end",
    location: "São Paulo, SP",
    type: "Remoto",
    area: "Tecnologia",
    applicants: 12,
  },
  {
    id: 2,
    title: "Estágio em Marketing de Conteúdo",
    location: "São Paulo, SP",
    type: "Híbrido",
    area: "Marketing",
    applicants: 8,
  },
  {
    id: 3,
    title: "Estágio em UI/UX Design",
    location: "São Paulo, SP",
    type: "Presencial",
    area: "Design",
    applicants: 5,
  },
];

const CompanyDashboard = () => {
  const [newInternshipTitle, setNewInternshipTitle] = useState("");
  const [newInternshipDescription, setNewInternshipDescription] = useState("");
  const [newInternshipRequirements, setNewInternshipRequirements] = useState("");
  const [newInternshipLocation, setNewInternshipLocation] = useState("");
  const [newInternshipType, setNewInternshipType] = useState("");
  const [newInternshipArea, setNewInternshipArea] = useState("");
  const [newInternshipSalary, setNewInternshipSalary] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleSubmitNewInternship = (e: React.FormEvent) => {
    e.preventDefault();
    
    // In a real app, we would send this data to a backend service
    console.log("Creating new internship:", { 
      title: newInternshipTitle,
      description: newInternshipDescription,
      requirements: newInternshipRequirements,
      location: newInternshipLocation,
      type: newInternshipType,
      area: newInternshipArea,
      salary: newInternshipSalary
    });
    
    // Close the dialog and reset form
    setIsDialogOpen(false);
    setNewInternshipTitle("");
    setNewInternshipDescription("");
    setNewInternshipRequirements("");
    setNewInternshipLocation("");
    setNewInternshipType("");
    setNewInternshipArea("");
    setNewInternshipSalary("");
    
    // In a real app, we would refresh the list of posted internships
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar isLoggedIn={true} userType="company" />
      
      <div className="container mx-auto px-4 py-8 flex-grow">
        <div className="flex flex-col md:flex-row justify-between items-start gap-6">
          {/* Sidebar / Company Profile Summary */}
          <div className="w-full md:w-64 mb-8">
            <Card>
              <CardHeader className="text-center">
                <div className="w-20 h-20 bg-estagfy-200 rounded-full mx-auto mb-4"></div>
                <CardTitle>Empresa XYZ</CardTitle>
                <CardDescription>Tecnologia & Inovação</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex flex-col space-y-1">
                  <Button variant="outline" size="sm" asChild className="justify-start">
                    <Link to="/company/profile">
                      <Building className="mr-2 h-4 w-4" />
                      Perfil da Empresa
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Main Content */}
          <div className="flex-grow">
            <div className="flex flex-col md:flex-row justify-between items-center mb-6">
              <h1 className="text-3xl font-bold">Dashboard da Empresa</h1>
              
              <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogTrigger asChild>
                  <Button className="mt-4 md:mt-0">
                    <Plus className="mr-2 h-4 w-4" /> Postar Nova Vaga
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[600px]">
                  <form onSubmit={handleSubmitNewInternship}>
                    <DialogHeader>
                      <DialogTitle>Publicar Nova Vaga de Estágio</DialogTitle>
                      <DialogDescription>
                        Preencha os detalhes da vaga de estágio abaixo. Clique em publicar quando terminar.
                      </DialogDescription>
                    </DialogHeader>
                    
                    <div className="grid gap-4 py-4">
                      <div className="space-y-2">
                        <Label htmlFor="title">Título da Vaga</Label>
                        <Input
                          id="title"
                          value={newInternshipTitle}
                          onChange={(e) => setNewInternshipTitle(e.target.value)}
                          placeholder="Ex: Estágio em Desenvolvimento Web"
                          required
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="description">Descrição</Label>
                        <Textarea
                          id="description"
                          value={newInternshipDescription}
                          onChange={(e) => setNewInternshipDescription(e.target.value)}
                          placeholder="Descreva as atividades e responsabilidades do estágio"
                          required
                          rows={4}
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="requirements">Requisitos</Label>
                        <Textarea
                          id="requirements"
                          value={newInternshipRequirements}
                          onChange={(e) => setNewInternshipRequirements(e.target.value)}
                          placeholder="Liste os requisitos necessários para a vaga"
                          required
                          rows={3}
                        />
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="location">Localização</Label>
                          <Input
                            id="location"
                            value={newInternshipLocation}
                            onChange={(e) => setNewInternshipLocation(e.target.value)}
                            placeholder="Ex: São Paulo, SP"
                            required
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="type">Tipo</Label>
                          <Select value={newInternshipType} onValueChange={setNewInternshipType} required>
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
                        <div className="space-y-2">
                          <Label htmlFor="area">Área</Label>
                          <Select value={newInternshipArea} onValueChange={setNewInternshipArea} required>
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
                        
                        <div className="space-y-2">
                          <Label htmlFor="salary">Bolsa (R$)</Label>
                          <Input
                            id="salary"
                            value={newInternshipSalary}
                            onChange={(e) => setNewInternshipSalary(e.target.value)}
                            placeholder="Ex: 1000,00"
                            type="number"
                            min="0"
                            step="0.01"
                          />
                        </div>
                      </div>
                    </div>
                    
                    <DialogFooter>
                      <Button type="submit">Publicar Vaga</Button>
                    </DialogFooter>
                  </form>
                </DialogContent>
              </Dialog>
            </div>
            
            <Tabs defaultValue="vagas" className="w-full">
              <TabsList className="grid w-full md:w-[400px] grid-cols-2">
                <TabsTrigger value="vagas">Vagas Publicadas</TabsTrigger>
                <TabsTrigger value="candidatos">Candidatos</TabsTrigger>
              </TabsList>
              
              {/* Vagas Tab */}
              <TabsContent value="vagas" className="space-y-4 mt-6">
                {postedInternships.length === 0 ? (
                  <Card>
                    <CardContent className="flex flex-col items-center justify-center py-10">
                      <p className="mb-4 text-center text-gray-500">
                        Você ainda não publicou nenhuma vaga de estágio.
                      </p>
                      <Button onClick={() => setIsDialogOpen(true)}>
                        <Plus className="mr-2 h-4 w-4" /> Publicar Primeira Vaga
                      </Button>
                    </CardContent>
                  </Card>
                ) : (
                  postedInternships.map(internship => (
                    <Card key={internship.id}>
                      <CardHeader>
                        <CardTitle>{internship.title}</CardTitle>
                        <CardDescription>
                          <div className="flex flex-wrap gap-2 mt-2">
                            <div className="bg-estagfy-100 text-estagfy-700 text-xs rounded-full px-3 py-1">
                              {internship.area}
                            </div>
                            <div className="bg-gray-100 text-gray-700 text-xs rounded-full px-3 py-1">
                              {internship.location}
                            </div>
                            <div className="bg-gray-100 text-gray-700 text-xs rounded-full px-3 py-1">
                              {internship.type}
                            </div>
                          </div>
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="flex items-center">
                          <User className="h-4 w-4 text-gray-500 mr-2" />
                          <p className="text-sm text-gray-600">
                            {internship.applicants} candidato{internship.applicants !== 1 ? 's' : ''} inscrito{internship.applicants !== 1 ? 's' : ''}
                          </p>
                        </div>
                      </CardContent>
                      <CardFooter className="flex justify-between">
                        <Button variant="outline" size="sm" asChild>
                          <Link to={`/company/internships/${internship.id}/edit`}>
                            Editar
                          </Link>
                        </Button>
                        <Button size="sm" asChild>
                          <Link to={`/company/internships/${internship.id}/applicants`}>
                            Ver Candidatos
                          </Link>
                        </Button>
                      </CardFooter>
                    </Card>
                  ))
                )}
              </TabsContent>
              
              {/* Candidatos Tab */}
              <TabsContent value="candidatos" className="space-y-4 mt-6">
                <Card>
                  <CardContent className="pt-6">
                    <p className="text-center py-8">
                      Selecione uma vaga específica para visualizar seus candidatos.
                    </p>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default CompanyDashboard;
