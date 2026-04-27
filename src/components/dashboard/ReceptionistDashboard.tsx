import {
  AlertTriangle,
  CreditCard,
  Trophy,
  Users,
  Activity,
  CircleDot,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

const courts = [
  { name: "Kort 1 (Ziemny)", color: "bg-gradient-clay" },
  { name: "Kort 2 (Hard)", color: "bg-gradient-court" },
  { name: "Kort 3 (Ziemny)", color: "bg-gradient-clay" },
  { name: "Kort 4 (Kryty)", color: "bg-foreground" },
];

const hours = Array.from({ length: 14 }).map((_, i) => `${i + 8}:00`);

interface Booking {
  court: number; start: number; end: number;
  client: string; type: "lesson" | "match" | "tournament" | "free";
}

const bookings: Booking[] = [
  { court: 0, start: 0, end: 2, client: "A. Nowak", type: "lesson" },
  { court: 0, start: 4, end: 6, client: "P. Kowalski", type: "match" },
  { court: 0, start: 8, end: 11, client: "Turniej U18", type: "tournament" },
  { court: 1, start: 1, end: 3, client: "M. Wiśniewska", type: "match" },
  { court: 1, start: 5, end: 7, client: "Lekcja grupowa", type: "lesson" },
  { court: 1, start: 9, end: 11, client: "T. Lewandowski", type: "match" },
  { court: 2, start: 0, end: 2, client: "K. Zielińska", type: "lesson" },
  { court: 2, start: 3, end: 5, client: "R. Mazur", type: "match" },
  { court: 2, start: 8, end: 10, client: "P. Wójcik", type: "match" },
  { court: 3, start: 2, end: 4, client: "Akademia Junior", type: "lesson" },
  { court: 3, start: 6, end: 9, client: "Turniej Open", type: "tournament" },
  { court: 3, start: 11, end: 13, client: "VIP B. Kowal", type: "match" },
];

const typeStyles: Record<Booking["type"], string> = {
  lesson: "bg-primary text-primary-foreground",
  match: "bg-accent text-accent-foreground",
  tournament: "bg-foreground text-background",
  free: "",
};

export const ReceptionistDashboard = () => {
  const navigate = useNavigate();
  return (
    <div className="space-y-6">
      <section>
        <div className="flex items-center justify-between mb-2">
          <div>
            <h1 className="font-display text-3xl font-bold">Panel recepcji</h1>
            <p className="text-sm text-muted-foreground">
              Poniedziałek, 27 października 2025 · 12 aktywnych rezerwacji
            </p>
          </div>
          <div className="flex items-center gap-2 text-xs font-semibold text-success px-3 py-1.5 rounded-full bg-success/10">
            <span className="h-2 w-2 rounded-full bg-success animate-pulse" /> System aktywny
          </div>
        </div>
      </section>

      {/* Alerts */}
      <section className="grid md:grid-cols-3 gap-4">
        <Alert
          tone="warning"
          icon={AlertTriangle}
          title="3 nowe zapisy turniejowe"
          desc="Turniej Open — wymagają zatwierdzenia"
          cta="Zobacz zapisy"
          onClick={() => navigate("/turnieje")}
        />
        <Alert
          tone="destructive"
          icon={CreditCard}
          title="2 nieopłacone rezerwacje"
          desc="Łącznie 380 zł zaległości"
          cta="Wyślij przypomnienie"
          onClick={() => toast.success("Przypomnienia wysłane do 2 klientów")}
        />
        <Alert
          tone="primary"
          icon={Trophy}
          title="Turniej startuje za 2 dni"
          desc="32 uczestników, drabinka gotowa"
          cta="Otwórz drabinkę"
          onClick={() => navigate("/turnieje")}
        />
      </section>

      {/* Quick stats */}
      <section className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <MiniStat icon={Users} label="Goście dzisiaj" value="64" />
        <MiniStat icon={Activity} label="Wykorzystanie kortów" value="78%" />
        <MiniStat icon={CircleDot} label="Wolne sloty" value="11" />
        <MiniStat icon={Trophy} label="Aktywne turnieje" value="3" />
      </section>

      {/* Timeline */}
      <section className="rounded-2xl bg-card border border-border overflow-hidden">
        <div className="p-6 border-b border-border flex items-center justify-between">
          <div>
            <h2 className="font-display text-xl font-bold">Harmonogram kortów</h2>
            <p className="text-sm text-muted-foreground">Widok dnia · klik aby edytować</p>
          </div>
          <div className="flex items-center gap-3 text-xs">
            <Legend color="bg-primary" label="Lekcja" />
            <Legend color="bg-accent" label="Mecz" />
            <Legend color="bg-foreground" label="Turniej" />
          </div>
        </div>

        <div className="overflow-x-auto">
          <div className="min-w-[900px] p-6">
            {/* Hours header */}
            <div className="grid gap-1 mb-2" style={{ gridTemplateColumns: `160px repeat(${hours.length}, 1fr)` }}>
              <div />
              {hours.map((h) => (
                <div key={h} className="text-[10px] font-mono text-muted-foreground text-center">
                  {h}
                </div>
              ))}
            </div>

            {/* Rows */}
            <div className="space-y-2">
              {courts.map((court, ci) => (
                <div
                  key={ci}
                  className="grid gap-1 items-center"
                  style={{ gridTemplateColumns: `160px repeat(${hours.length}, 1fr)` }}
                >
                  <div className="flex items-center gap-2 pr-3">
                    <div className={cn("h-7 w-7 rounded-md shrink-0", court.color)} />
                    <span className="text-xs font-semibold truncate">{court.name}</span>
                  </div>
                  <div
                    className="relative col-span-full h-12 rounded-lg bg-secondary/50"
                    style={{ gridColumn: `2 / span ${hours.length}` }}
                  >
                    {/* hour gridlines */}
                    <div
                      className="absolute inset-0 grid"
                      style={{ gridTemplateColumns: `repeat(${hours.length}, 1fr)` }}
                    >
                      {hours.map((_, i) => (
                        <div key={i} className="border-r border-border/50 last:border-r-0" />
                      ))}
                    </div>

                    {bookings
                      .filter((b) => b.court === ci)
                      .map((b, i) => {
                        const left = (b.start / hours.length) * 100;
                        const width = ((b.end - b.start) / hours.length) * 100;
                        return (
                          <button
                            key={i}
                            onClick={() => toast(b.client, { description: `Kort ${b.court + 1} · ${hours[b.start]} - ${hours[b.end]}` })}
                            className={cn(
                              "absolute top-1 bottom-1 rounded-md px-2 text-[11px] font-semibold flex items-center cursor-pointer hover:scale-[1.02] hover:z-10 transition-all shadow-sm",
                              typeStyles[b.type],
                            )}
                            style={{ left: `${left}%`, width: `calc(${width}% - 4px)` }}
                          >
                            <span className="truncate">{b.client}</span>
                          </button>
                        );
                      })}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

const Alert = ({
  tone, icon: Icon, title, desc, cta, onClick,
}: {
  tone: "warning" | "destructive" | "primary";
  icon: React.ComponentType<{ className?: string }>;
  title: string; desc: string; cta: string; onClick?: () => void;
}) => {
  const tones: Record<string, string> = {
    warning: "from-warning/15 to-warning/5 border-warning/30",
    destructive: "from-destructive/15 to-destructive/5 border-destructive/30",
    primary: "from-primary/20 to-primary/5 border-primary/30",
  };
  const iconBg: Record<string, string> = {
    warning: "bg-warning text-foreground",
    destructive: "bg-destructive text-destructive-foreground",
    primary: "bg-primary text-primary-foreground",
  };
  return (
    <div className={cn("rounded-2xl bg-gradient-to-br border p-5 flex gap-4", tones[tone])}>
      <div className={cn("h-11 w-11 rounded-xl flex items-center justify-center shrink-0 shadow-soft", iconBg[tone])}>
        <Icon className="h-5 w-5" />
      </div>
      <div className="flex-1 min-w-0">
        <div className="font-semibold">{title}</div>
        <div className="text-xs text-muted-foreground mb-2">{desc}</div>
        <button onClick={onClick} className="text-xs font-semibold text-foreground hover:underline">{cta} →</button>
      </div>
    </div>
  );
};

const MiniStat = ({
  icon: Icon, label, value,
}: { icon: React.ComponentType<{ className?: string }>; label: string; value: string }) => (
  <div className="rounded-xl bg-card border border-border p-4 flex items-center gap-3">
    <div className="h-10 w-10 rounded-lg bg-secondary flex items-center justify-center">
      <Icon className="h-5 w-5 text-foreground" />
    </div>
    <div>
      <div className="font-display text-2xl font-bold leading-none">{value}</div>
      <div className="text-xs text-muted-foreground mt-1">{label}</div>
    </div>
  </div>
);

const Legend = ({ color, label }: { color: string; label: string }) => (
  <span className="inline-flex items-center gap-1.5 text-muted-foreground">
    <span className={cn("h-2 w-2 rounded-full", color)} />
    {label}
  </span>
);
