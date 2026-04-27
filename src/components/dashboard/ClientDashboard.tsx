import { useState } from "react";
import { Button } from "@/components/ui/button";
import { BookingWizard } from "@/components/booking/BookingWizard";
import { ServiceRequestDialog } from "@/components/service/ServiceRequestDialog";
import {
  CircleDot,
  Wrench,
  Trophy,
  Crown,
  TrendingUp,
  ChevronRight,
  Clock,
  MapPin,
  Plus,
  Activity,
  Flame,
  Target,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const upcoming = [
  { day: "Wt", date: 28, time: "18:00", title: "Lekcja z trenerem", coach: "Tomasz K.", court: "Kort 2", color: "bg-gradient-court", tag: "Lekcja" },
  { day: "Czw", date: 30, time: "19:30", title: "Mecz singlowy", coach: "vs. Piotr W.", court: "Kort 1", color: "bg-gradient-clay", tag: "Mecz" },
  { day: "Sob", date: 2, time: "10:00", title: "Turniej klubowy", coach: "Faza grupowa", court: "Kort 4", color: "bg-foreground", tag: "Turniej" },
];

const weekDays = ["Pon", "Wt", "Śr", "Czw", "Pt", "Sob", "Nie"];
const events: Record<number, { color: string; count: number }> = {
  2: { color: "bg-primary", count: 1 },
  4: { color: "bg-accent", count: 2 },
  7: { color: "bg-primary", count: 1 },
  9: { color: "bg-court-hard", count: 1 },
  12: { color: "bg-accent", count: 1 },
  15: { color: "bg-foreground", count: 3 },
  18: { color: "bg-primary", count: 1 },
  22: { color: "bg-accent", count: 1 },
  25: { color: "bg-primary", count: 2 },
};

export const ClientDashboard = () => {
  const [bookingOpen, setBookingOpen] = useState(false);
  const [serviceOpen, setServiceOpen] = useState(false);
  const [calendarView, setCalendarView] = useState<"week" | "month">("month");
  const navigate = useNavigate();

  return (
    <div className="space-y-6">
      {/* Welcome hero */}
      <section className="relative overflow-hidden rounded-2xl bg-gradient-hero text-white p-8 lg:p-10">
        <div className="absolute -top-20 -right-20 h-72 w-72 rounded-full bg-primary/30 blur-3xl" />
        <div className="absolute bottom-0 right-1/3 h-40 w-40 rounded-full bg-accent/20 blur-3xl" />

        <div className="relative flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <div className="space-y-3 max-w-xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur border border-white/20 text-xs font-medium">
              <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" /> Witaj z powrotem
            </div>
            <h1 className="text-4xl lg:text-5xl font-display font-bold text-balance leading-tight">
              Cześć, <span className="text-primary">Aleksandra</span> 👋
            </h1>
            <p className="text-white/70 text-base">
              Masz <span className="text-white font-semibold">2 rezerwacje</span> w tym tygodniu i jeden nadchodzący turniej. Rozegrałaś już 47 meczów w tym sezonie.
            </p>
          </div>

          {/* Membership chip */}
          <div className="rounded-xl bg-white/10 backdrop-blur border border-white/20 p-5 min-w-[260px]">
            <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-white/60 mb-2">
              <Crown className="h-3.5 w-3.5 text-primary" /> Karnet VIP
            </div>
            <div className="font-display text-2xl font-bold mb-1">14 dni do końca</div>
            <div className="h-1.5 rounded-full bg-white/10 overflow-hidden mb-3">
              <div className="h-full bg-gradient-primary w-[47%]" />
            </div>
            <button className="text-xs text-primary font-semibold inline-flex items-center gap-1 hover:gap-2 transition-all">
              Przedłuż karnet <ChevronRight className="h-3 w-3" />
            </button>
          </div>
        </div>
      </section>

      {/* Stats row */}
      <section className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Stat icon={Activity} label="Mecze sezonu" value="47" trend="+12%" tone="primary" />
        <Stat icon={Target} label="Win rate" value="68%" trend="+4%" tone="success" />
        <Stat icon={Flame} label="Seria zwycięstw" value="6" trend="W6" tone="accent" />
        <Stat icon={Trophy} label="Ranking klubu" value="#7" trend="↑ 3" tone="dark" />
      </section>

      {/* Main grid */}
      <section className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Calendar */}
        <div className="xl:col-span-2 rounded-2xl bg-card border border-border p-6 shadow-sm">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h2 className="font-display text-xl font-bold">Twój kalendarz</h2>
              <p className="text-sm text-muted-foreground">Październik 2025</p>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="sm">Tydzień</Button>
              <Button variant="secondary" size="sm">Miesiąc</Button>
            </div>
          </div>

          <div className="grid grid-cols-7 gap-1.5 mb-4">
            {weekDays.map((d) => (
              <div key={d} className="text-[10px] uppercase tracking-wider text-muted-foreground text-center font-semibold py-1">
                {d}
              </div>
            ))}
            {Array.from({ length: 31 }).map((_, i) => {
              const day = i + 1;
              const isToday = day === 27;
              const ev = events[day];
              return (
                <button
                  key={day}
                  className={cn(
                    "aspect-square rounded-lg border text-sm font-medium relative flex flex-col items-center justify-center transition-all hover:border-primary/40",
                    isToday ? "border-primary bg-primary/5 shadow-soft text-foreground" : "border-border bg-card text-muted-foreground hover:text-foreground",
                  )}
                >
                  <span className={cn(isToday && "text-primary font-bold")}>{day}</span>
                  {ev && (
                    <div className="flex gap-0.5 mt-0.5">
                      {Array.from({ length: Math.min(ev.count, 3) }).map((_, j) => (
                        <span key={j} className={cn("h-1 w-1 rounded-full", ev.color)} />
                      ))}
                    </div>
                  )}
                </button>
              );
            })}
          </div>

          <div className="flex items-center gap-4 pt-4 border-t border-border text-xs text-muted-foreground">
            <Legend color="bg-primary" label="Lekcja" />
            <Legend color="bg-accent" label="Mecz" />
            <Legend color="bg-court-hard" label="Trening" />
            <Legend color="bg-foreground" label="Turniej" />
          </div>
        </div>

        {/* Quick actions */}
        <div className="space-y-4">
          <button
            onClick={() => setBookingOpen(true)}
            className="group relative w-full text-left rounded-2xl bg-gradient-primary p-6 shadow-soft hover:shadow-glow transition-all overflow-hidden"
          >
            <div className="absolute -right-6 -top-6 h-32 w-32 rounded-full bg-white/20 blur-2xl group-hover:scale-150 transition-transform duration-700" />
            <div className="relative">
              <div className="h-12 w-12 rounded-xl bg-foreground/90 text-background flex items-center justify-center mb-4">
                <CircleDot className="h-6 w-6" />
              </div>
              <h3 className="font-display text-xl font-bold text-primary-foreground mb-1">Szybka rezerwacja kortu</h3>
              <p className="text-sm text-primary-foreground/70 mb-4">3 kroki, 30 sekund. Zarezerwuj kort już teraz.</p>
              <span className="inline-flex items-center gap-1 text-sm font-semibold text-primary-foreground group-hover:gap-2 transition-all">
                Rozpocznij <ChevronRight className="h-4 w-4" />
              </span>
            </div>
          </button>

          <button className="group w-full text-left rounded-2xl bg-card border border-border p-6 hover:border-accent/50 hover:shadow-soft transition-all">
            <div className="h-12 w-12 rounded-xl bg-gradient-clay text-accent-foreground flex items-center justify-center mb-4">
              <Wrench className="h-6 w-6" />
            </div>
            <h3 className="font-display text-xl font-bold mb-1">Zgłoś rakietę do serwisu</h3>
            <p className="text-sm text-muted-foreground mb-4">Naciąg, owijka, regulacja — gotowe w 48h.</p>
            <span className="inline-flex items-center gap-1 text-sm font-semibold text-accent group-hover:gap-2 transition-all">
              Wypełnij zgłoszenie <ChevronRight className="h-4 w-4" />
            </span>
          </button>
        </div>
      </section>

      {/* Upcoming */}
      <section className="rounded-2xl bg-card border border-border p-6">
        <div className="flex items-center justify-between mb-5">
          <div>
            <h2 className="font-display text-xl font-bold">Nadchodzące wydarzenia</h2>
            <p className="text-sm text-muted-foreground">Kolejne 7 dni</p>
          </div>
          <Button variant="ghost" size="sm">
            Zobacz wszystkie <ChevronRight className="h-4 w-4" />
          </Button>
        </div>

        <div className="space-y-3">
          {upcoming.map((u, i) => (
            <div
              key={i}
              className="group flex items-center gap-4 p-4 rounded-xl border border-border bg-card hover:border-primary/40 hover:shadow-soft transition-all cursor-pointer"
            >
              <div className={cn("h-14 w-14 rounded-xl text-white flex flex-col items-center justify-center shrink-0 shadow-soft", u.color)}>
                <span className="text-[10px] uppercase tracking-wider opacity-80">{u.day}</span>
                <span className="font-display text-lg font-bold leading-none">{u.date}</span>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-0.5">
                  <span className="text-[10px] uppercase tracking-wider font-bold text-primary px-2 py-0.5 rounded-full bg-primary/10">{u.tag}</span>
                </div>
                <div className="font-semibold truncate">{u.title}</div>
                <div className="text-xs text-muted-foreground flex items-center gap-3 mt-0.5">
                  <span className="flex items-center gap-1"><Clock className="h-3 w-3" /> {u.time}</span>
                  <span className="flex items-center gap-1"><MapPin className="h-3 w-3" /> {u.court}</span>
                  <span>· {u.coach}</span>
                </div>
              </div>
              <ChevronRight className="h-5 w-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
            </div>
          ))}

          <button
            onClick={() => setBookingOpen(true)}
            className="w-full flex items-center justify-center gap-2 p-3 rounded-xl border-2 border-dashed border-border hover:border-primary hover:bg-primary/5 text-sm font-semibold text-muted-foreground hover:text-primary transition-all"
          >
            <Plus className="h-4 w-4" /> Dodaj nową rezerwację
          </button>
        </div>
      </section>

      <BookingWizard open={bookingOpen} onOpenChange={setBookingOpen} />
    </div>
  );
};

const Stat = ({
  icon: Icon, label, value, trend, tone,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string; value: string; trend: string;
  tone: "primary" | "accent" | "success" | "dark";
}) => {
  const tones: Record<string, string> = {
    primary: "bg-gradient-primary text-primary-foreground",
    accent: "bg-gradient-clay text-accent-foreground",
    success: "bg-success text-white",
    dark: "bg-foreground text-background",
  };
  return (
    <div className="rounded-2xl bg-card border border-border p-5 hover:shadow-soft transition-all">
      <div className="flex items-start justify-between mb-3">
        <div className={cn("h-10 w-10 rounded-xl flex items-center justify-center shadow-soft", tones[tone])}>
          <Icon className="h-5 w-5" />
        </div>
        <span className="text-xs font-semibold text-success flex items-center gap-1">
          <TrendingUp className="h-3 w-3" /> {trend}
        </span>
      </div>
      <div className="font-display text-3xl font-bold">{value}</div>
      <div className="text-xs text-muted-foreground mt-1">{label}</div>
    </div>
  );
};

const Legend = ({ color, label }: { color: string; label: string }) => (
  <span className="inline-flex items-center gap-1.5">
    <span className={cn("h-2 w-2 rounded-full", color)} />
    {label}
  </span>
);
