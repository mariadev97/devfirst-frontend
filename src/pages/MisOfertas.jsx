import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getMisOfertas } from "../api/ofertas";
import { getCandidaturasPorOferta } from "../api/candidaturas";
import TechTag from "../components/TechTag";

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
                    <CandidaturaItem key={c._id} candidatura={c} />
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

function CandidaturaItem({ candidatura }) {
  const [abierto, setAbierto] = useState(false);
  const candidato = candidatura.candidato;

  return (
    <li className="py-3">
      <button
        type="button"
        onClick={() => setAbierto((v) => !v)}
        className="w-full flex items-center justify-between text-sm text-left"
      >
        <span className="font-medium">
          {candidato?.nombre} {candidato?.apellidos}
        </span>
        <span className="flex items-center gap-3">
          <span className="font-mono-tag text-xs text-violet bg-violet-soft px-2 py-1 rounded">
            {candidatura.estado}
          </span>
          <span className="text-ink-soft text-xs">
            {abierto ? "Ocultar perfil ▲" : "Ver perfil ▼"}
          </span>
        </span>
      </button>

      {abierto && (
        <div className="mt-3 ml-1 pl-3 border-l-2 border-violet-soft text-sm space-y-2">
          {candidato?.formacion && (
            <p>
              <span className="text-ink-soft">Formación: </span>
              {candidato.formacion}
            </p>
          )}
          {candidato?.ubicacion && (
            <p>
              <span className="text-ink-soft">Ubicación: </span>
              {candidato.ubicacion}
            </p>
          )}
          {candidato?.experiencia && (
            <p>
              <span className="text-ink-soft">Experiencia: </span>
              {candidato.experiencia}
            </p>
          )}
          <p>
            <span className="text-ink-soft">Disponibilidad: </span>
            {candidato?.disponibilidad ? "Disponible" : "No disponible"}
          </p>
          {candidato?.stackTecnologico?.length > 0 && (
            <div>
              <span className="text-ink-soft block mb-1">Stack tecnológico:</span>
              <div className="flex flex-wrap gap-2">
                {candidato.stackTecnologico.map((t) => (
                  <TechTag key={t}>{t}</TechTag>
                ))}
              </div>
            </div>
          )}
          {candidato?.user?.email && (
            <a
              href={`mailto:${candidato.user.email}?subject=${encodeURIComponent(
                "Tu candidatura en DevFirst"
              )}`}
              className="inline-block mt-2 text-xs font-semibold bg-violet text-white px-4 py-2 rounded-full hover:bg-ink transition-colors"
            >
              Contactar por email ↗
            </a>
          )}
        </div>
      )}
    </li>
  );
}