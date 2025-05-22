
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

interface NavbarProps {
  isLoggedIn?: boolean;
  userType?: "student" | "company";
}

const Navbar = ({ isLoggedIn = false, userType }: NavbarProps) => {
  return (
    <nav className="bg-white shadow-sm py-4">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-display font-bold text-estagfy-700">
          Estag<span className="text-estagfy-500">Fy</span>
        </Link>
        
        <div className="hidden md:flex items-center space-x-4">
          {!isLoggedIn ? (
            <>
              <Button variant="outline" asChild>
                <Link to="/login">Login</Link>
              </Button>
              <Button asChild>
                <Link to="/register">Cadastre-se</Link>
              </Button>
            </>
          ) : (
            <>
              <Button variant="outline" asChild>
                <Link to={userType === "student" ? "/student/profile" : "/company/profile"}>
                  Meu Perfil
                </Link>
              </Button>
              <Button variant="destructive" asChild>
                <Link to="/logout">Sair</Link>
              </Button>
            </>
          )}
        </div>
        
        {/* Mobile menu button could go here */}
      </div>
    </nav>
  );
};

export default Navbar;
