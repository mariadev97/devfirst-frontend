import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [cargando, setCargando] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setCargando(true);
    try {
      await login(email, password);
      navigate("/ofertas");
    } catch (err) {
      setError(
        err.response?.data?.message || "No se pudo iniciar sesión. Inténtalo de nuevo."
      );
    } finally {
      setCargando(false);
    }
  }

  return (
    <div className="max-w-sm mx-auto px-6 py-20">
      <h1 className="font-display font-bold text-2xl">Iniciar sesión</h1>
      <p className="text-ink-soft text-sm mt-1">
        Accede a tu cuenta de DevFirst.
      </p>

      {error && (
        <p className="text-sm text-coral bg-coral/10 border border-coral/20 rounded-lg px-3 py-2 mt-4">
          {error}
        </p>
      )}

      <form onSubmit={handleSubmit} className="mt-6 space-y-4">
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
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            required
            className="mt-1 w-full border border-ink/15 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-violet/40 focus:border-violet"
          />
        </label>

        <button
          type="submit"
          disabled={cargando}
          className="w-full bg-violet text-white font-semibold py-3 rounded-full hover:bg-ink transition-colors mt-2 disabled:opacity-60"
        >
          {cargando ? "Entrando..." : "Entrar"}
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
