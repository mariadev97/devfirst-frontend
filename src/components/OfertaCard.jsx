import { Link } from "react-router-dom";
import TechTag from "./TechTag";

const modalidadLabel = {
  remoto: "Remoto",
  presencial: "Presencial",
  hibrido: "Híbrido",
};

export default function OfertaCard({ oferta }) {
  return (
    <Link
      to={`/ofertas/${oferta._id}`}
      className="block bg-white border border-ink/10 rounded-2xl p-6 hover:border-violet/40 hover:shadow-[0_8px_24px_-12px_rgba(91,79,224,0.25)] transition-all"
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="font-display font-semibold text-lg leading-snug">
            {oferta.titulo}
          </h3>
          <p className="text-sm text-ink-soft mt-1">
            {oferta.empresa.nombreEmpresa} · {oferta.empresa.ubicacion}
          </p>
        </div>
        {oferta.formate && (
          <span className="shrink-0 text-xs font-semibold bg-mint-soft text-ink px-3 py-1 rounded-full">
            Fórmate y trabaja
          </span>
        )}
      </div>

      <div className="flex flex-wrap gap-2 mt-4">
        {oferta.tecnologias.map((t) => (
          <TechTag key={t}>{t}</TechTag>
        ))}
      </div>

      <div className="flex items-center justify-between mt-5 pt-4 border-t border-ink/10">
        <span className="text-sm text-ink-soft">
          {modalidadLabel[oferta.modalidad]}
        </span>
        <span className="font-mono-tag text-sm font-medium">
          [{oferta.salarioMin.toLocaleString("es-ES")}€–
          {oferta.salarioMax.toLocaleString("es-ES")}€]
        </span>
      </div>
    </Link>
  );
}
