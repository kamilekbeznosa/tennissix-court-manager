import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Wrench, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

interface Props {
  open: boolean;
  onOpenChange: (o: boolean) => void;
}

const services = [
  { id: "stringing", label: "Naciąg rakiety", price: "od 80 zł", time: "24-48h" },
  { id: "grip", label: "Wymiana owijki", price: "25 zł", time: "tego samego dnia" },
  { id: "repair", label: "Naprawa ramy", price: "od 150 zł", time: "5-7 dni" },
  { id: "rental", label: "Wypożyczenie sprzętu", price: "25 zł / sesja", time: "od ręki" },
];

export const ServiceRequestDialog = ({ open, onOpenChange }: Props) => {
  const [selected, setSelected] = useState<string | null>(null);
  const [notes, setNotes] = useState("");

  const submit = () => {
    if (!selected) return;
    const svc = services.find((s) => s.id === selected);
    toast.success("Zgłoszenie wysłane", { description: `${svc?.label} — ${svc?.time}` });
    setSelected(null); setNotes("");
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle className="font-display text-2xl flex items-center gap-2">
            <Wrench className="h-5 w-5 text-accent" />
            Zgłoś sprzęt do serwisu
          </DialogTitle>
          <DialogDescription>Wybierz typ usługi i opisz szczegóły.</DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-2">
            {services.map((s) => (
              <button
                key={s.id}
                onClick={() => setSelected(s.id)}
                className={cn(
                  "p-3 rounded-xl border text-left transition-all",
                  selected === s.id ? "border-primary bg-primary/5 shadow-soft" : "border-border hover:border-primary/40",
                )}
              >
                <div className="flex items-start justify-between mb-1">
                  <span className="font-semibold text-sm">{s.label}</span>
                  {selected === s.id && <Check className="h-4 w-4 text-primary" />}
                </div>
                <div className="text-xs text-muted-foreground">{s.price}</div>
                <div className="text-[10px] text-accent font-semibold mt-1">⏱ {s.time}</div>
              </button>
            ))}
          </div>

          <div>
            <label className="text-xs uppercase tracking-wider font-semibold text-muted-foreground mb-2 block">
              Uwagi (opcjonalnie)
            </label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={3}
              placeholder="Np. preferowany naciąg 24kg, owijka czarna..."
              className="w-full rounded-lg border border-border bg-card p-3 text-sm focus:outline-none focus:border-primary/50"
            />
          </div>
        </div>

        <div className="flex justify-end gap-2 pt-2 border-t border-border">
          <Button variant="ghost" onClick={() => onOpenChange(false)}>Anuluj</Button>
          <Button variant="hero" disabled={!selected} onClick={submit}>Wyślij zgłoszenie</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
