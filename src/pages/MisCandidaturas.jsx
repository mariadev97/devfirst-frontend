import { Link } from "react-router-dom";
import { candidaturasMock } from "../mocks/data";

const estadoColor = {
  enviada: "bg-paper-dim text-ink-soft",
  "en revisión": "bg-violet-soft text-violet",
  entrevista: "bg-mint-soft text-ink",
  rechazada: "bg-coral/10 text-coral",
  aceptada: "bg-mint text-ink",
};

export default function MisCandidaturas() {
  return (
    <div className="max-w-2xl mx-auto px-6 py-12">
      <h1 className="font-display font-bold text-2xl">Mis candidaturas</h1>
      <p className="text-ink-soft text-sm mt-1">
        Sigue el estado de tus aplicaciones a ofertas.
      </p>

      <div className="mt-8 space-y-4">
        {candidaturasMock.map((c) => (
          <Link
            to={`/ofertas/${c.oferta._id}`}
            key={c._id}
            className="block border border-ink/10 rounded-xl p-5 bg-white hover:border-violet/40 transition-colors"
          >
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold">{c.oferta.titulo}</h3>
                <p className="text-sm text-ink-soft mt-0.5">
                  {c.oferta.empresa.nombreEmpresa}
                </p>
              </div>
              <span
                className={`text-xs font-medium px-3 py-1 rounded-full capitalize ${estadoColor[c.estado]}`}
              >
                {c.estado}
              </span>
            </div>
            <p className="text-xs text-ink-soft mt-3">
              Aplicaste el {new Date(c.fechaAplicacion).toLocaleDateString("es-ES")}
            </p>
          </Link>
        ))}

        {candidaturasMock.length === 0 && (
          <p className="text-ink-soft text-sm">
            Todavía no has aplicado a ninguna oferta.
          </p>
        )}
      </div>
    </div>
  );
}
