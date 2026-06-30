import { useMemo, useState } from "react";
import { ofertasMock } from "../mocks/data";
import OfertaCard from "../components/OfertaCard";

export default function Ofertas() {
  const [tecnologia, setTecnologia] = useState("");
  const [modalidad, setModalidad] = useState("");
  const [area, setArea] = useState("");

  const ofertasFiltradas = useMemo(() => {
    return ofertasMock.filter((o) => {
      const matchTec =
        !tecnologia ||
        o.tecnologias.some((t) =>
          t.toLowerCase().includes(tecnologia.toLowerCase())
        );
      const matchModalidad = !modalidad || o.modalidad === modalidad;
      const matchArea = !area || o.area === area;
      return matchTec && matchModalidad && matchArea;
    });
  }, [tecnologia, modalidad, area]);

  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      <h1 className="font-display font-bold text-2xl">Ofertas para perfiles junior</h1>
      <p className="text-ink-soft text-sm mt-1">
        {ofertasFiltradas.length} oferta{ofertasFiltradas.length !== 1 && "s"} disponible
        {ofertasFiltradas.length !== 1 && "s"}
      </p>

      <div className="flex flex-wrap gap-3 mt-6">
        <input
          value={tecnologia}
          onChange={(e) => setTecnologia(e.target.value)}
          placeholder="Buscar por tecnología (ej. React)"
          className="border border-ink/15 rounded-lg px-3 py-2 text-sm flex-1 min-w-[220px] focus:outline-none focus:ring-2 focus:ring-violet/40"
        />
        <select
          value={modalidad}
          onChange={(e) => setModalidad(e.target.value)}
          className="border border-ink/15 rounded-lg px-3 py-2 text-sm"
        >
          <option value="">Modalidad</option>
          <option value="remoto">Remoto</option>
          <option value="presencial">Presencial</option>
          <option value="hibrido">Híbrido</option>
        </select>
        <select
          value={area}
          onChange={(e) => setArea(e.target.value)}
          className="border border-ink/15 rounded-lg px-3 py-2 text-sm"
        >
          <option value="">Área</option>
          <option value="desarrollo">Desarrollo</option>
          <option value="ciberseguridad">Ciberseguridad</option>
          <option value="datos">Datos</option>
        </select>
      </div>

      <div className="grid sm:grid-cols-2 gap-5 mt-8">
        {ofertasFiltradas.map((oferta) => (
          <OfertaCard key={oferta._id} oferta={oferta} />
        ))}
        {ofertasFiltradas.length === 0 && (
          <p className="text-ink-soft text-sm col-span-2 py-10 text-center">
            No hay ofertas que coincidan con esos filtros.
          </p>
        )}
      </div>
    </div>
  );
}
