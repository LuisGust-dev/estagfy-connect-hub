
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowRight } from "lucide-react";

export const StudentRegisterForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [course, setCourse] = useState("");
  const [period, setPeriod] = useState("");
  const [resume, setResume] = useState<File | null>(null);
  const [error, setError] = useState("");
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (!name || !email || !password || !course || !period || !resume) {
      setError("Por favor, preencha todos os campos");
      return;
    }
    
    if (password !== confirmPassword) {
      setError("As senhas não coincidem");
      return;
    }
    
    // In a real app, we would send this data to a backend service
    console.log("Registering student:", { name, email, course, period, resume });
    
    // For prototype, redirect to student dashboard
    window.location.href = "/student/dashboard";
  };
  
  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
      
      <div className="space-y-2">
        <Label htmlFor="name">Nome completo</Label>
        <Input 
          id="name" 
          type="text" 
          placeholder="João da Silva" 
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="email">E-mail</Label>
        <Input 
          id="email" 
          type="email" 
          placeholder="seu@email.com" 
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="password">Senha</Label>
        <Input 
          id="password" 
          type="password" 
          placeholder="********" 
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="confirmPassword">Confirmar Senha</Label>
        <Input 
          id="confirmPassword" 
          type="password" 
          placeholder="********" 
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="course">Curso</Label>
        <Select value={course} onValueChange={setCourse}>
          <SelectTrigger>
            <SelectValue placeholder="Selecione seu curso" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="computacao">Ciência da Computação</SelectItem>
            <SelectItem value="engenharia">Engenharia</SelectItem>
            <SelectItem value="administracao">Administração</SelectItem>
            <SelectItem value="direito">Direito</SelectItem>
            <SelectItem value="medicina">Medicina</SelectItem>
            <SelectItem value="design">Design</SelectItem>
            <SelectItem value="outro">Outro</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="period">Período</Label>
        <Select value={period} onValueChange={setPeriod}>
          <SelectTrigger>
            <SelectValue placeholder="Selecione seu período" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="1">1º Período</SelectItem>
            <SelectItem value="2">2º Período</SelectItem>
            <SelectItem value="3">3º Período</SelectItem>
            <SelectItem value="4">4º Período</SelectItem>
            <SelectItem value="5">5º Período</SelectItem>
            <SelectItem value="6">6º Período</SelectItem>
            <SelectItem value="7">7º Período</SelectItem>
            <SelectItem value="8">8º Período</SelectItem>
            <SelectItem value="9">9º Período</SelectItem>
            <SelectItem value="10">10º Período</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="resume">Currículo (PDF ou DOC)</Label>
        <Input 
          id="resume" 
          type="file" 
          accept=".pdf,.doc,.docx" 
          onChange={(e) => setResume(e.target.files ? e.target.files[0] : null)}
        />
        <p className="text-xs text-gray-500">
          Formatos permitidos: PDF, DOC ou DOCX
        </p>
      </div>
      
      <Button type="submit" className="w-full">
        Cadastrar <ArrowRight className="ml-2 h-4 w-4" />
      </Button>
    </form>
  );
};
