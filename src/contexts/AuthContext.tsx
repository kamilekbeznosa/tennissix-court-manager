import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { useRole, Role } from "./RoleContext";

interface AuthUser {
  email: string;
  role: Role;
  name: string;
}

interface SignupData {
  name: string;
  email: string;
  password: string;
  role: Role;
  phone?: string;
}

interface AuthCtx {
  user: AuthUser | null;
  login: (email: string, password: string, role: Role) => Promise<void>;
  signup: (data: SignupData) => Promise<void>;
  logout: () => void;
}

const Ctx = createContext<AuthCtx>({ user: null, login: async () => {}, signup: async () => {}, logout: () => {} });
const STORAGE_KEY = "tennisix_auth";

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const { setRole } = useRole();
  const [user, setUser] = useState<AuthUser | null>(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  });

  useEffect(() => {
    if (user) setRole(user.role);
  }, [user, setRole]);

  const login = async (email: string, password: string, role: Role) => {
    if (!email || !password) throw new Error("Podaj e-mail i hasło");
    if (password.length < 4) throw new Error("Hasło musi mieć min. 4 znaki");
    const name = role === "client" ? "Aleksandra Nowak" : "Marek Wiśniewski";
    const u: AuthUser = { email, role, name };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(u));
    setUser(u);
    setRole(role);
  };

  const signup = async (data: SignupData) => {
    if (!data.name || !data.email || !data.password) throw new Error("Wypełnij wszystkie wymagane pola");
    if (data.password.length < 6) throw new Error("Hasło musi mieć min. 6 znaków");
    if (!/^\S+@\S+\.\S+$/.test(data.email)) throw new Error("Nieprawidłowy adres e-mail");
    const u: AuthUser = { email: data.email, role: data.role, name: data.name };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(u));
    setUser(u);
    setRole(data.role);
  };

  const logout = () => {
    localStorage.removeItem(STORAGE_KEY);
    setUser(null);
  };

  return <Ctx.Provider value={{ user, login, signup, logout }}>{children}</Ctx.Provider>;
};

export const useAuth = () => useContext(Ctx);
