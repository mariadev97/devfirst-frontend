import api from "./client";

export function getMiPerfil() {
  return api.get("/perfil").then((res) => res.data);
}

export function actualizarMiPerfil(data) {
  return api.put("/perfil", data).then((res) => res.data);
}
