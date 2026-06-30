import api from "./client";

export function getOfertas(filtros = {}) {
  return api.get("/ofertas", { params: filtros }).then((res) => res.data);
}

export function getOferta(id) {
  return api.get(`/ofertas/${id}`).then((res) => res.data);
}

export function crearOferta(data) {
  return api.post("/ofertas", data).then((res) => res.data);
}

export function getMisOfertas() {
  return api.get("/ofertas/mias/listado").then((res) => res.data);
}
