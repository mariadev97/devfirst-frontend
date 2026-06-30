import { useEffect, useState } from "react";
import { getOfertas } from "../api/ofertas";
import OfertaCard from "../components/OfertaCard";

export default function Ofertas() {
  const [tecnologia, setTecnologia] = useState("");
  const [modalidad, setModalidad] = useState("");
  const [area, setArea] = useState("");

  const [ofertas, setOfertas] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    setCargando(true);
    setError("");

    const filtros = {};
    if (tecnologia) filtros.tecnologia = tecnologia;
    if (modalidad) filtros.modalidad = modalidad;
    if (area) filtros.area = area;

    // Pequeño debounce para no lanzar una petición en cada pulsación de tecla
    const timeoutId = setTimeout(() => {
      getOfertas(filtros)
        .then(setOfertas)
        .catch(() => setError("No se pudieron cargar las ofertas. Inténtalo de nuevo."))
        .finally(() => setCargando(false));
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [tecnologia, modalidad, area]);

  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      <h1 className="font-display font-bold text-2xl">Ofertas para perfiles junior</h1>
      <p className="text-ink-soft text-sm mt-1">
        {cargando
          ? "Buscando ofertas..."
          : `${ofertas.length} oferta${ofertas.length !== 1 ? "s" : ""} disponible${
              ofertas.length !== 1 ? "s" : ""
            }`}
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

      {error && (
        <p className="text-sm text-coral bg-coral/10 border border-coral/20 rounded-lg px-3 py-2 mt-6">
          {error}
        </p>
      )}

      <div className="grid sm:grid-cols-2 gap-5 mt-8">
        {!cargando && !error && ofertas.map((oferta) => (
          <OfertaCard key={oferta._id} oferta={oferta} />
        ))}
        {!cargando && !error && ofertas.length === 0 && (
          <p className="text-ink-soft text-sm col-span-2 py-10 text-center">
            No hay ofertas que coincidan con esos filtros.
          </p>
        )}
        {cargando && (
          <p className="text-ink-soft text-sm col-span-2 py-10 text-center">
            Cargando ofertas...
          </p>
        )}
      </div>
    </div>
  );
}
