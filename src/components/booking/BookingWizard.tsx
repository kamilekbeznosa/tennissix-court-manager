import { useState, useMemo } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  CalendarDays,
  Clock,
  CircleDot,
  Check,
  ChevronRight,
  ChevronLeft,
  Sparkles,
  CreditCard,
} from "lucide-react";

interface Props {
  open: boolean;
  onOpenChange: (o: boolean) => void;
}

const courts = [
  { id: 1, name: "Kort 1", surface: "Ziemny", color: "bg-gradient-clay", price: 80 },
  { id: 2, name: "Kort 2", surface: "Hard", color: "bg-gradient-court", price: 90 },
  { id: 3, name: "Kort 3", surface: "Ziemny", color: "bg-gradient-clay", price: 80 },
  { id: 4, name: "Kort 4 (kryty)", surface: "Hard", color: "bg-gradient-court", price: 110 },
];

const slots = ["08:00", "10:00", "12:00", "14:00", "16:00", "18:00", "20:00"];

const days = Array.from({ length: 7 }).map((_, i) => {
  const d = new Date();
  d.setDate(d.getDate() + i);
  return d;
});

export const BookingWizard = ({ open, onOpenChange }: Props) => {
  const [step, setStep] = useState(1);
  const [day, setDay] = useState(0);
  const [time, setTime] = useState<string | null>(null);
  const [court, setCourt] = useState<number | null>(null);
  const [racket, setRacket] = useState(false);
  const [balls, setBalls] = useState(false);
  const [coach, setCoach] = useState(false);

  const selectedCourt = courts.find((c) => c.id === court);

  const subtotal = useMemo(() => {
    let s = selectedCourt?.price ?? 0;
    if (racket) s += 25;
    if (balls) s += 15;
    if (coach) s += 120;
    return s;
  }, [selectedCourt, racket, balls, coach]);

  const memberDiscount = Math.round(subtotal * 0.15);
  const total = subtotal - memberDiscount;

  const reset = () => {
    setStep(1); setDay(0); setTime(null); setCourt(null);
    setRacket(false); setBalls(false); setCoach(false);
  };

  const close = (o: boolean) => { if (!o) reset(); onOpenChange(o); };

  const canNext =
    (step === 1 && time && court) ||
    (step === 2) ||
    step === 3;

  return (
    <Dialog open={open} onOpenChange={close}>
      <DialogContent className="max-w-3xl p-0 gap-0 overflow-hidden">
        <DialogHeader className="px-8 pt-8 pb-4">
          <DialogTitle className="text-2xl font-display flex items-center gap-2">
            <CircleDot className="h-6 w-6 text-primary" />
            Nowa rezerwacja kortu
          </DialogTitle>
          {/* Stepper */}
          <div className="flex items-center gap-2 pt-4">
            {[1, 2, 3].map((n) => (
              <div key={n} className="flex items-center gap-2 flex-1">
                <div
                  className={cn(
                    "h-8 w-8 rounded-full flex items-center justify-center text-xs font-bold transition-all",
                    step >= n
                      ? "bg-primary text-primary-foreground shadow-soft"
                      : "bg-secondary text-muted-foreground",
                  )}
                >
                  {step > n ? <Check className="h-4 w-4" /> : n}
                </div>
                {n < 3 && (
                  <div className={cn("h-1 flex-1 rounded-full transition-all", step > n ? "bg-primary" : "bg-secondary")} />
                )}
              </div>
            ))}
          </div>
          <div className="flex justify-between text-xs text-muted-foreground pt-1">
            <span>Termin</span>
            <span className="text-center">Sprzęt</span>
            <span>Podsumowanie</span>
          </div>
        </DialogHeader>

        <div className="px-8 py-6 min-h-[380px] bg-gradient-card">
          {step === 1 && (
            <div className="space-y-6 animate-fade-in">
              <div>
                <label className="text-xs uppercase tracking-wider font-semibold text-muted-foreground flex items-center gap-2 mb-3">
                  <CalendarDays className="h-3.5 w-3.5" /> Wybierz datę
                </label>
                <div className="grid grid-cols-7 gap-2">
                  {days.map((d, i) => (
                    <button
                      key={i}
                      onClick={() => setDay(i)}
                      className={cn(
                        "py-3 rounded-lg border text-center transition-all",
                        day === i
                          ? "bg-foreground text-background border-foreground shadow-soft"
                          : "bg-card border-border hover:border-primary/40",
                      )}
                    >
                      <div className="text-[10px] uppercase opacity-70">
                        {d.toLocaleDateString("pl-PL", { weekday: "short" })}
                      </div>
                      <div className="text-lg font-bold">{d.getDate()}</div>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-xs uppercase tracking-wider font-semibold text-muted-foreground flex items-center gap-2 mb-3">
                  <Clock className="h-3.5 w-3.5" /> Godzina
                </label>
                <div className="flex flex-wrap gap-2">
                  {slots.map((s) => (
                    <button
                      key={s}
                      onClick={() => setTime(s)}
                      className={cn(
                        "px-4 py-2 rounded-lg text-sm font-semibold border transition-all",
                        time === s
                          ? "bg-primary text-primary-foreground border-primary shadow-soft"
                          : "bg-card border-border hover:border-primary/40",
                      )}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-xs uppercase tracking-wider font-semibold text-muted-foreground mb-3 block">
                  Kort
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {courts.map((c) => (
                    <button
                      key={c.id}
                      onClick={() => setCourt(c.id)}
                      className={cn(
                        "p-4 rounded-xl border text-left transition-all flex items-center gap-3 group",
                        court === c.id
                          ? "border-primary bg-primary/5 shadow-soft"
                          : "border-border bg-card hover:border-primary/40",
                      )}
                    >
                      <div className={cn("h-12 w-12 rounded-lg flex items-center justify-center text-white shadow-soft", c.color)}>
                        <CircleDot className="h-5 w-5" />
                      </div>
                      <div className="flex-1">
                        <div className="font-semibold text-sm">{c.name}</div>
                        <div className="text-xs text-muted-foreground">{c.surface}</div>
                      </div>
                      <div className="font-mono text-sm font-bold">{c.price} zł</div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4 animate-fade-in">
              <p className="text-sm text-muted-foreground">
                Dodaj wyposażenie do swojej rezerwacji. Możesz pominąć ten krok.
              </p>
              {[
                { key: "racket", label: "Rakieta tenisowa", desc: "Wilson / Babolat — pro level", price: 25, on: racket, set: setRacket },
                { key: "balls", label: "Tuba piłek", desc: "Head Tour XT, 4 szt.", price: 15, on: balls, set: setBalls },
                { key: "coach", label: "Trener (1h)", desc: "Indywidualna lekcja z certyfikowanym trenerem", price: 120, on: coach, set: setCoach },
              ].map((item) => (
                <button
                  key={item.key}
                  onClick={() => item.set(!item.on)}
                  className={cn(
                    "w-full flex items-center gap-4 p-4 rounded-xl border transition-all text-left",
                    item.on ? "border-primary bg-primary/5 shadow-soft" : "border-border bg-card hover:border-primary/40",
                  )}
                >
                  <div
                    className={cn(
                      "h-6 w-11 rounded-full transition-all relative",
                      item.on ? "bg-primary" : "bg-secondary",
                    )}
                  >
                    <span
                      className={cn(
                        "absolute top-0.5 h-5 w-5 rounded-full bg-white shadow-sm transition-all",
                        item.on ? "left-5" : "left-0.5",
                      )}
                    />
                  </div>
                  <div className="flex-1">
                    <div className="font-semibold">{item.label}</div>
                    <div className="text-xs text-muted-foreground">{item.desc}</div>
                  </div>
                  <div className="font-mono font-bold text-sm">+{item.price} zł</div>
                </button>
              ))}
            </div>
          )}

          {step === 3 && (
            <div className="space-y-4 animate-fade-in">
              <div className="rounded-xl border border-border bg-card p-5 space-y-3">
                <div className="flex items-center justify-between pb-3 border-b border-border">
                  <div>
                    <div className="text-xs uppercase tracking-wider text-muted-foreground">Rezerwacja</div>
                    <div className="font-display font-bold text-lg">
                      {selectedCourt?.name} · {time}
                    </div>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {days[day].toLocaleDateString("pl-PL", { weekday: "long", day: "numeric", month: "long" })}
                  </div>
                </div>

                <Row label={`${selectedCourt?.name} (${selectedCourt?.surface})`} value={`${selectedCourt?.price} zł`} />
                {racket && <Row label="Rakieta tenisowa" value="25 zł" />}
                {balls && <Row label="Tuba piłek" value="15 zł" />}
                {coach && <Row label="Trener (1h)" value="120 zł" />}

                <div className="pt-3 border-t border-border space-y-2">
                  <Row label="Razem" value={`${subtotal} zł`} muted />
                  <div className="flex justify-between text-sm">
                    <span className="flex items-center gap-1.5 text-success font-semibold">
                      <Sparkles className="h-3.5 w-3.5" /> Rabat VIP (15%)
                    </span>
                    <span className="font-mono text-success font-semibold">-{memberDiscount} zł</span>
                  </div>
                </div>

                <div className="flex justify-between items-end pt-3 border-t border-border">
                  <span className="text-sm font-semibold">Do zapłaty</span>
                  <span className="font-display text-3xl font-bold">{total} <span className="text-base text-muted-foreground">zł</span></span>
                </div>
              </div>

              <div className="text-xs text-muted-foreground flex items-start gap-2">
                <Check className="h-3.5 w-3.5 mt-0.5 text-success shrink-0" />
                Bezpłatna anulacja do 12h przed rezerwacją.
              </div>
            </div>
          )}
        </div>

        <div className="px-8 py-4 border-t border-border bg-card flex items-center justify-between gap-3">
          <Button
            variant="ghost"
            onClick={() => (step > 1 ? setStep(step - 1) : close(false))}
          >
            <ChevronLeft className="h-4 w-4" />
            {step === 1 ? "Anuluj" : "Wstecz"}
          </Button>
          {step < 3 ? (
            <Button variant="hero" disabled={!canNext} onClick={() => setStep(step + 1)}>
              Dalej <ChevronRight className="h-4 w-4" />
            </Button>
          ) : (
            <Button variant="hero" size="lg" onClick={() => close(false)}>
              <CreditCard className="h-4 w-4" /> Zapłać {total} zł
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

const Row = ({ label, value, muted }: { label: string; value: string; muted?: boolean }) => (
  <div className={cn("flex justify-between text-sm", muted && "text-muted-foreground")}>
    <span>{label}</span>
    <span className="font-mono">{value}</span>
  </div>
);
