import api from "./client";

export function aplicarOferta(ofertaId) {
  return api.post("/candidaturas", { ofertaId }).then((res) => res.data);
}

export function getMisCandidaturas() {
  return api.get("/candidaturas/mias").then((res) => res.data);
}

export function getCandidaturasPorOferta(ofertaId) {
  return api.get(`/candidaturas/oferta/${ofertaId}`).then((res) => res.data);
}
