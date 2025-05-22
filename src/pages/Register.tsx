
import { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { StudentRegisterForm } from "@/components/StudentRegisterForm";
import { CompanyRegisterForm } from "@/components/CompanyRegisterForm";

const Register = () => {
  const [activeTab, setActiveTab] = useState("student");
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="flex-grow flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-md w-full">
          <Card>
            <CardHeader className="space-y-1">
              <CardTitle className="text-2xl text-center">Cadastre-se</CardTitle>
              <CardDescription className="text-center">
                Escolha o tipo de conta que deseja criar
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="student" value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="grid w-full grid-cols-2 mb-8">
                  <TabsTrigger value="student">Aluno</TabsTrigger>
                  <TabsTrigger value="company">Empresa</TabsTrigger>
                </TabsList>
                <TabsContent value="student" className="space-y-4">
                  <StudentRegisterForm />
                </TabsContent>
                <TabsContent value="company" className="space-y-4">
                  <CompanyRegisterForm />
                </TabsContent>
              </Tabs>
              
              <div className="mt-6 text-center">
                <p className="text-sm text-gray-600">
                  Já possui uma conta?{" "}
                  <Link to="/login" className="text-estagfy-600 hover:underline font-medium">
                    Fazer login
                  </Link>
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Register;
