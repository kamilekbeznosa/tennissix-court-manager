import { NavLink, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  CalendarDays,
  Trophy,
  Wrench,
  Tag,
  User,
  Activity,
} from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { to: "/", label: "Dashboard", icon: LayoutDashboard, end: true },
  { to: "/rezerwacje", label: "Rezerwacje", icon: CalendarDays },
  { to: "/turnieje", label: "Moje Turnieje", icon: Trophy },
  { to: "/serwis", label: "Serwis i Wypożyczalnia", icon: Wrench },
  { to: "/cennik", label: "Cennik i Promocje", icon: Tag },
  { to: "/profil", label: "Mój Profil", icon: User },
];

export const Sidebar = () => {
  const location = useLocation();
  return (
    <aside className="hidden lg:flex w-64 shrink-0 flex-col bg-sidebar text-sidebar-foreground border-r border-sidebar-border">
      <div className="flex items-center gap-3 px-6 h-20 border-b border-sidebar-border">
        <div className="relative h-10 w-10 rounded-xl bg-gradient-primary flex items-center justify-center shadow-glow">
          <Activity className="h-5 w-5 text-primary-foreground" strokeWidth={2.5} />
        </div>
        <div>
          <div className="font-display text-xl font-bold tracking-tight text-white">TENNISIX</div>
          <div className="text-[10px] uppercase tracking-[0.2em] text-sidebar-foreground/60">Premium Club</div>
        </div>
      </div>

      <nav className="flex-1 px-3 py-6 space-y-1">
        <div className="px-3 pb-2 text-[10px] uppercase tracking-widest text-sidebar-foreground/40">
          Nawigacja
        </div>
        {navItems.map(({ to, label, icon: Icon, end }) => {
          const active =
            end ? location.pathname === to : location.pathname.startsWith(to);
          return (
            <NavLink
              key={to}
              to={to}
              end={end}
              className={cn(
                "group flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all",
                active
                  ? "bg-sidebar-accent text-white shadow-soft"
                  : "text-sidebar-foreground hover:bg-sidebar-accent/50 hover:text-white",
              )}
            >
              <span
                className={cn(
                  "flex h-8 w-8 items-center justify-center rounded-md transition-colors",
                  active
                    ? "bg-primary text-primary-foreground"
                    : "bg-sidebar-accent/40 text-sidebar-foreground group-hover:bg-sidebar-accent",
                )}
              >
                <Icon className="h-4 w-4" />
              </span>
              {label}
              {active && <span className="ml-auto h-1.5 w-1.5 rounded-full bg-primary animate-pulse-glow" />}
            </NavLink>
          );
        })}
      </nav>

      <div className="m-3 p-4 rounded-xl bg-gradient-to-br from-sidebar-accent to-sidebar-accent/40 border border-sidebar-border">
        <div className="flex items-center gap-2 mb-2">
          <div className="h-2 w-2 rounded-full bg-primary animate-pulse" />
          <span className="text-xs font-semibold text-white">Karnet VIP aktywny</span>
        </div>
        <p className="text-xs text-sidebar-foreground/70 mb-3">
          14 dni do końca. Przedłuż teraz i zyskaj 15% rabatu.
        </p>
        <button className="w-full text-xs font-semibold rounded-md bg-primary text-primary-foreground py-2 hover:bg-primary/90 transition">
          Przedłuż karnet
        </button>
      </div>
    </aside>
  );
};
