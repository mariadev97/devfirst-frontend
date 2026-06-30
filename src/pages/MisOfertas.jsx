import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getMisOfertas } from "../api/ofertas";
import { getCandidaturasPorOferta } from "../api/candidaturas";

export default function MisOfertas() {
  const [ofertas, setOfertas] = useState([]);
  const [candidaturasPorOferta, setCandidaturasPorOferta] = useState({});
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    setCargando(true);
    setError("");
    getMisOfertas()
      .then(async (ofertasRecibidas) => {
        setOfertas(ofertasRecibidas);
        // Por cada oferta, pedimos sus candidaturas en paralelo
        const entradas = await Promise.all(
          ofertasRecibidas.map((o) =>
            getCandidaturasPorOferta(o._id)
              .then((cands) => [o._id, cands])
              .catch(() => [o._id, []])
          )
        );
        setCandidaturasPorOferta(Object.fromEntries(entradas));
      })
      .catch(() => setError("No se pudieron cargar tus ofertas."))
      .finally(() => setCargando(false));
  }, []);

  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <div className="flex items-center justify-between">
        <h1 className="font-display font-bold text-2xl">Mis ofertas</h1>
        <Link
          to="/publicar-oferta"
          className="bg-violet text-white font-semibold text-sm px-5 py-2.5 rounded-full hover:bg-ink transition-colors"
        >
          + Nueva oferta
        </Link>
      </div>

      {cargando && (
        <p className="text-ink-soft text-sm mt-8 text-center">Cargando tus ofertas...</p>
      )}
      {error && <p className="text-sm text-coral mt-8">{error}</p>}

      {!cargando && !error && ofertas.length === 0 && (
        <p className="text-ink-soft text-sm mt-8 text-center">
          Aún no has publicado ninguna oferta.
        </p>
      )}

      <div className="mt-8 space-y-6">
        {ofertas.map((oferta) => {
          const candidatos = candidaturasPorOferta[oferta._id] || [];
          return (
            <div
              key={oferta._id}
              className="border border-ink/10 rounded-2xl p-6 bg-white"
            >
              <div className="flex items-center justify-between">
                <h3 className="font-display font-semibold">{oferta.titulo}</h3>
                <span className="text-xs text-ink-soft">
                  {candidatos.length} candidatura{candidatos.length !== 1 && "s"}
                </span>
              </div>

              {candidatos.length === 0 ? (
                <p className="text-sm text-ink-soft mt-3">
                  Aún no has recibido candidaturas para esta oferta.
                </p>
              ) : (
                <ul className="mt-4 divide-y divide-ink/10">
                  {candidatos.map((c) => (
                    <li
                      key={c._id}
                      className="py-3 flex items-center justify-between text-sm"
                    >
                      <span className="font-medium">
                        {c.candidato?.nombre} {c.candidato?.apellidos}
                      </span>
                      <span className="font-mono-tag text-xs text-violet bg-violet-soft px-2 py-1 rounded">
                        {c.estado}
                      </span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
