import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { useSettings } from "@/contexts/SettingsContext";
import { Moon, Sun, Globe, Bell, Mail, MessageSquare, Megaphone, LayoutGrid } from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

interface Props {
  open: boolean;
  onOpenChange: (o: boolean) => void;
}

export const SettingsDialog = ({ open, onOpenChange }: Props) => {
  const { settings, update } = useSettings();

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-xl">
        <DialogHeader>
          <DialogTitle className="font-display text-2xl">Ustawienia</DialogTitle>
          <DialogDescription>Spersonalizuj swoje doświadczenie w TENNISIX.</DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-2">
          <section>
            <h3 className="text-xs uppercase tracking-wider font-bold text-muted-foreground mb-3">Wygląd</h3>
            <div className="grid grid-cols-2 gap-3">
              {(["light", "dark"] as const).map((t) => {
                const Icon = t === "light" ? Sun : Moon;
                const active = settings.theme === t;
                return (
                  <button
                    key={t}
                    onClick={() => update("theme", t)}
                    className={cn(
                      "p-4 rounded-xl border flex items-center gap-3 transition-all",
                      active ? "border-primary bg-primary/5 shadow-soft" : "border-border hover:border-primary/40",
                    )}
                  >
                    <Icon className="h-5 w-5" />
                    <span className="font-semibold text-sm">{t === "light" ? "Jasny" : "Ciemny"}</span>
                  </button>
                );
              })}
            </div>
          </section>

          <section>
            <h3 className="text-xs uppercase tracking-wider font-bold text-muted-foreground mb-3">Język</h3>
            <div className="flex gap-2">
              {(["pl", "en"] as const).map((l) => (
                <button
                  key={l}
                  onClick={() => update("language", l)}
                  className={cn(
                    "flex-1 px-4 py-2.5 rounded-lg border font-semibold text-sm transition-all flex items-center justify-center gap-2",
                    settings.language === l ? "border-primary bg-primary/5 shadow-soft" : "border-border hover:border-primary/40",
                  )}
                >
                  <Globe className="h-4 w-4" />
                  {l === "pl" ? "Polski" : "English"}
                </button>
              ))}
            </div>
          </section>

          <section>
            <h3 className="text-xs uppercase tracking-wider font-bold text-muted-foreground mb-3">Powiadomienia</h3>
            <div className="space-y-1 rounded-xl border border-border divide-y divide-border">
              <Toggle icon={Bell} label="Powiadomienia push" desc="Powiadomienia w przeglądarce" value={settings.pushNotifications} onChange={(v) => update("pushNotifications", v)} />
              <Toggle icon={Mail} label="E-mail" desc="Potwierdzenia rezerwacji i przypomnienia" value={settings.emailNotifications} onChange={(v) => update("emailNotifications", v)} />
              <Toggle icon={MessageSquare} label="SMS" desc="Przypomnienia 1h przed rezerwacją" value={settings.smsReminders} onChange={(v) => update("smsReminders", v)} />
              <Toggle icon={Megaphone} label="Marketing" desc="Promocje, turnieje, eventy" value={settings.marketingEmails} onChange={(v) => update("marketingEmails", v)} />
            </div>
          </section>

          <section>
            <h3 className="text-xs uppercase tracking-wider font-bold text-muted-foreground mb-3">Interfejs</h3>
            <div className="rounded-xl border border-border">
              <Toggle icon={LayoutGrid} label="Tryb kompaktowy" desc="Mniej odstępów, więcej treści" value={settings.compactMode} onChange={(v) => update("compactMode", v)} />
            </div>
          </section>
        </div>

        <div className="flex justify-end gap-2 pt-2 border-t border-border">
          <Button variant="ghost" onClick={() => onOpenChange(false)}>Anuluj</Button>
          <Button variant="hero" onClick={() => { toast.success("Ustawienia zapisane"); onOpenChange(false); }}>
            Zapisz zmiany
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

const Toggle = ({
  icon: Icon, label, desc, value, onChange,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string; desc: string; value: boolean; onChange: (v: boolean) => void;
}) => (
  <div className="flex items-center gap-3 p-4">
    <div className="h-9 w-9 rounded-lg bg-secondary flex items-center justify-center shrink-0">
      <Icon className="h-4 w-4" />
    </div>
    <div className="flex-1 min-w-0">
      <div className="font-semibold text-sm">{label}</div>
      <div className="text-xs text-muted-foreground">{desc}</div>
    </div>
    <Switch checked={value} onCheckedChange={onChange} />
  </div>
);
