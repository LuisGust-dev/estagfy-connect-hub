import { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";

const Logout = () => {
  const { signOut } = useAuth();
  const { toast } = useToast();

  useEffect(() => {
    const handleLogout = async () => {
      const { error } = await signOut();
      
      if (error) {
        toast({
          title: "Erro ao sair",
          description: error.message,
          variant: "destructive"
        });
      } else {
        toast({
          title: "Logout realizado com sucesso",
          description: "Você foi desconectado da sua conta"
        });
      }
    };

    handleLogout();
  }, [signOut, toast]);

  return <Navigate to="/" replace />;
};

export default Logout;