import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getMisCandidaturas } from "../api/candidaturas";

const estadoColor = {
  enviada: "bg-paper-dim text-ink-soft",
  "en revisión": "bg-violet-soft text-violet",
  entrevista: "bg-mint-soft text-ink",
  rechazada: "bg-coral/10 text-coral",
  aceptada: "bg-mint text-ink",
};

export default function MisCandidaturas() {
  const [candidaturas, setCandidaturas] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    setCargando(true);
    getMisCandidaturas()
      .then(setCandidaturas)
      .catch(() => setError("No se pudieron cargar tus candidaturas."))
      .finally(() => setCargando(false));
  }, []);

  return (
    <div className="max-w-2xl mx-auto px-6 py-12">
      <h1 className="font-display font-bold text-2xl">Mis candidaturas</h1>
      <p className="text-ink-soft text-sm mt-1">
        Sigue el estado de tus aplicaciones a ofertas.
      </p>

      {cargando && (
        <p className="text-ink-soft text-sm mt-8 text-center">Cargando...</p>
      )}
      {error && <p className="text-sm text-coral mt-8">{error}</p>}

      <div className="mt-8 space-y-4">
        {!cargando &&
          !error &&
          candidaturas.map((c) => (
            <Link
              to={`/ofertas/${c.oferta?._id}`}
              key={c._id}
              className="block border border-ink/10 rounded-xl p-5 bg-white hover:border-violet/40 transition-colors"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold">{c.oferta?.titulo}</h3>
                  <p className="text-sm text-ink-soft mt-0.5">
                    {c.oferta?.empresa?.nombreEmpresa}
                  </p>
                </div>
                <span
                  className={`text-xs font-medium px-3 py-1 rounded-full capitalize ${estadoColor[c.estado]}`}
                >
                  {c.estado}
                </span>
              </div>
              <p className="text-xs text-ink-soft mt-3">
                Aplicaste el {new Date(c.createdAt).toLocaleDateString("es-ES")}
              </p>
            </Link>
          ))}

        {!cargando && !error && candidaturas.length === 0 && (
          <p className="text-ink-soft text-sm">
            Todavía no has aplicado a ninguna oferta.
          </p>
        )}
      </div>
    </div>
  );
}
