import { useState } from "react";
import { Search, ChevronDown, Settings, User, LogOut, Crown, HelpCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRole, Role } from "@/contexts/RoleContext";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { NotificationsPopover } from "./NotificationsPopover";
import { SettingsDialog } from "./SettingsDialog";

export const Header = () => {
  const { role, setRole } = useRole();
  const navigate = useNavigate();
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [query, setQuery] = useState("");

  const onSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    toast.success(`Szukam: "${query}"`, { description: "Wyniki w panelu po lewej." });
  };

  return (
    <header className="h-20 shrink-0 bg-card/80 backdrop-blur-md border-b border-border flex items-center px-4 lg:px-8 gap-4">
      <form onSubmit={onSearch} className="hidden md:flex items-center gap-2 flex-1 max-w-md">
        <div className="relative w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Szukaj kortu, trenera, turnieju..."
            className="w-full h-10 pl-10 pr-4 rounded-lg bg-secondary text-sm border border-transparent focus:outline-none focus:border-primary/50 focus:bg-background transition"
          />
        </div>
      </form>

      <div className="flex-1 md:flex-none" />

      {/* Role switcher */}
      <div className="flex items-center p-1 rounded-full bg-secondary border border-border">
        {(["client", "receptionist"] as Role[]).map((r) => (
          <button
            key={r}
            onClick={() => {
              setRole(r);
              toast(`Tryb: ${r === "client" ? "Klient" : "Recepcja"}`);
            }}
            className={cn(
              "px-4 h-8 text-xs font-semibold rounded-full transition-all",
              role === r ? "bg-foreground text-background shadow-soft" : "text-muted-foreground hover:text-foreground",
            )}
          >
            {r === "client" ? "Klient" : "Recepcja"}
          </button>
        ))}
      </div>

      <NotificationsPopover />

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button className="flex items-center gap-3 pl-3 border-l border-border rounded-r-md hover:bg-secondary/50 transition pr-1 py-1">
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
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56">
          <DropdownMenuLabel>
            <div className="font-semibold">{role === "client" ? "Aleksandra Nowak" : "Marek Wiśniewski"}</div>
            <div className="text-xs text-muted-foreground font-normal">aleksandra@tennisix.pl</div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => navigate("/profil")}>
            <User className="h-4 w-4" /> Mój profil
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => navigate("/cennik")}>
            <Crown className="h-4 w-4" /> Karnet i pakiety
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setSettingsOpen(true)}>
            <Settings className="h-4 w-4" /> Ustawienia
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => toast("Otwieram centrum pomocy")}>
            <HelpCircle className="h-4 w-4" /> Pomoc
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            className="text-destructive focus:text-destructive"
            onClick={() => toast.success("Wylogowano pomyślnie")}
          >
            <LogOut className="h-4 w-4" /> Wyloguj
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <SettingsDialog open={settingsOpen} onOpenChange={setSettingsOpen} />
    </header>
  );
};
