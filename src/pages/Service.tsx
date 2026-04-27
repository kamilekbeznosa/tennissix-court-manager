import { useState } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { Button } from "@/components/ui/button";
import { Wrench, Plus, CircleDot, Package } from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { ServiceRequestDialog } from "@/components/service/ServiceRequestDialog";

interface Item {
  id: string;
  type: string;
  brand: string;
  status: "in-progress" | "ready" | "rented" | "completed";
  date: string;
  price: string;
}

const initial: Item[] = [
  { id: "S-104", type: "Naciąg rakiety", brand: "Wilson Pro Staff RF97", status: "in-progress", date: "26 paź 2025", price: "120 zł" },
  { id: "S-103", type: "Wymiana owijki", brand: "Babolat Pure Aero", status: "ready", date: "25 paź 2025", price: "25 zł" },
  { id: "R-051", type: "Wypożyczenie rakiety", brand: "Head Speed MP", status: "rented", date: "do 30 paź", price: "25 zł / dzień" },
  { id: "S-098", type: "Naciąg rakiety", brand: "Yonex Ezone 100", status: "completed", date: "12 paź 2025", price: "100 zł" },
];

const statusMap: Record<Item["status"], { label: string; cls: string }> = {
  "in-progress": { label: "W trakcie", cls: "bg-warning/15 text-warning border-warning/30" },
  ready: { label: "Do odbioru", cls: "bg-success/15 text-success border-success/30" },
  rented: { label: "Wypożyczone", cls: "bg-court-hard/15 text-court-hard border-court-hard/30" },
  completed: { label: "Zakończone", cls: "bg-secondary text-muted-foreground border-border" },
};

const inventory = [
  { name: "Rakieta tenisowa", available: 12, total: 18, price: "25 zł / sesja" },
  { name: "Tuba piłek (4 szt.)", available: 48, total: 60, price: "15 zł" },
  { name: "Maszyna do strzelania", available: 1, total: 2, price: "60 zł / godz." },
  { name: "Ball boy / kosz", available: 4, total: 4, price: "30 zł / sesja" },
];

const Service = () => {
  const [items, setItems] = useState(initial);
  const [open, setOpen] = useState(false);

  const pickup = (id: string) => {
    setItems((p) => p.map((i) => (i.id === id ? { ...i, status: "completed" } : i)));
    toast.success("Sprzęt odebrany", { description: id });
  };

  return (
    <AppLayout>
      <div className="space-y-6">
        <div className="flex items-end justify-between gap-4 flex-wrap">
          <div>
            <h1 className="font-display text-3xl font-bold">Serwis i wypożyczalnia</h1>
            <p className="text-sm text-muted-foreground">Zgłoszenia naciągu, naprawy i wypożyczenia sprzętu.</p>
          </div>
          <Button variant="hero" onClick={() => setOpen(true)}>
            <Plus className="h-4 w-4" /> Nowe zgłoszenie
          </Button>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 rounded-2xl bg-card border border-border overflow-hidden">
            <div className="p-5 border-b border-border">
              <h2 className="font-display text-lg font-bold flex items-center gap-2">
                <Wrench className="h-4 w-4 text-accent" /> Moje zgłoszenia
              </h2>
            </div>
            <div className="divide-y divide-border">
              {items.map((it) => {
                const s = statusMap[it.status];
                return (
                  <div key={it.id} className="px-5 py-4 flex items-center gap-4 hover:bg-secondary/30 transition">
                    <div className="h-11 w-11 rounded-xl bg-gradient-clay text-accent-foreground flex items-center justify-center shrink-0">
                      <CircleDot className="h-5 w-5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-0.5">
                        <span className="font-semibold text-sm">{it.type}</span>
                        <span className={cn("text-[10px] uppercase tracking-wider font-bold px-2 py-0.5 rounded-full border", s.cls)}>
                          {s.label}
                        </span>
                      </div>
                      <div className="text-xs text-muted-foreground truncate">{it.brand} · {it.id} · {it.date}</div>
                    </div>
                    <div className="text-sm font-mono font-bold">{it.price}</div>
                    {it.status === "ready" && (
                      <Button size="sm" variant="hero" onClick={() => pickup(it.id)}>Odbierz</Button>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          <div className="rounded-2xl bg-card border border-border overflow-hidden">
            <div className="p-5 border-b border-border">
              <h2 className="font-display text-lg font-bold flex items-center gap-2">
                <Package className="h-4 w-4 text-primary" /> Wypożyczalnia
              </h2>
              <p className="text-xs text-muted-foreground mt-1">Dostępność dziś</p>
            </div>
            <div className="divide-y divide-border">
              {inventory.map((it) => (
                <div key={it.name} className="px-5 py-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-semibold text-sm">{it.name}</span>
                    <span className="text-xs font-mono text-muted-foreground">{it.available}/{it.total}</span>
                  </div>
                  <div className="h-1.5 rounded-full bg-secondary overflow-hidden mb-2">
                    <div className="h-full bg-primary" style={{ width: `${(it.available / it.total) * 100}%` }} />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">{it.price}</span>
                    <button
                      className="text-xs font-semibold text-primary hover:underline"
                      onClick={() => toast.success(`Zarezerwowano: ${it.name}`)}
                    >
                      Wypożycz
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <ServiceRequestDialog open={open} onOpenChange={setOpen} />
      </div>
    </AppLayout>
  );
};

export default Service;
