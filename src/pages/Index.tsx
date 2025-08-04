
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useAuth } from "@/hooks/useAuth";
import { Navigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const Index = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div>Carregando...</div>
      </div>
    );
  }

  // Redirect authenticated users to their respective dashboards
  if (user) {
    // We'll need to get user type from the database
    // For now, let's redirect to a generic dashboard
    return <Navigate to="/student/dashboard" replace />;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar isLoggedIn={!!user} />

      {/* Hero Section */}
      <div className="hero-gradient py-20 md:py-32">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
              Conectando alunos e empresas para oportunidades de estágio
            </h1>
            <p className="text-xl text-white/80 mb-8">
              Encontre as melhores oportunidades de estágio ou os melhores talentos 
              para sua empresa com o EstagFy.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button size="lg" asChild className="bg-white text-estagfy-700 hover:bg-gray-100">
                <Link to="/auth">Entrar</Link>
              </Button>
              <Button size="lg" asChild className="bg-estagfy-500 hover:bg-estagfy-600 text-white">
                <Link to="/auth">Cadastre-se <ArrowRight className="ml-2 h-4 w-4" /></Link>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-16">Como funciona o EstagFy</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="bg-estagfy-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-estagfy-600 text-2xl font-bold">1</span>
              </div>
              <h3 className="text-xl font-semibold mb-3">Crie sua conta</h3>
              <p className="text-gray-600">
                Cadastre-se como aluno ou empresa e preencha seu perfil com todas as informações necessárias.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="bg-estagfy-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-estagfy-600 text-2xl font-bold">2</span>
              </div>
              <h3 className="text-xl font-semibold mb-3">Conecte-se</h3>
              <p className="text-gray-600">
                Alunos podem buscar vagas de estágio e empresas podem encontrar talentos qualificados.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="bg-estagfy-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-estagfy-600 text-2xl font-bold">3</span>
              </div>
              <h3 className="text-xl font-semibold mb-3">Comece seu estágio</h3>
              <p className="text-gray-600">
                Após a contratação, gerencie todo o processo de estágio diretamente na plataforma.
              </p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Testimonials */}
      <div className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-16">O que nossos usuários dizem</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <p className="italic text-gray-600 mb-4">
                "O EstagFy transformou a forma como recrutamos estagiários. Encontramos candidatos qualificados 
                de maneira rápida e eficiente."
              </p>
              <div className="flex items-center">
                <div className="w-10 h-10 bg-estagfy-200 rounded-full"></div>
                <div className="ml-4">
                  <p className="font-semibold">Maria Silva</p>
                  <p className="text-sm text-gray-500">RH, Empresa ABC</p>
                </div>
              </div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <p className="italic text-gray-600 mb-4">
                "Consegui meu primeiro estágio através do EstagFy. A plataforma é intuitiva e me ajudou 
                a encontrar a oportunidade perfeita para o meu perfil."
              </p>
              <div className="flex items-center">
                <div className="w-10 h-10 bg-estagfy-200 rounded-full"></div>
                <div className="ml-4">
                  <p className="font-semibold">João Santos</p>
                  <p className="text-sm text-gray-500">Estudante de Engenharia</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">Pronto para começar?</h2>
            <p className="text-xl text-gray-600 mb-8">
              Junte-se a milhares de estudantes e empresas que já estão utilizando o EstagFy.
            </p>
            <Button size="lg" asChild>
              <Link to="/auth">Cadastre-se gratuitamente</Link>
            </Button>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Index;
