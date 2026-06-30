import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate("/");
  }

  return (
    <header className="border-b border-ink/10 bg-paper/90 backdrop-blur sticky top-0 z-20">
      <nav className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 group">
          <span className="font-display font-bold text-lg tracking-tight">
            Dev<span className="text-violet">First</span>
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-7 text-sm font-medium text-ink-soft">
          <Link to="/ofertas" className="hover:text-violet transition-colors">
            Ofertas
          </Link>
          {user?.role === "candidato" && (
            <Link to="/mis-candidaturas" className="hover:text-violet transition-colors">
              Mis candidaturas
            </Link>
          )}
          {user?.role === "empresa" && (
            <Link to="/mis-ofertas" className="hover:text-violet transition-colors">
              Mis ofertas
            </Link>
          )}
          {user && (
            <Link to="/perfil" className="hover:text-violet transition-colors">
              Mi perfil
            </Link>
          )}
        </div>

        <div className="flex items-center gap-3">
          {!user ? (
            <>
              <Link
                to="/login"
                className="text-sm font-medium text-ink-soft hover:text-ink transition-colors"
              >
                Iniciar sesión
              </Link>
              <Link
                to="/registro"
                className="text-sm font-semibold bg-ink text-paper px-4 py-2 rounded-full hover:bg-violet transition-colors"
              >
                Registrarse
              </Link>
            </>
          ) : (
            <>
              <span className="hidden sm:inline text-sm text-ink-soft">
                {user.email}
              </span>
              <button
                onClick={handleLogout}
                className="text-sm font-medium border border-ink/15 px-4 py-2 rounded-full hover:border-violet hover:text-violet transition-colors"
              >
                Salir
              </button>
            </>
          )}
        </div>
      </nav>
    </header>
  );
}
