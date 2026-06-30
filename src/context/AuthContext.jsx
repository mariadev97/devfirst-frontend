import { createContext, useContext, useState } from "react";

// Por ahora simulamos sesión en memoria. Cuando montemos el backend,
// esto pasará a guardar el JWT (p.ej. en localStorage) y a llamar a la API.
const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null); // { role: "candidato" | "empresa", nombre }

  function login({ role, nombre }) {
    setUser({ role, nombre });
  }

  function logout() {
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
