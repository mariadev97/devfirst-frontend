import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Registro() {
  const [role, setRole] = useState("candidato");
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [cargando, setCargando] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setCargando(true);
    try {
      const payload = {
        email,
        password,
        role,
        ...(role === "candidato" ? { nombre } : { nombreEmpresa: nombre }),
      };
      await register(payload);
      navigate("/perfil");
    } catch (err) {
      setError(
        err.response?.data?.message || "No se pudo crear la cuenta. Inténtalo de nuevo."
      );
    } finally {
      setCargando(false);
    }
  }

  return (
    <div className="max-w-md mx-auto px-6 py-16">
      <h1 className="font-display font-bold text-2xl">Crear cuenta</h1>
      <p className="text-ink-soft text-sm mt-1">
        Elige cómo vas a usar DevFirst.
      </p>

      <div className="grid grid-cols-2 gap-3 mt-6">
        <RoleOption
          label="Candidato/a"
          description="Busco mi primer empleo IT"
          active={role === "candidato"}
          onClick={() => setRole("candidato")}
        />
        <RoleOption
          label="Empresa"
          description="Busco talento junior"
          active={role === "empresa"}
          onClick={() => setRole("empresa")}
        />
      </div>

      {error && (
        <p className="text-sm text-coral bg-coral/10 border border-coral/20 rounded-lg px-3 py-2 mt-4">
          {error}
        </p>
      )}

      <form onSubmit={handleSubmit} className="mt-8 space-y-4">
        <Field
          label={role === "candidato" ? "Nombre completo" : "Nombre de la empresa"}
          value={nombre}
          onChange={setNombre}
          placeholder={role === "candidato" ? "María Álvarez" : "TechStartup Asturias"}
        />
        <Field
          label="Email"
          type="email"
          value={email}
          onChange={setEmail}
          placeholder="tucorreo@ejemplo.com"
        />
        <Field
          label="Contraseña"
          type="password"
          value={password}
          onChange={setPassword}
          placeholder="••••••••"
        />

        <button
          type="submit"
          disabled={cargando}
          className="w-full bg-violet text-white font-semibold py-3 rounded-full hover:bg-ink transition-colors mt-2 disabled:opacity-60"
        >
          {cargando ? "Creando cuenta..." : `Crear cuenta como ${role}`}
        </button>
      </form>

      <p className="text-sm text-ink-soft mt-6 text-center">
        ¿Ya tienes cuenta?{" "}
        <Link to="/login" className="text-violet font-medium">
          Inicia sesión
        </Link>
      </p>
    </div>
  );
}

function RoleOption({ label, description, active, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`text-left p-4 rounded-xl border transition-colors ${
        active
          ? "border-violet bg-violet-soft"
          : "border-ink/15 hover:border-ink/30"
      }`}
    >
      <p className="font-semibold text-sm">{label}</p>
      <p className="text-xs text-ink-soft mt-1">{description}</p>
    </button>
  );
}

function Field({ label, type = "text", value, onChange, placeholder }) {
  return (
    <label className="block">
      <span className="text-sm font-medium text-ink-soft">{label}</span>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        required
        className="mt-1 w-full border border-ink/15 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-violet/40 focus:border-violet"
      />
    </label>
  );
}
