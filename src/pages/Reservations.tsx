import { useState } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { BookingWizard } from "@/components/booking/BookingWizard";
import { Button } from "@/components/ui/button";
import { Plus, Clock, MapPin, Search, Filter, Calendar as CalendarIcon, X, Repeat } from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

interface Reservation {
  id: string;
  date: string;
  time: string;
  court: string;
  type: "Lekcja" | "Mecz" | "Trening" | "Turniej";
  partner: string;
  status: "confirmed" | "pending" | "cancelled";
  recurring?: boolean;
}

const initial: Reservation[] = [
  { id: "R-2841", date: "28 paź 2025", time: "18:00 — 19:30", court: "Kort 2 (Hard)", type: "Lekcja", partner: "Tomasz K.", status: "confirmed", recurring: true },
  { id: "R-2842", date: "30 paź 2025", time: "19:30 — 21:00", court: "Kort 1 (Ziemny)", type: "Mecz", partner: "Piotr W.", status: "confirmed" },
  { id: "R-2843", date: "2 lis 2025", time: "10:00 — 12:00", court: "Kort 4 (Kryty)", type: "Turniej", partner: "Faza grupowa", status: "pending" },
  { id: "R-2844", date: "5 lis 2025", time: "17:00 — 18:30", court: "Kort 3 (Ziemny)", type: "Trening", partner: "Indywidualnie", status: "confirmed", recurring: true },
  { id: "R-2820", date: "20 paź 2025", time: "18:00 — 19:30", court: "Kort 2 (Hard)", type: "Lekcja", partner: "Tomasz K.", status: "confirmed" },
];

const statusStyle: Record<Reservation["status"], string> = {
  confirmed: "bg-success/10 text-success border-success/20",
  pending: "bg-warning/15 text-warning border-warning/30",
  cancelled: "bg-destructive/10 text-destructive border-destructive/20",
};

const Reservations = () => {
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState(initial);
  const [filter, setFilter] = useState<"all" | "upcoming" | "past">("upcoming");
  const [q, setQ] = useState("");

  const cancel = (id: string) => {
    setItems((p) => p.map((r) => (r.id === id ? { ...r, status: "cancelled" } : r)));
    toast.success("Rezerwacja anulowana", { description: id });
  };

  const filtered = items.filter((r) => {
    if (q && !r.court.toLowerCase().includes(q.toLowerCase()) && !r.partner.toLowerCase().includes(q.toLowerCase())) return false;
    return true;
  });

  return (
    <AppLayout>
      <div className="space-y-6">
        <div className="flex items-end justify-between gap-4 flex-wrap">
          <div>
            <h1 className="font-display text-3xl font-bold">Moje rezerwacje</h1>
            <p className="text-sm text-muted-foreground">Zarządzaj kortami, lekcjami i powtarzającymi się slotami.</p>
          </div>
          <Button variant="hero" size="lg" onClick={() => setOpen(true)}>
            <Plus className="h-4 w-4" /> Nowa rezerwacja
          </Button>
        </div>

        <div className="flex flex-wrap items-center gap-3 p-3 rounded-xl bg-card border border-border">
          <div className="relative flex-1 min-w-[200px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Szukaj po korcie lub partnerze..."
              className="w-full h-10 pl-10 pr-3 rounded-lg bg-secondary text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
            />
          </div>
          <div className="flex p-1 rounded-lg bg-secondary">
            {(["upcoming", "past", "all"] as const).map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={cn(
                  "px-4 h-8 text-xs font-semibold rounded-md transition",
                  filter === f ? "bg-card text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground",
                )}
              >
                {f === "upcoming" ? "Nadchodzące" : f === "past" ? "Historia" : "Wszystkie"}
              </button>
            ))}
          </div>
          <Button variant="outline" size="sm" onClick={() => toast("Filtr zaawansowany wkrótce")}>
            <Filter className="h-4 w-4" /> Filtry
          </Button>
        </div>

        <div className="rounded-2xl bg-card border border-border overflow-hidden">
          <div className="grid grid-cols-12 gap-3 px-5 py-3 text-[10px] uppercase tracking-wider font-bold text-muted-foreground border-b border-border bg-secondary/40">
            <div className="col-span-3">Data / Godzina</div>
            <div className="col-span-3">Kort</div>
            <div className="col-span-2">Typ</div>
            <div className="col-span-2">Partner</div>
            <div className="col-span-1">Status</div>
            <div className="col-span-1 text-right">Akcje</div>
          </div>
          {filtered.map((r) => (
            <div key={r.id} className="grid grid-cols-12 gap-3 px-5 py-4 items-center border-b border-border last:border-b-0 hover:bg-secondary/30 transition">
              <div className="col-span-3">
                <div className="font-semibold text-sm flex items-center gap-2">
                  <CalendarIcon className="h-3.5 w-3.5 text-muted-foreground" /> {r.date}
                  {r.recurring && <Repeat className="h-3 w-3 text-primary" />}
                </div>
                <div className="text-xs text-muted-foreground flex items-center gap-1 mt-0.5">
                  <Clock className="h-3 w-3" /> {r.time}
                </div>
              </div>
              <div className="col-span-3 text-sm flex items-center gap-2">
                <MapPin className="h-3.5 w-3.5 text-muted-foreground" /> {r.court}
              </div>
              <div className="col-span-2">
                <span className="inline-block text-[10px] uppercase tracking-wider font-bold text-primary px-2 py-1 rounded-full bg-primary/10">{r.type}</span>
              </div>
              <div className="col-span-2 text-sm text-muted-foreground">{r.partner}</div>
              <div className="col-span-1">
                <span className={cn("inline-block text-[10px] uppercase tracking-wider font-bold px-2 py-1 rounded-full border", statusStyle[r.status])}>
                  {r.status === "confirmed" ? "OK" : r.status === "pending" ? "Czeka" : "Anul."}
                </span>
              </div>
              <div className="col-span-1 flex justify-end">
                {r.status !== "cancelled" && (
                  <Button variant="ghost" size="icon" onClick={() => cancel(r.id)} aria-label="Anuluj">
                    <X className="h-4 w-4 text-destructive" />
                  </Button>
                )}
              </div>
            </div>
          ))}
          {filtered.length === 0 && (
            <div className="px-5 py-12 text-center text-sm text-muted-foreground">Brak rezerwacji.</div>
          )}
        </div>

        <BookingWizard open={open} onOpenChange={setOpen} />
      </div>
    </AppLayout>
  );
};

export default Reservations;
