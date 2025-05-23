
import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, User, GraduationCap, Mail, Phone, MessageCircle } from "lucide-react";

// Mock data for applicants
const mockApplicants = [
  {
    id: 1,
    name: "João Silva",
    email: "joao.silva@email.com",
    phone: "(11) 99999-1111",
    course: "Ciência da Computação",
    semester: "5º período",
    university: "USP",
    status: "Em análise",
    appliedAt: "2025-05-20",
    skills: ["React", "JavaScript", "Python", "Git"],
  },
  {
    id: 2,
    name: "Maria Santos",
    email: "maria.santos@email.com",
    phone: "(11) 99999-2222",
    course: "Engenharia de Software",
    semester: "6º período",
    university: "UNICAMP",
    status: "Contratado",
    appliedAt: "2025-05-18",
    skills: ["Vue.js", "Node.js", "SQL", "Docker"],
  },
  {
    id: 3,
    name: "Pedro Oliveira",
    email: "pedro.oliveira@email.com",
    phone: "(11) 99999-3333",
    course: "Sistemas de Informação",
    semester: "4º período",
    university: "PUC-SP",
    status: "Não selecionado",
    appliedAt: "2025-05-15",
    skills: ["HTML", "CSS", "JavaScript", "React"],
  },
];

const InternshipApplicants = () => {
  const { id } = useParams();
  const [applicants] = useState(mockApplicants);

  const updateStatus = (applicantId: number, newStatus: string) => {
    console.log(`Atualizando status do candidato ${applicantId} para: ${newStatus}`);
    // TODO: Implementar atualização de status
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Contratado":
        return "bg-green-100 text-green-800";
      case "Não selecionado":
        return "bg-red-100 text-red-800";
      default:
        return "bg-yellow-100 text-yellow-800";
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar isLoggedIn={true} userType="company" />
      
      <div className="container mx-auto px-4 py-8 flex-grow">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center mb-6">
            <Button variant="outline" size="sm" asChild className="mr-4">
              <Link to="/company/dashboard">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Voltar
              </Link>
            </Button>
            <h1 className="text-3xl font-bold">Candidatos - Estágio em Desenvolvimento Front-end</h1>
          </div>

          <div className="grid gap-6">
            {applicants.length === 0 ? (
              <Card>
                <CardContent className="py-8 text-center">
                  <p className="text-gray-500">Nenhum candidato se inscreveu para esta vaga ainda.</p>
                </CardContent>
              </Card>
            ) : (
              applicants.map((applicant) => (
                <Card key={applicant.id}>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="flex items-center">
                          <User className="mr-2 h-5 w-5" />
                          {applicant.name}
                        </CardTitle>
                        <CardDescription className="flex items-center mt-2">
                          <GraduationCap className="mr-2 h-4 w-4" />
                          {applicant.course} - {applicant.semester} | {applicant.university}
                        </CardDescription>
                      </div>
                      <Badge className={getStatusColor(applicant.status)}>
                        {applicant.status}
                      </Badge>
                    </div>
                  </CardHeader>
                  
                  <CardContent>
                    <div className="grid md:grid-cols-2 gap-4 mb-4">
                      <div className="space-y-2">
                        <div className="flex items-center text-sm text-gray-600">
                          <Mail className="mr-2 h-4 w-4" />
                          {applicant.email}
                        </div>
                        <div className="flex items-center text-sm text-gray-600">
                          <Phone className="mr-2 h-4 w-4" />
                          {applicant.phone}
                        </div>
                        <div className="text-sm text-gray-600">
                          <strong>Candidatura enviada:</strong> {new Date(applicant.appliedAt).toLocaleDateString('pt-BR')}
                        </div>
                      </div>
                      
                      <div>
                        <p className="text-sm font-medium mb-2">Habilidades:</p>
                        <div className="flex flex-wrap gap-2">
                          {applicant.skills.map((skill, index) => (
                            <Badge key={index} variant="outline">
                              {skill}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex flex-wrap gap-2 justify-end">
                      {applicant.status === "Em análise" && (
                        <>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => updateStatus(applicant.id, "Não selecionado")}
                          >
                            Rejeitar
                          </Button>
                          <Button
                            size="sm"
                            onClick={() => updateStatus(applicant.id, "Contratado")}
                          >
                            Contratar
                          </Button>
                        </>
                      )}
                      
                      {applicant.status === "Contratado" && (
                        <Button size="sm" asChild>
                          <Link to={`/chat/${applicant.id}`}>
                            <MessageCircle className="mr-2 h-4 w-4" />
                            Chat
                          </Link>
                        </Button>
                      )}
                      
                      <Button size="sm" variant="outline">
                        Ver Currículo
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default InternshipApplicants;
