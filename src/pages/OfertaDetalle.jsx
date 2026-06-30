import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ofertasMock } from "../mocks/data";
import { useAuth } from "../context/AuthContext";
import TechTag from "../components/TechTag";

const modalidadLabel = {
  remoto: "Remoto",
  presencial: "Presencial",
  hibrido: "Híbrido",
};

export default function OfertaDetalle() {
  const { id } = useParams();
  const { user } = useAuth();
  const [aplicado, setAplicado] = useState(false);
  const oferta = ofertasMock.find((o) => o._id === id);

  if (!oferta) {
    return (
      <div className="max-w-3xl mx-auto px-6 py-16 text-center">
        <p className="text-ink-soft">No se encontró esta oferta.</p>
        <Link to="/ofertas" className="text-violet font-medium">
          Volver a ofertas
        </Link>
      </div>
    );
  }

  function handleAplicar() {
    // TODO: cuando exista el backend, POST /api/candidaturas
    setAplicado(true);
  }

  return (
    <div className="max-w-3xl mx-auto px-6 py-12">
      <Link to="/ofertas" className="text-sm text-ink-soft hover:text-violet">
        ← Volver a ofertas
      </Link>

      <div className="flex items-start justify-between gap-4 mt-4">
        <div>
          <h1 className="font-display font-bold text-2xl">{oferta.titulo}</h1>
          <p className="text-ink-soft mt-1">
            {oferta.empresa.nombreEmpresa} · {oferta.empresa.ubicacion}
          </p>
        </div>
        {oferta.formate && (
          <span className="shrink-0 text-xs font-semibold bg-mint-soft text-ink px-3 py-1 rounded-full">
            Fórmate y trabaja
          </span>
        )}
      </div>

      <div className="flex flex-wrap gap-2 mt-5">
        {oferta.tecnologias.map((t) => (
          <TechTag key={t}>{t}</TechTag>
        ))}
      </div>

      <div className="flex gap-6 mt-6 text-sm">
        <Info label="Modalidad" value={modalidadLabel[oferta.modalidad]} />
        <Info
          label="Salario"
          value={`${oferta.salarioMin.toLocaleString("es-ES")}€ – ${oferta.salarioMax.toLocaleString("es-ES")}€`}
        />
        <Info label="Área" value={oferta.area} />
      </div>

      <p className="text-ink-soft leading-relaxed mt-8">{oferta.descripcion}</p>

      <div className="mt-10 pt-6 border-t border-ink/10">
        {!user && (
          <p className="text-sm text-ink-soft">
            <Link to="/login" className="text-violet font-medium">
              Inicia sesión
            </Link>{" "}
            como candidato para aplicar a esta oferta.
          </p>
        )}
        {user?.role === "candidato" && !aplicado && (
          <button
            onClick={handleAplicar}
            className="bg-violet text-white font-semibold px-6 py-3 rounded-full hover:bg-ink transition-colors"
          >
            Aplicar a esta oferta
          </button>
        )}
        {user?.role === "candidato" && aplicado && (
          <p className="text-mint font-medium">
            ✓ Has aplicado a esta oferta. Sigue su estado en "Mis candidaturas".
          </p>
        )}
        {user?.role === "empresa" && (
          <p className="text-sm text-ink-soft">
            Has iniciado sesión como empresa. Solo los candidatos pueden aplicar a ofertas.
          </p>
        )}
      </div>
    </div>
  );
}

function Info({ label, value }) {
  return (
    <div>
      <p className="text-xs text-ink-soft uppercase tracking-wide">{label}</p>
      <p className="font-medium mt-0.5 capitalize">{value}</p>
    </div>
  );
}
