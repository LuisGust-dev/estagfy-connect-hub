
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gray-50 border-t border-gray-200 py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4 text-estagfy-800">EstagFy</h3>
            <p className="text-gray-600">
              Conectando alunos e empresas para oportunidades de estágio.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4 text-estagfy-800">Links Rápidos</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-600 hover:text-estagfy-600">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-600 hover:text-estagfy-600">
                  Sobre Nós
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-600 hover:text-estagfy-600">
                  Contato
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4 text-estagfy-800">Legal</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/terms" className="text-gray-600 hover:text-estagfy-600">
                  Termos de Uso
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-gray-600 hover:text-estagfy-600">
                  Política de Privacidade
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-200 mt-8 pt-4 text-center text-gray-500 text-sm">
          &copy; {new Date().getFullYear()} EstagFy. Todos os direitos reservados.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
