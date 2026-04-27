import { useState } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { Button } from "@/components/ui/button";
import { Trophy, Users, Calendar, MapPin, Award } from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

interface Tournament {
  id: string;
  name: string;
  date: string;
  location: string;
  participants: number;
  capacity: number;
  prize: string;
  status: "open" | "live" | "finished";
  registered: boolean;
}

const initial: Tournament[] = [
  { id: "T1", name: "TENNISIX Open Autumn", date: "29-30 paź 2025", location: "Korty 1-4", participants: 28, capacity: 32, prize: "5 000 zł", status: "open", registered: true },
  { id: "T2", name: "Mistrzostwa Klubu Singel", date: "8-10 lis 2025", location: "Wszystkie korty", participants: 16, capacity: 32, prize: "Puchar + 3 000 zł", status: "open", registered: false },
  { id: "T3", name: "Turniej Debla VIP", date: "15 lis 2025", location: "Korty 1-2", participants: 12, capacity: 16, prize: "Karnet roczny", status: "open", registered: false },
  { id: "T4", name: "Junior Cup U18", date: "20 paź 2025", location: "Kort 3-4", participants: 24, capacity: 24, prize: "Stypendium", status: "finished", registered: true },
];

const bracket = [
  { round: "Ćwierćfinał", matches: [
    { a: "A. Nowak", b: "K. Mazur", scoreA: 6, scoreB: 3, winner: "a" },
    { a: "P. Wójcik", b: "T. Lewandowski", scoreA: 4, scoreB: 6, winner: "b" },
    { a: "M. Kowalska", b: "B. Kowal", scoreA: 6, scoreB: 2, winner: "a" },
    { a: "R. Zieliński", b: "J. Nowicki", scoreA: 7, scoreB: 5, winner: "a" },
  ]},
  { round: "Półfinał", matches: [
    { a: "A. Nowak", b: "T. Lewandowski", scoreA: 6, scoreB: 4, winner: "a" },
    { a: "M. Kowalska", b: "R. Zieliński", scoreA: 3, scoreB: 6, winner: "b" },
  ]},
  { round: "Finał", matches: [
    { a: "A. Nowak", b: "R. Zieliński", scoreA: 0, scoreB: 0, winner: null as null | "a" | "b" },
  ]},
];

const Tournaments = () => {
  const [items, setItems] = useState(initial);
  const [active, setActive] = useState<string>("T1");

  const toggle = (id: string) => {
    setItems((p) => p.map((t) => {
      if (t.id !== id) return t;
      const reg = !t.registered;
      toast.success(reg ? "Zapisano do turnieju" : "Wypisano z turnieju", { description: t.name });
      return { ...t, registered: reg, participants: t.participants + (reg ? 1 : -1) };
    }));
  };

  const current = items.find((t) => t.id === active) ?? items[0];

  return (
    <AppLayout>
      <div className="space-y-6">
        <div>
          <h1 className="font-display text-3xl font-bold">Turnieje</h1>
          <p className="text-sm text-muted-foreground">Zapisuj się, śledź drabinki i wyniki.</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-4">
          {items.map((t) => (
            <div
              key={t.id}
              className={cn(
                "rounded-2xl border bg-card p-5 cursor-pointer transition-all hover:shadow-soft",
                active === t.id ? "border-primary shadow-soft" : "border-border",
              )}
              onClick={() => setActive(t.id)}
            >
              <div className="flex items-start justify-between mb-3">
                <div className="h-12 w-12 rounded-xl bg-gradient-clay text-accent-foreground flex items-center justify-center shadow-soft">
                  <Trophy className="h-5 w-5" />
                </div>
                <span className={cn(
                  "text-[10px] uppercase tracking-wider font-bold px-2 py-1 rounded-full",
                  t.status === "open" && "bg-success/15 text-success",
                  t.status === "live" && "bg-accent/15 text-accent",
                  t.status === "finished" && "bg-secondary text-muted-foreground",
                )}>
                  {t.status === "open" ? "Zapisy" : t.status === "live" ? "Trwa" : "Zakończony"}
                </span>
              </div>
              <h3 className="font-display text-lg font-bold mb-1">{t.name}</h3>
              <div className="text-xs text-muted-foreground space-y-1 mb-3">
                <div className="flex items-center gap-1.5"><Calendar className="h-3 w-3" /> {t.date}</div>
                <div className="flex items-center gap-1.5"><MapPin className="h-3 w-3" /> {t.location}</div>
                <div className="flex items-center gap-1.5"><Award className="h-3 w-3" /> Pula: {t.prize}</div>
              </div>
              <div className="flex items-center gap-2 mb-3">
                <Users className="h-3.5 w-3.5 text-muted-foreground" />
                <div className="flex-1 h-1.5 rounded-full bg-secondary overflow-hidden">
                  <div className="h-full bg-primary" style={{ width: `${(t.participants / t.capacity) * 100}%` }} />
                </div>
                <span className="text-xs font-mono text-muted-foreground">{t.participants}/{t.capacity}</span>
              </div>
              <Button
                variant={t.registered ? "outline" : "hero"}
                size="sm"
                className="w-full"
                disabled={t.status === "finished"}
                onClick={(e) => { e.stopPropagation(); toggle(t.id); }}
              >
                {t.registered ? "Wypisz się" : "Zapisz się"}
              </Button>
            </div>
          ))}
        </div>

        {/* Bracket */}
        <div className="rounded-2xl bg-card border border-border p-6">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h2 className="font-display text-xl font-bold">Drabinka — {current.name}</h2>
              <p className="text-sm text-muted-foreground">Single Elimination · 8 zawodników</p>
            </div>
            <Button variant="ghost" size="sm" onClick={() => toast("Eksport drabinki PDF")}>Eksportuj PDF</Button>
          </div>

          <div className="flex gap-6 overflow-x-auto pb-2">
            {bracket.map((round, ri) => (
              <div key={ri} className="flex-1 min-w-[220px] space-y-4">
                <div className="text-xs uppercase tracking-widest font-bold text-muted-foreground text-center">{round.round}</div>
                <div className={cn("space-y-4", ri === 1 && "pt-8 space-y-12", ri === 2 && "pt-24")}>
                  {round.matches.map((m, mi) => (
                    <div key={mi} className="rounded-xl border border-border bg-card overflow-hidden shadow-sm">
                      <Player name={m.a} score={m.scoreA} winner={m.winner === "a"} />
                      <div className="h-px bg-border" />
                      <Player name={m.b} score={m.scoreB} winner={m.winner === "b"} />
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

const Player = ({ name, score, winner }: { name: string; score: number; winner: boolean }) => (
  <div className={cn("flex items-center justify-between px-3 py-2.5 text-sm", winner && "bg-primary/10")}>
    <span className={cn("font-medium", winner && "font-bold text-foreground")}>{name}</span>
    <span className={cn("font-mono font-bold", winner ? "text-primary" : "text-muted-foreground")}>{score || "-"}</span>
  </div>
);

export default Tournaments;
