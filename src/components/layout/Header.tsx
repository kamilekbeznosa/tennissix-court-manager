import { Bell, Search, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRole, Role } from "@/contexts/RoleContext";
import { cn } from "@/lib/utils";

export const Header = () => {
  const { role, setRole } = useRole();

  return (
    <header className="h-20 shrink-0 bg-card/80 backdrop-blur-md border-b border-border flex items-center px-4 lg:px-8 gap-4">
      <div className="hidden md:flex items-center gap-2 flex-1 max-w-md">
        <div className="relative w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            placeholder="Szukaj kortu, trenera, turnieju..."
            className="w-full h-10 pl-10 pr-4 rounded-lg bg-secondary text-sm border border-transparent focus:outline-none focus:border-primary/50 focus:bg-background transition"
          />
        </div>
      </div>

      <div className="flex-1 md:flex-none" />

      {/* Role switcher */}
      <div className="flex items-center p-1 rounded-full bg-secondary border border-border">
        {(["client", "receptionist"] as Role[]).map((r) => (
          <button
            key={r}
            onClick={() => setRole(r)}
            className={cn(
              "px-4 h-8 text-xs font-semibold rounded-full transition-all",
              role === r
                ? "bg-foreground text-background shadow-soft"
                : "text-muted-foreground hover:text-foreground",
            )}
          >
            {r === "client" ? "Klient" : "Recepcja"}
          </button>
        ))}
      </div>

      <Button variant="ghost" size="icon" className="relative">
        <Bell className="h-5 w-5" />
        <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-accent" />
      </Button>

      <div className="flex items-center gap-3 pl-3 border-l border-border">
        <div className="hidden sm:block text-right">
          <div className="text-sm font-semibold leading-tight">
            {role === "client" ? "Aleksandra Nowak" : "Marek Wiśniewski"}
          </div>
          <div className="text-xs text-muted-foreground">
            {role === "client" ? "Karnet VIP" : "Recepcjonista"}
          </div>
        </div>
        <div className="relative h-10 w-10 rounded-full bg-gradient-primary flex items-center justify-center font-bold text-primary-foreground shadow-soft">
          {role === "client" ? "AN" : "MW"}
          <span className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full bg-success border-2 border-card" />
        </div>
        <ChevronDown className="h-4 w-4 text-muted-foreground hidden sm:block" />
      </div>
    </header>
  );
};
