import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { crearOferta } from "../api/ofertas";

export default function PublicarOferta() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    titulo: "",
    descripcion: "",
    tecnologias: "",
    modalidad: "remoto",
    area: "desarrollo",
    salarioMin: "",
    salarioMax: "",
    formate: false,
  });
  const [error, setError] = useState("");
  const [enviando, setEnviando] = useState(false);

  function handleChange(field, value) {
    setForm((f) => ({ ...f, [field]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setEnviando(true);
    try {
      const payload = {
        ...form,
        tecnologias: form.tecnologias
          .split(",")
          .map((t) => t.trim())
          .filter(Boolean),
        salarioMin: Number(form.salarioMin),
        salarioMax: Number(form.salarioMax),
      };
      await crearOferta(payload);
      navigate("/mis-ofertas");
    } catch (err) {
      setError(
        err.response?.data?.message || "No se pudo publicar la oferta."
      );
    } finally {
      setEnviando(false);
    }
  }

  return (
    <div className="max-w-xl mx-auto px-6 py-12">
      <h1 className="font-display font-bold text-2xl">Publicar oferta</h1>
      <p className="text-ink-soft text-sm mt-1">
        El rango salarial es obligatorio: en DevFirst toda oferta es transparente.
      </p>

      {error && (
        <p className="text-sm text-coral bg-coral/10 border border-coral/20 rounded-lg px-3 py-2 mt-4">
          {error}
        </p>
      )}

      <form onSubmit={handleSubmit} className="mt-6 space-y-5">
        <Field
          label="Título del puesto"
          value={form.titulo}
          onChange={(v) => handleChange("titulo", v)}
          placeholder="Desarrollador/a Frontend Jr."
        />

        <label className="block">
          <span className="text-sm font-medium text-ink-soft">Descripción</span>
          <textarea
            value={form.descripcion}
            onChange={(e) => handleChange("descripcion", e.target.value)}
            required
            rows={4}
            className="mt-1 w-full border border-ink/15 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-violet/40"
          />
        </label>

        <Field
          label="Tecnologías (separadas por coma)"
          value={form.tecnologias}
          onChange={(v) => handleChange("tecnologias", v)}
          placeholder="React, TypeScript, CSS"
        />

        <div className="grid grid-cols-2 gap-4">
          <label className="block">
            <span className="text-sm font-medium text-ink-soft">Modalidad</span>
            <select
              value={form.modalidad}
              onChange={(e) => handleChange("modalidad", e.target.value)}
              className="mt-1 w-full border border-ink/15 rounded-lg px-3 py-2.5 text-sm"
            >
              <option value="remoto">Remoto</option>
              <option value="presencial">Presencial</option>
              <option value="hibrido">Híbrido</option>
            </select>
          </label>
          <label className="block">
            <span className="text-sm font-medium text-ink-soft">Área</span>
            <select
              value={form.area}
              onChange={(e) => handleChange("area", e.target.value)}
              className="mt-1 w-full border border-ink/15 rounded-lg px-3 py-2.5 text-sm"
            >
              <option value="desarrollo">Desarrollo</option>
              <option value="ciberseguridad">Ciberseguridad</option>
              <option value="datos">Datos</option>
            </select>
          </label>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <Field
            label="Salario mínimo (€/año)"
            type="number"
            value={form.salarioMin}
            onChange={(v) => handleChange("salarioMin", v)}
            placeholder="18000"
          />
          <Field
            label="Salario máximo (€/año)"
            type="number"
            value={form.salarioMax}
            onChange={(v) => handleChange("salarioMax", v)}
            placeholder="22000"
          />
        </div>

        <label className="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            checked={form.formate}
            onChange={(e) => handleChange("formate", e.target.checked)}
            className="accent-violet"
          />
          Es una oferta "Fórmate y trabaja" (formamos al candidato sin experiencia previa)
        </label>

        <button
          type="submit"
          disabled={enviando}
          className="bg-violet text-white font-semibold px-6 py-3 rounded-full hover:bg-ink transition-colors disabled:opacity-60"
        >
          {enviando ? "Publicando..." : "Publicar oferta"}
        </button>
      </form>
    </div>
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
        className="mt-1 w-full border border-ink/15 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-violet/40"
      />
    </label>
  );
}
