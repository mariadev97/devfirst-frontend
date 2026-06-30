import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { candidatoMock, empresaMock } from "../mocks/data";
import TechTag from "../components/TechTag";

export default function Perfil() {
  const { user } = useAuth();

  if (!user) {
    return (
      <div className="max-w-xl mx-auto px-6 py-16 text-center text-ink-soft">
        Inicia sesión para ver tu perfil.
      </div>
    );
  }

  return user.role === "candidato" ? <PerfilCandidato /> : <PerfilEmpresa />;
}

function PerfilCandidato() {
  const [perfil, setPerfil] = useState(candidatoMock);
  const [editando, setEditando] = useState(false);

  function handleChange(field, value) {
    setPerfil((p) => ({ ...p, [field]: value }));
  }

  function handleSave(e) {
    e.preventDefault();
    // TODO: PUT /api/candidatos/:id
    setEditando(false);
  }

  return (
    <div className="max-w-2xl mx-auto px-6 py-12">
      <div className="flex items-center justify-between">
        <h1 className="font-display font-bold text-2xl">Mi perfil</h1>
        <button
          onClick={() => setEditando((v) => !v)}
          className="text-sm font-medium text-violet"
        >
          {editando ? "Cancelar" : "Editar"}
        </button>
      </div>

      <form onSubmit={handleSave} className="mt-6 space-y-5">
        <div className="grid sm:grid-cols-2 gap-4">
          <Field
            label="Nombre"
            value={perfil.nombre}
            editable={editando}
            onChange={(v) => handleChange("nombre", v)}
          />
          <Field
            label="Apellidos"
            value={perfil.apellidos}
            editable={editando}
            onChange={(v) => handleChange("apellidos", v)}
          />
        </div>
        <Field
          label="Formación"
          value={perfil.formacion}
          editable={editando}
          onChange={(v) => handleChange("formacion", v)}
        />
        <Field
          label="Ubicación"
          value={perfil.ubicacion}
          editable={editando}
          onChange={(v) => handleChange("ubicacion", v)}
        />

        <div>
          <span className="text-sm font-medium text-ink-soft">Stack tecnológico</span>
          <div className="flex flex-wrap gap-2 mt-2">
            {perfil.stackTecnologico.map((t) => (
              <TechTag key={t}>{t}</TechTag>
            ))}
          </div>
        </div>

        {editando && (
          <button
            type="submit"
            className="bg-violet text-white font-semibold px-6 py-2.5 rounded-full hover:bg-ink transition-colors"
          >
            Guardar cambios
          </button>
        )}
      </form>
    </div>
  );
}

function PerfilEmpresa() {
  const [perfil, setPerfil] = useState(empresaMock);
  const [editando, setEditando] = useState(false);

  function handleChange(field, value) {
    setPerfil((p) => ({ ...p, [field]: value }));
  }

  function handleSave(e) {
    e.preventDefault();
    // TODO: PUT /api/empresas/:id
    setEditando(false);
  }

  return (
    <div className="max-w-2xl mx-auto px-6 py-12">
      <div className="flex items-center justify-between">
        <h1 className="font-display font-bold text-2xl">Perfil de empresa</h1>
        <button
          onClick={() => setEditando((v) => !v)}
          className="text-sm font-medium text-violet"
        >
          {editando ? "Cancelar" : "Editar"}
        </button>
      </div>

      <form onSubmit={handleSave} className="mt-6 space-y-5">
        <Field
          label="Nombre de la empresa"
          value={perfil.nombreEmpresa}
          editable={editando}
          onChange={(v) => handleChange("nombreEmpresa", v)}
        />
        <div className="grid sm:grid-cols-2 gap-4">
          <Field
            label="Sector"
            value={perfil.sector}
            editable={editando}
            onChange={(v) => handleChange("sector", v)}
          />
          <Field
            label="Ubicación"
            value={perfil.ubicacion}
            editable={editando}
            onChange={(v) => handleChange("ubicacion", v)}
          />
        </div>
        <div>
          <span className="text-sm font-medium text-ink-soft">Descripción</span>
          {editando ? (
            <textarea
              value={perfil.descripcion}
              onChange={(e) => handleChange("descripcion", e.target.value)}
              rows={4}
              className="mt-1 w-full border border-ink/15 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-violet/40"
            />
          ) : (
            <p className="mt-1 text-sm">{perfil.descripcion}</p>
          )}
        </div>

        {editando && (
          <button
            type="submit"
            className="bg-violet text-white font-semibold px-6 py-2.5 rounded-full hover:bg-ink transition-colors"
          >
            Guardar cambios
          </button>
        )}
      </form>
    </div>
  );
}

function Field({ label, value, editable, onChange }) {
  return (
    <label className="block">
      <span className="text-sm font-medium text-ink-soft">{label}</span>
      {editable ? (
        <input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="mt-1 w-full border border-ink/15 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-violet/40"
        />
      ) : (
        <p className="mt-1 text-sm">{value || "—"}</p>
      )}
    </label>
  );
}
