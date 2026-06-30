import api from "./client";

export function registerRequest(data) {
  // data: { email, password, role, nombre?, apellidos?, nombreEmpresa? }
  return api.post("/auth/register", data).then((res) => res.data);
}

export function loginRequest(email, password) {
  return api.post("/auth/login", { email, password }).then((res) => res.data);
}
