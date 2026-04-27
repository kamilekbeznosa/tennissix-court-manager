import { useState } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { Button } from "@/components/ui/button";
import { Crown, Activity, Trophy, Target, Flame, Settings as SettingsIcon, Camera } from "lucide-react";
import { toast } from "sonner";
import { SettingsDialog } from "@/components/layout/SettingsDialog";

const achievements = [
  { name: "Pierwsza wygrana", icon: "🏆", earned: true },
  { name: "10 meczów", icon: "🎾", earned: true },
  { name: "Seria 5 zwycięstw", icon: "🔥", earned: true },
  { name: "Mistrz turnieju", icon: "👑", earned: false },
  { name: "100 godzin gry", icon: "⏱️", earned: true },
  { name: "VIP Member", icon: "💎", earned: true },
];

const Profile = () => {
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({
    name: "Aleksandra Nowak",
    email: "aleksandra@tennisix.pl",
    phone: "+48 600 123 456",
    bio: "Zapalona tenisistka, gra od 2018 roku. Preferuje korty ziemne.",
  });

  const save = () => {
    setEditing(false);
    toast.success("Profil zaktualizowany");
  };

  return (
    <AppLayout>
      <div className="space-y-6">
        {/* Hero */}
        <div className="relative overflow-hidden rounded-2xl bg-gradient-hero text-white p-8">
          <div className="absolute -top-20 -right-20 h-72 w-72 rounded-full bg-primary/30 blur-3xl" />
          <div className="relative flex flex-col md:flex-row items-start md:items-center gap-6">
            <div className="relative">
              <div className="h-24 w-24 rounded-2xl bg-gradient-primary flex items-center justify-center font-display text-3xl font-bold text-primary-foreground shadow-glow">
                AN
              </div>
              <button
                onClick={() => toast("Wybór avatara wkrótce")}
                className="absolute -bottom-2 -right-2 h-8 w-8 rounded-full bg-card text-foreground flex items-center justify-center shadow-soft hover:scale-110 transition"
              >
                <Camera className="h-4 w-4" />
              </button>
            </div>
            <div className="flex-1">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-xs font-medium mb-2">
                <Crown className="h-3 w-3 text-primary" /> Karnet VIP · Członek od 2022
              </div>
              <h1 className="font-display text-4xl font-bold">{form.name}</h1>
              <p className="text-white/70 mt-1">{form.bio}</p>
            </div>
            <Button variant="hero" onClick={() => setSettingsOpen(true)}>
              <SettingsIcon className="h-4 w-4" /> Ustawienia
            </Button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { icon: Activity, label: "Mecze sezonu", value: "47" },
            { icon: Target, label: "Win rate", value: "68%" },
            { icon: Flame, label: "Najdłuższa seria", value: "8" },
            { icon: Trophy, label: "Wygrane turnieje", value: "3" },
          ].map((s) => (
            <div key={s.label} className="rounded-2xl bg-card border border-border p-5">
              <div className="h-10 w-10 rounded-xl bg-gradient-primary text-primary-foreground flex items-center justify-center mb-3 shadow-soft">
                <s.icon className="h-5 w-5" />
              </div>
              <div className="font-display text-3xl font-bold">{s.value}</div>
              <div className="text-xs text-muted-foreground mt-1">{s.label}</div>
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Personal info */}
          <div className="lg:col-span-2 rounded-2xl bg-card border border-border p-6">
            <div className="flex items-center justify-between mb-5">
              <h2 className="font-display text-xl font-bold">Dane osobowe</h2>
              {!editing ? (
                <Button variant="outline" size="sm" onClick={() => setEditing(true)}>Edytuj</Button>
              ) : (
                <div className="flex gap-2">
                  <Button variant="ghost" size="sm" onClick={() => setEditing(false)}>Anuluj</Button>
                  <Button variant="hero" size="sm" onClick={save}>Zapisz</Button>
                </div>
              )}
            </div>
            <div className="space-y-4">
              {(["name", "email", "phone", "bio"] as const).map((k) => (
                <div key={k}>
                  <label className="text-xs uppercase tracking-wider font-bold text-muted-foreground block mb-1.5">
                    {k === "name" ? "Imię i nazwisko" : k === "email" ? "E-mail" : k === "phone" ? "Telefon" : "Bio"}
                  </label>
                  {editing ? (
                    k === "bio" ? (
                      <textarea
                        value={form[k]}
                        onChange={(e) => setForm({ ...form, [k]: e.target.value })}
                        rows={3}
                        className="w-full rounded-lg border border-border bg-card p-3 text-sm focus:outline-none focus:border-primary/50"
                      />
                    ) : (
                      <input
                        value={form[k]}
                        onChange={(e) => setForm({ ...form, [k]: e.target.value })}
                        className="w-full h-10 px-3 rounded-lg border border-border bg-card text-sm focus:outline-none focus:border-primary/50"
                      />
                    )
                  ) : (
                    <div className="text-sm">{form[k]}</div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Achievements */}
          <div className="rounded-2xl bg-card border border-border p-6">
            <h2 className="font-display text-xl font-bold mb-5">Osiągnięcia</h2>
            <div className="grid grid-cols-3 gap-3">
              {achievements.map((a) => (
                <div
                  key={a.name}
                  className={`aspect-square rounded-xl border flex flex-col items-center justify-center text-center p-2 transition ${
                    a.earned ? "border-primary/30 bg-primary/5" : "border-border bg-secondary/30 opacity-40 grayscale"
                  }`}
                >
                  <div className="text-3xl mb-1">{a.icon}</div>
                  <div className="text-[10px] font-semibold leading-tight">{a.name}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <SettingsDialog open={settingsOpen} onOpenChange={setSettingsOpen} />
      </div>
    </AppLayout>
  );
};

export default Profile;
