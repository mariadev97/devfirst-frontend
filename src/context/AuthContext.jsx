import { createContext, useContext, useEffect, useState } from "react";
import { loginRequest, registerRequest } from "../api/auth";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null); // { id, email, role }
  const [cargandoSesion, setCargandoSesion] = useState(true);

  // Al cargar la app, intentamos restaurar la sesión guardada en localStorage.
  useEffect(() => {
    const token = localStorage.getItem("devfirst_token");
    const userGuardado = localStorage.getItem("devfirst_user");
    if (token && userGuardado) {
      setUser(JSON.parse(userGuardado));
    }
    setCargandoSesion(false);
  }, []);

  function guardarSesion({ token, user }) {
    localStorage.setItem("devfirst_token", token);
    localStorage.setItem("devfirst_user", JSON.stringify(user));
    setUser(user);
  }

  async function login(email, password) {
    const data = await loginRequest(email, password);
    guardarSesion(data);
    return data;
  }

  async function register(formData) {
    const data = await registerRequest(formData);
    guardarSesion(data);
    return data;
  }

  function logout() {
    localStorage.removeItem("devfirst_token");
    localStorage.removeItem("devfirst_user");
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ user, cargandoSesion, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
