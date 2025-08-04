import { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const Auth = () => {
  const [activeTab, setActiveTab] = useState("login");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  
  // Login state
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  
  // Student signup state
  const [studentData, setStudentData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    course: "",
    period: ""
  });
  
  // Company signup state
  const [companyData, setCompanyData] = useState({
    company_name: "",
    cnpj: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    description: ""
  });

  const { user, signIn, signUp, loading } = useAuth();
  const { toast } = useToast();

  // Redirect if already logged in
  if (!loading && user) {
    return <Navigate to="/" replace />;
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    if (!loginEmail || !loginPassword) {
      setError("Por favor, preencha todos os campos");
      setIsLoading(false);
      return;
    }

    const { error } = await signIn(loginEmail, loginPassword);
    
    if (error) {
      setError(error.message);
      toast({
        title: "Erro no login",
        description: error.message,
        variant: "destructive"
      });
    } else {
      toast({
        title: "Login realizado com sucesso!",
        description: "Bem-vindo ao EstagFy"
      });
    }
    
    setIsLoading(false);
  };

  const handleStudentSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    if (!studentData.name || !studentData.email || !studentData.password || !studentData.course || !studentData.period) {
      setError("Por favor, preencha todos os campos obrigatórios");
      setIsLoading(false);
      return;
    }

    if (studentData.password !== studentData.confirmPassword) {
      setError("As senhas não coincidem");
      setIsLoading(false);
      return;
    }

    if (studentData.password.length < 6) {
      setError("A senha deve ter pelo menos 6 caracteres");
      setIsLoading(false);
      return;
    }

    const { error } = await signUp(studentData.email, studentData.password, {
      user_type: 'student',
      name: studentData.name,
      course: studentData.course,
      period: studentData.period
    });

    if (error) {
      setError(error.message);
      toast({
        title: "Erro no cadastro",
        description: error.message,
        variant: "destructive"
      });
    } else {
      toast({
        title: "Cadastro realizado com sucesso!",
        description: "Verifique seu email para confirmar sua conta"
      });
    }

    setIsLoading(false);
  };

  const handleCompanySignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    if (!companyData.company_name || !companyData.email || !companyData.password || !companyData.cnpj) {
      setError("Por favor, preencha todos os campos obrigatórios");
      setIsLoading(false);
      return;
    }

    if (companyData.password !== companyData.confirmPassword) {
      setError("As senhas não coincidem");
      setIsLoading(false);
      return;
    }

    if (companyData.password.length < 6) {
      setError("A senha deve ter pelo menos 6 caracteres");
      setIsLoading(false);
      return;
    }

    const { error } = await signUp(companyData.email, companyData.password, {
      user_type: 'company',
      company_name: companyData.company_name,
      cnpj: companyData.cnpj,
      phone: companyData.phone,
      description: companyData.description
    });

    if (error) {
      setError(error.message);
      toast({
        title: "Erro no cadastro",
        description: error.message,
        variant: "destructive"
      });
    } else {
      toast({
        title: "Cadastro realizado com sucesso!",
        description: "Verifique seu email para confirmar sua conta"
      });
    }

    setIsLoading(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div>Carregando...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="flex-1 flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
              {activeTab === "login" ? "Entre na sua conta" : "Crie sua conta"}
            </h2>
          </div>

          <Card>
            <CardHeader>
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="login">Login</TabsTrigger>
                  <TabsTrigger value="student">Estudante</TabsTrigger>
                  <TabsTrigger value="company">Empresa</TabsTrigger>
                </TabsList>
              </Tabs>
            </CardHeader>
            
            <CardContent>
              {error && (
                <Alert variant="destructive" className="mb-4">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsContent value="login">
                  <form onSubmit={handleLogin} className="space-y-4">
                    <div>
                      <Label htmlFor="login-email">Email</Label>
                      <Input
                        id="login-email"
                        type="email"
                        value={loginEmail}
                        onChange={(e) => setLoginEmail(e.target.value)}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="login-password">Senha</Label>
                      <Input
                        id="login-password"
                        type="password"
                        value={loginPassword}
                        onChange={(e) => setLoginPassword(e.target.value)}
                        required
                      />
                    </div>
                    <Button type="submit" className="w-full" disabled={isLoading}>
                      {isLoading ? "Entrando..." : "Entrar"}
                    </Button>
                  </form>
                </TabsContent>

                <TabsContent value="student">
                  <form onSubmit={handleStudentSignup} className="space-y-4">
                    <div>
                      <Label htmlFor="student-name">Nome completo *</Label>
                      <Input
                        id="student-name"
                        value={studentData.name}
                        onChange={(e) => setStudentData({...studentData, name: e.target.value})}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="student-email">Email *</Label>
                      <Input
                        id="student-email"
                        type="email"
                        value={studentData.email}
                        onChange={(e) => setStudentData({...studentData, email: e.target.value})}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="student-course">Curso *</Label>
                      <Select value={studentData.course} onValueChange={(value) => setStudentData({...studentData, course: value})}>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione seu curso" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="ciencia-computacao">Ciência da Computação</SelectItem>
                          <SelectItem value="engenharia-software">Engenharia de Software</SelectItem>
                          <SelectItem value="sistemas-informacao">Sistemas de Informação</SelectItem>
                          <SelectItem value="administracao">Administração</SelectItem>
                          <SelectItem value="marketing">Marketing</SelectItem>
                          <SelectItem value="contabilidade">Contabilidade</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="student-period">Período *</Label>
                      <Select value={studentData.period} onValueChange={(value) => setStudentData({...studentData, period: value})}>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione seu período" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="matutino">Matutino</SelectItem>
                          <SelectItem value="vespertino">Vespertino</SelectItem>
                          <SelectItem value="noturno">Noturno</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="student-password">Senha *</Label>
                      <Input
                        id="student-password"
                        type="password"
                        value={studentData.password}
                        onChange={(e) => setStudentData({...studentData, password: e.target.value})}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="student-confirm-password">Confirmar senha *</Label>
                      <Input
                        id="student-confirm-password"
                        type="password"
                        value={studentData.confirmPassword}
                        onChange={(e) => setStudentData({...studentData, confirmPassword: e.target.value})}
                        required
                      />
                    </div>
                    <Button type="submit" className="w-full" disabled={isLoading}>
                      {isLoading ? "Cadastrando..." : "Cadastrar como Estudante"}
                    </Button>
                  </form>
                </TabsContent>

                <TabsContent value="company">
                  <form onSubmit={handleCompanySignup} className="space-y-4">
                    <div>
                      <Label htmlFor="company-name">Nome da empresa *</Label>
                      <Input
                        id="company-name"
                        value={companyData.company_name}
                        onChange={(e) => setCompanyData({...companyData, company_name: e.target.value})}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="company-cnpj">CNPJ *</Label>
                      <Input
                        id="company-cnpj"
                        value={companyData.cnpj}
                        onChange={(e) => setCompanyData({...companyData, cnpj: e.target.value})}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="company-email">Email *</Label>
                      <Input
                        id="company-email"
                        type="email"
                        value={companyData.email}
                        onChange={(e) => setCompanyData({...companyData, email: e.target.value})}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="company-phone">Telefone</Label>
                      <Input
                        id="company-phone"
                        value={companyData.phone}
                        onChange={(e) => setCompanyData({...companyData, phone: e.target.value})}
                      />
                    </div>
                    <div>
                      <Label htmlFor="company-description">Descrição da empresa</Label>
                      <Textarea
                        id="company-description"
                        value={companyData.description}
                        onChange={(e) => setCompanyData({...companyData, description: e.target.value})}
                        placeholder="Conte um pouco sobre sua empresa..."
                      />
                    </div>
                    <div>
                      <Label htmlFor="company-password">Senha *</Label>
                      <Input
                        id="company-password"
                        type="password"
                        value={companyData.password}
                        onChange={(e) => setCompanyData({...companyData, password: e.target.value})}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="company-confirm-password">Confirmar senha *</Label>
                      <Input
                        id="company-confirm-password"
                        type="password"
                        value={companyData.confirmPassword}
                        onChange={(e) => setCompanyData({...companyData, confirmPassword: e.target.value})}
                        required
                      />
                    </div>
                    <Button type="submit" className="w-full" disabled={isLoading}>
                      {isLoading ? "Cadastrando..." : "Cadastrar como Empresa"}
                    </Button>
                  </form>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Auth;