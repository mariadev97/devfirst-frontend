import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const [email, setEmail] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    // TODO: cuando exista el backend, aquí haremos POST /api/auth/login
    // Por ahora, simulamos login como candidato para poder navegar la app.
    login({ role: "candidato", nombre: "María" });
    navigate("/ofertas");
  }

  return (
    <div className="max-w-sm mx-auto px-6 py-20">
      <h1 className="font-display font-bold text-2xl">Iniciar sesión</h1>
      <p className="text-ink-soft text-sm mt-1">
        Accede a tu cuenta de DevFirst.
      </p>

      <form onSubmit={handleSubmit} className="mt-8 space-y-4">
        <label className="block">
          <span className="text-sm font-medium text-ink-soft">Email</span>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="tucorreo@ejemplo.com"
            required
            className="mt-1 w-full border border-ink/15 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-violet/40 focus:border-violet"
          />
        </label>
        <label className="block">
          <span className="text-sm font-medium text-ink-soft">Contraseña</span>
          <input
            type="password"
            placeholder="••••••••"
            required
            className="mt-1 w-full border border-ink/15 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-violet/40 focus:border-violet"
          />
        </label>

        <button
          type="submit"
          className="w-full bg-violet text-white font-semibold py-3 rounded-full hover:bg-ink transition-colors mt-2"
        >
          Entrar
        </button>
      </form>

      <p className="text-sm text-ink-soft mt-6 text-center">
        ¿Aún no tienes cuenta?{" "}
        <Link to="/registro" className="text-violet font-medium">
          Regístrate
        </Link>
      </p>
    </div>
  );
}
