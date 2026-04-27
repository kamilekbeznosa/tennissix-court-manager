import { AppLayout } from "@/components/layout/AppLayout";
import { Button } from "@/components/ui/button";
import { Check, Crown, Sparkles, Tag, Zap } from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

const packages = [
  {
    name: "Starter",
    price: "199",
    period: "/ mies.",
    desc: "Idealny na początek przygody z tenisem.",
    features: ["4 rezerwacje / mies.", "Dostęp do kortów 1-2", "Rabat 5% na sprzęt", "Podstawowy serwis"],
    highlight: false,
    cta: "Wybierz Starter",
  },
  {
    name: "Pro",
    price: "499",
    period: "/ mies.",
    desc: "Dla regularnych graczy klubowych.",
    features: ["12 rezerwacji / mies.", "Wszystkie korty", "Rabat 10% na sprzęt", "1 lekcja indywidualna", "Priorytetowa rezerwacja"],
    highlight: true,
    cta: "Wybierz Pro",
  },
  {
    name: "VIP",
    price: "999",
    period: "/ mies.",
    desc: "Premium experience bez ograniczeń.",
    features: ["Bez limitu rezerwacji", "Korty kryte 24/7", "Rabat 15% na wszystko", "4 lekcje + analiza video", "Dedykowany concierge", "Strefa VIP w klubie"],
    highlight: false,
    cta: "Wybierz VIP",
  },
];

const promos = [
  { code: "WEEKEND25", desc: "25% rabatu na rezerwacje sob-niedz", until: "do 30 lis", color: "bg-gradient-primary" },
  { code: "BRING2", desc: "Przyprowadź znajomego — 2. wejście gratis", until: "stała", color: "bg-gradient-clay" },
  { code: "EARLYBIRD", desc: "20% taniej za rezerwacje 8:00-10:00", until: "stała", color: "bg-foreground" },
];

const Pricing = () => {
  return (
    <AppLayout>
      <div className="space-y-8">
        <div className="text-center max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-xs font-bold text-primary mb-3">
            <Sparkles className="h-3 w-3" /> Karnety klubowe
          </div>
          <h1 className="font-display text-4xl font-bold mb-2">Wybierz swój pakiet</h1>
          <p className="text-muted-foreground">Elastyczne karnety dostosowane do Twojego stylu gry. Bez ukrytych opłat.</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {packages.map((p) => (
            <div
              key={p.name}
              className={cn(
                "relative rounded-2xl border p-7 transition-all",
                p.highlight
                  ? "border-primary bg-gradient-to-br from-primary/5 to-card shadow-glow scale-[1.02]"
                  : "border-border bg-card hover:shadow-soft",
              )}
            >
              {p.highlight && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-gradient-primary text-primary-foreground text-[10px] font-bold uppercase tracking-wider shadow-soft">
                  Najpopularniejszy
                </div>
              )}
              <div className="flex items-center gap-2 mb-1">
                {p.name === "VIP" && <Crown className="h-4 w-4 text-accent" />}
                <h3 className="font-display text-2xl font-bold">{p.name}</h3>
              </div>
              <p className="text-sm text-muted-foreground mb-5">{p.desc}</p>
              <div className="flex items-baseline gap-1 mb-6">
                <span className="font-display text-5xl font-bold">{p.price}</span>
                <span className="text-muted-foreground">zł {p.period}</span>
              </div>
              <ul className="space-y-3 mb-6">
                {p.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm">
                    <div className="h-5 w-5 rounded-full bg-primary/15 text-primary flex items-center justify-center shrink-0 mt-0.5">
                      <Check className="h-3 w-3" />
                    </div>
                    {f}
                  </li>
                ))}
              </ul>
              <Button
                variant={p.highlight ? "hero" : "outline"}
                size="lg"
                className="w-full"
                onClick={() => toast.success(`Wybrano: ${p.name}`, { description: "Skontaktujemy się z Tobą wkrótce." })}
              >
                {p.cta}
              </Button>
            </div>
          ))}
        </div>

        <div>
          <div className="flex items-center gap-2 mb-4">
            <Tag className="h-5 w-5 text-accent" />
            <h2 className="font-display text-2xl font-bold">Aktywne promocje</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-4">
            {promos.map((promo) => (
              <div key={promo.code} className={cn("rounded-2xl p-5 text-white shadow-soft", promo.color)}>
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider opacity-80 mb-2">
                  <Zap className="h-3 w-3" /> Kod promocyjny
                </div>
                <div className="font-display text-2xl font-bold mb-1 font-mono">{promo.code}</div>
                <div className="text-sm opacity-90 mb-3">{promo.desc}</div>
                <div className="flex items-center justify-between">
                  <span className="text-xs opacity-70">{promo.until}</span>
                  <button
                    className="text-xs font-bold uppercase tracking-wider underline-offset-4 hover:underline"
                    onClick={() => {
                      navigator.clipboard?.writeText(promo.code);
                      toast.success(`Skopiowano: ${promo.code}`);
                    }}
                  >
                    Kopiuj kod
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default Pricing;
