
import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { BadgeCheck, Calendar, Search, User } from "lucide-react";
import { Link } from "react-router-dom";

// Mock data for internships
const internships = [
  {
    id: 1,
    title: "Estágio em Desenvolvimento Web",
    company: "TechSolutions",
    location: "São Paulo, SP",
    type: "Remoto",
    area: "Tecnologia",
  },
  {
    id: 2,
    title: "Estágio em Marketing Digital",
    company: "MarketingPro",
    location: "Rio de Janeiro, RJ",
    type: "Presencial",
    area: "Marketing",
  },
  {
    id: 3,
    title: "Estágio em Administração",
    company: "AdminCorp",
    location: "Belo Horizonte, MG",
    type: "Híbrido",
    area: "Administração",
  },
  {
    id: 4,
    title: "Estágio em Design Gráfico",
    company: "DesignStudio",
    location: "Curitiba, PR",
    type: "Presencial",
    area: "Design",
  },
];

// Mock data for applications
const applications = [
  {
    id: 1,
    title: "Estágio em Desenvolvimento Web",
    company: "TechSolutions",
    status: "Em análise",
  },
  {
    id: 2,
    title: "Estágio em Marketing Digital",
    company: "MarketingPro",
    status: "Contratado",
  },
  {
    id: 3,
    title: "Estágio em Administração",
    company: "AdminCorp",
    status: "Não selecionado",
  },
];

const StudentDashboard = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [areaFilter, setAreaFilter] = useState("");
  const [locationFilter, setLocationFilter] = useState("");
  const [typeFilter, setTypeFilter] = useState("");
  
  // Filter internships based on search and filters
  const filteredInternships = internships.filter(internship => {
    const matchesSearch = internship.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           internship.company.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesArea = areaFilter ? internship.area === areaFilter : true;
    const matchesLocation = locationFilter ? internship.location.includes(locationFilter) : true;
    const matchesType = typeFilter ? internship.type === typeFilter : true;
    
    return matchesSearch && matchesArea && matchesLocation && matchesType;
  });
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar isLoggedIn={true} userType="student" />
      
      <div className="container mx-auto px-4 py-8 flex-grow">
        <div className="flex flex-col md:flex-row justify-between items-start gap-6">
          {/* Sidebar / User Profile Summary */}
          <div className="w-full md:w-64 mb-8">
            <Card>
              <CardHeader className="text-center">
                <div className="w-20 h-20 bg-estagfy-200 rounded-full mx-auto mb-4"></div>
                <CardTitle>João Silva</CardTitle>
                <CardDescription>Ciência da Computação - 5º período</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex flex-col space-y-1">
                  <Button variant="outline" size="sm" asChild className="justify-start">
                    <Link to="/student/profile">
                      <User className="mr-2 h-4 w-4" />
                      Meu Perfil
                    </Link>
                  </Button>
                  <Button variant="outline" size="sm" asChild className="justify-start">
                    <Link to="/student/applications">
                      <BadgeCheck className="mr-2 h-4 w-4" />
                      Minhas Candidaturas
                    </Link>
                  </Button>
                  <Button variant="outline" size="sm" asChild className="justify-start">
                    <Link to="/student/calendar">
                      <Calendar className="mr-2 h-4 w-4" />
                      Calendário
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Main Content */}
          <div className="flex-grow">
            <h1 className="text-3xl font-bold mb-6">Painel do Aluno</h1>
            
            <Tabs defaultValue="vagas" className="w-full">
              <TabsList className="grid w-full md:w-[400px] grid-cols-2">
                <TabsTrigger value="vagas">Vagas Disponíveis</TabsTrigger>
                <TabsTrigger value="candidaturas">Minhas Candidaturas</TabsTrigger>
              </TabsList>
              
              {/* Vagas Tab */}
              <TabsContent value="vagas" className="space-y-4 mt-6">
                {/* Search and Filters */}
                <div className="space-y-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      placeholder="Buscar vagas de estágio..."
                      className="pl-10"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Select value={areaFilter} onValueChange={setAreaFilter}>
                      <SelectTrigger>
                        <SelectValue placeholder="Área" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Todas as Áreas</SelectItem>
                        <SelectItem value="Tecnologia">Tecnologia</SelectItem>
                        <SelectItem value="Marketing">Marketing</SelectItem>
                        <SelectItem value="Administração">Administração</SelectItem>
                        <SelectItem value="Design">Design</SelectItem>
                      </SelectContent>
                    </Select>
                    
                    <Select value={locationFilter} onValueChange={setLocationFilter}>
                      <SelectTrigger>
                        <SelectValue placeholder="Localidade" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Todas as Localidades</SelectItem>
                        <SelectItem value="São Paulo">São Paulo</SelectItem>
                        <SelectItem value="Rio de Janeiro">Rio de Janeiro</SelectItem>
                        <SelectItem value="Belo Horizonte">Belo Horizonte</SelectItem>
                        <SelectItem value="Curitiba">Curitiba</SelectItem>
                      </SelectContent>
                    </Select>
                    
                    <Select value={typeFilter} onValueChange={setTypeFilter}>
                      <SelectTrigger>
                        <SelectValue placeholder="Tipo" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Todos os Tipos</SelectItem>
                        <SelectItem value="Remoto">Remoto</SelectItem>
                        <SelectItem value="Presencial">Presencial</SelectItem>
                        <SelectItem value="Híbrido">Híbrido</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                {/* Internship Listings */}
                <div className="space-y-4">
                  {filteredInternships.length === 0 ? (
                    <p className="text-center py-8 text-gray-500">
                      Nenhuma vaga encontrada com os filtros selecionados.
                    </p>
                  ) : (
                    filteredInternships.map(internship => (
                      <Card key={internship.id}>
                        <CardHeader>
                          <CardTitle>{internship.title}</CardTitle>
                          <CardDescription>{internship.company}</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="flex flex-wrap gap-2 mb-4">
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
                        </CardContent>
                        <CardFooter className="flex justify-end">
                          <Button size="sm">Inscrever-se</Button>
                        </CardFooter>
                      </Card>
                    ))
                  )}
                </div>
              </TabsContent>
              
              {/* Candidaturas Tab */}
              <TabsContent value="candidaturas" className="space-y-4 mt-6">
                {applications.length === 0 ? (
                  <p className="text-center py-8 text-gray-500">
                    Você ainda não se candidatou a nenhuma vaga.
                  </p>
                ) : (
                  applications.map(application => (
                    <Card key={application.id}>
                      <CardHeader>
                        <CardTitle>{application.title}</CardTitle>
                        <CardDescription>{application.company}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="flex items-center mb-2">
                          <p className="text-sm text-gray-600 mr-2">Status:</p>
                          <div className={`text-xs rounded-full px-3 py-1 ${
                            application.status === "Contratado" 
                              ? "bg-green-100 text-green-700" 
                              : application.status === "Não selecionado" 
                                ? "bg-red-100 text-red-700" 
                                : "bg-yellow-100 text-yellow-700"
                          }`}>
                            {application.status}
                          </div>
                        </div>
                      </CardContent>
                      <CardFooter className="flex justify-end">
                        {application.status === "Contratado" && (
                          <Button size="sm" asChild>
                            <Link to={`/chat/${application.id}`}>
                              Chat com a Empresa
                            </Link>
                          </Button>
                        )}
                      </CardFooter>
                    </Card>
                  ))
                )}
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default StudentDashboard;
