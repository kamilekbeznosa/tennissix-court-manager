import { createContext, useContext, useState, ReactNode } from "react";

export type Role = "client" | "receptionist";

interface RoleCtx {
  role: Role;
  setRole: (r: Role) => void;
}

const Ctx = createContext<RoleCtx>({ role: "client", setRole: () => {} });

export const RoleProvider = ({ children }: { children: ReactNode }) => {
  const [role, setRole] = useState<Role>("client");
  return <Ctx.Provider value={{ role, setRole }}>{children}</Ctx.Provider>;
};

export const useRole = () => useContext(Ctx);
