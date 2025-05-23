
import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Building, Save } from "lucide-react";

const CompanyProfile = () => {
  const [companyName, setCompanyName] = useState("Empresa XYZ");
  const [companyDescription, setCompanyDescription] = useState("Uma empresa líder em tecnologia e inovação, focada em soluções digitais para o futuro.");
  const [sector, setSector] = useState("Tecnologia");
  const [location, setLocation] = useState("São Paulo, SP");
  const [website, setWebsite] = useState("https://empresaxyz.com");
  const [phone, setPhone] = useState("(11) 99999-9999");
  const [email, setEmail] = useState("contato@empresaxyz.com");
  const [employeeCount, setEmployeeCount] = useState("51-200");

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Salvando perfil da empresa:", {
      companyName,
      companyDescription,
      sector,
      location,
      website,
      phone,
      email,
      employeeCount
    });
    // TODO: Implementar salvamento do perfil
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar isLoggedIn={true} userType="company" />
      
      <div className="container mx-auto px-4 py-8 flex-grow">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center mb-6">
            <Building className="mr-3 h-8 w-8 text-estagfy-600" />
            <h1 className="text-3xl font-bold">Perfil da Empresa</h1>
          </div>

          <form onSubmit={handleSave}>
            <div className="grid gap-6">
              {/* Informações Básicas */}
              <Card>
                <CardHeader>
                  <CardTitle>Informações Básicas</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="companyName">Nome da Empresa</Label>
                    <Input
                      id="companyName"
                      value={companyName}
                      onChange={(e) => setCompanyName(e.target.value)}
                      required
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="companyDescription">Descrição da Empresa</Label>
                    <Textarea
                      id="companyDescription"
                      value={companyDescription}
                      onChange={(e) => setCompanyDescription(e.target.value)}
                      rows={4}
                      placeholder="Descreva sua empresa, missão e valores..."
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="sector">Setor</Label>
                      <Select value={sector} onValueChange={setSector}>
                        <SelectTrigger id="sector">
                          <SelectValue placeholder="Selecione o setor" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Tecnologia">Tecnologia</SelectItem>
                          <SelectItem value="Financeiro">Financeiro</SelectItem>
                          <SelectItem value="Saúde">Saúde</SelectItem>
                          <SelectItem value="Educação">Educação</SelectItem>
                          <SelectItem value="Varejo">Varejo</SelectItem>
                          <SelectItem value="Manufatura">Manufatura</SelectItem>
                          <SelectItem value="Consultoria">Consultoria</SelectItem>
                          <SelectItem value="Outro">Outro</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div>
                      <Label htmlFor="employeeCount">Número de Funcionários</Label>
                      <Select value={employeeCount} onValueChange={setEmployeeCount}>
                        <SelectTrigger id="employeeCount">
                          <SelectValue placeholder="Selecione o tamanho" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1-10">1-10 funcionários</SelectItem>
                          <SelectItem value="11-50">11-50 funcionários</SelectItem>
                          <SelectItem value="51-200">51-200 funcionários</SelectItem>
                          <SelectItem value="201-500">201-500 funcionários</SelectItem>
                          <SelectItem value="500+">500+ funcionários</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Informações de Contato */}
              <Card>
                <CardHeader>
                  <CardTitle>Informações de Contato</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="location">Localização</Label>
                    <Input
                      id="location"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      placeholder="Ex: São Paulo, SP"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="website">Website</Label>
                    <Input
                      id="website"
                      type="url"
                      value={website}
                      onChange={(e) => setWebsite(e.target.value)}
                      placeholder="https://suaempresa.com"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="phone">Telefone</Label>
                      <Input
                        id="phone"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="(11) 99999-9999"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="email">Email de Contato</Label>
                      <Input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="contato@empresa.com"
                      />
                    </div>
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

export default CompanyProfile;
