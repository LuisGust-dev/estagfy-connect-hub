
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Textarea } from "@/components/ui/textarea";
import { ArrowRight } from "lucide-react";

export const CompanyRegisterForm = () => {
  const [companyName, setCompanyName] = useState("");
  const [cnpj, setCnpj] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (!companyName || !cnpj || !email || !password || !phone || !description) {
      setError("Por favor, preencha todos os campos");
      return;
    }
    
    if (password !== confirmPassword) {
      setError("As senhas não coincidem");
      return;
    }
    
    // In a real app, we would send this data to a backend service
    console.log("Registering company:", { companyName, cnpj, email, phone, description });
    
    // For prototype, redirect to company dashboard
    window.location.href = "/company/dashboard";
  };
  
  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
      
      <div className="space-y-2">
        <Label htmlFor="companyName">Nome da empresa</Label>
        <Input 
          id="companyName" 
          type="text" 
          placeholder="Empresa XYZ" 
          value={companyName}
          onChange={(e) => setCompanyName(e.target.value)}
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="cnpj">CNPJ</Label>
        <Input 
          id="cnpj" 
          type="text" 
          placeholder="00.000.000/0000-00" 
          value={cnpj}
          onChange={(e) => setCnpj(e.target.value)}
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="companyEmail">E-mail corporativo</Label>
        <Input 
          id="companyEmail" 
          type="email" 
          placeholder="contato@empresa.com" 
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="companyPassword">Senha</Label>
        <Input 
          id="companyPassword" 
          type="password" 
          placeholder="********" 
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="confirmCompanyPassword">Confirmar Senha</Label>
        <Input 
          id="confirmCompanyPassword" 
          type="password" 
          placeholder="********" 
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="phone">Telefone</Label>
        <Input 
          id="phone" 
          type="tel" 
          placeholder="(00) 00000-0000" 
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="description">Descrição da empresa</Label>
        <Textarea 
          id="description" 
          placeholder="Descreva brevemente sua empresa, área de atuação, etc." 
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={4}
        />
      </div>
      
      <Button type="submit" className="w-full">
        Cadastrar <ArrowRight className="ml-2 h-4 w-4" />
      </Button>
    </form>
  );
};
