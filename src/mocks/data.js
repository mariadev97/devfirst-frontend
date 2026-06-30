// Datos de prueba para maquetar el frontend sin backend todavía.
// Cuando conectemos la API real, estos mismos "shapes" serán los que
// devuelva MongoDB, así que conviene no desviarse mucho del esquema.

export const ofertasMock = [
  {
    _id: "o1",
    titulo: "Desarrollador/a Frontend React Jr.",
    empresa: { _id: "e1", nombreEmpresa: "TechStartup Asturias", ubicacion: "Oviedo" },
    descripcion:
      "Buscamos a alguien recién titulado para sumarse al equipo de producto. Trabajarás junto a un dev senior en la construcción de nuevas funcionalidades del panel de cliente.",
    tecnologias: ["React", "TypeScript", "CSS"],
    modalidad: "remoto",
    area: "desarrollo",
    salarioMin: 18000,
    salarioMax: 22000,
    formate: false,
    createdAt: "2026-06-20",
  },
  {
    _id: "o2",
    titulo: "Backend Jr. — Node.js",
    empresa: { _id: "e2", nombreEmpresa: "Innova Labs", ubicacion: "Oviedo" },
    descripcion:
      "Únete a nuestro equipo backend para aprender a construir APIs REST robustas. Mentoría incluida durante los primeros 3 meses.",
    tecnologias: ["Node.js", "Express", "MongoDB"],
    modalidad: "hibrido",
    area: "desarrollo",
    salarioMin: 19000,
    salarioMax: 23000,
    formate: true,
    createdAt: "2026-06-18",
  },
  {
    _id: "o3",
    titulo: "Analista de Datos Jr.",
    empresa: { _id: "e3", nombreEmpresa: "DataWise Solutions", ubicacion: "Madrid" },
    descripcion:
      "Procesarás y analizarás datasets reales de clientes, generando dashboards e informes con apoyo del equipo senior.",
    tecnologias: ["Python", "SQL", "Power BI"],
    modalidad: "presencial",
    area: "datos",
    salarioMin: 20000,
    salarioMax: 24000,
    formate: false,
    createdAt: "2026-06-15",
  },
  {
    _id: "o4",
    titulo: "Técnico Junior de Ciberseguridad",
    empresa: { _id: "e4", nombreEmpresa: "SecureBase", ubicacion: "Remoto" },
    descripcion:
      "Te formamos en auditoría de sistemas y respuesta ante incidentes. Buscamos motivación y ganas de aprender, no se requiere experiencia previa.",
    tecnologias: ["Linux", "Networking", "Python"],
    modalidad: "remoto",
    area: "ciberseguridad",
    salarioMin: 19500,
    salarioMax: 21000,
    formate: true,
    createdAt: "2026-06-10",
  },
];

export const candidatoMock = {
  _id: "c1",
  nombre: "María",
  apellidos: "Álvarez González",
  email: "maria@example.com",
  formacion: "CFGS Desarrollo de Aplicaciones Web — 2025",
  experiencia: "",
  stackTecnologico: ["React", "Node.js", "MongoDB", "Git"],
  ubicacion: "Oviedo, Asturias",
  disponibilidad: true,
};

export const empresaMock = {
  _id: "e1",
  nombreEmpresa: "TechStartup Asturias",
  sector: "Software",
  ubicacion: "Oviedo, Asturias",
  descripcion: "Startup de software B2B en fase de crecimiento.",
};

export const candidaturasMock = [
  {
    _id: "cd1",
    oferta: ofertasMock[0],
    estado: "en revisión",
    fechaAplicacion: "2026-06-22",
  },
  {
    _id: "cd2",
    oferta: ofertasMock[1],
    estado: "entrevista",
    fechaAplicacion: "2026-06-19",
  },
];

export const candidatosRecibidosMock = [
  {
    _id: "cd3",
    candidato: candidatoMock,
    oferta: ofertasMock[0],
    estado: "en revisión",
    fechaAplicacion: "2026-06-23",
  },
];
