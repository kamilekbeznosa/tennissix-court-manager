import { useState } from "react";
import { useNavigate, useLocation, Navigate } from "react-router-dom";
import { Activity, Mail, Lock, Eye, EyeOff, ArrowRight, User as UserIcon, Briefcase } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";
import { useAuth } from "@/contexts/AuthContext";
import { Role } from "@/contexts/RoleContext";
import { toast } from "sonner";

const demoCreds: Record<Role, { email: string; password: string; label: string }> = {
  client: { email: "klient@tennisix.pl", password: "tennis123", label: "Demo klienta" },
  receptionist: { email: "recepcja@tennisix.pl", password: "tennis123", label: "Demo pracownika" },
};

const Login = () => {
  const { user, login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = (location.state as any)?.from?.pathname || "/";

  const [role, setRole] = useState<Role>("client");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPwd, setShowPwd] = useState(false);
  const [remember, setRemember] = useState(true);
  const [loading, setLoading] = useState(false);

  if (user) return <Navigate to={from} replace />;

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await login(email.trim(), password, role);
      toast.success(`Witaj ${role === "client" ? "w klubie" : "w panelu recepcji"}!`);
      navigate(from, { replace: true });
    } catch (err: any) {
      toast.error(err.message || "Błąd logowania");
    } finally {
      setLoading(false);
    }
  };

  const fillDemo = () => {
    const d = demoCreds[role];
    setEmail(d.email);
    setPassword(d.password);
    toast(`Wypełniono dane: ${d.label}`);
  };

  return (
    <div className="min-h-screen w-full grid lg:grid-cols-2 bg-background">
      {/* Left – brand panel */}
      <div className="relative hidden lg:flex flex-col justify-between p-12 text-primary-foreground overflow-hidden bg-gradient-hero">
        <div className="absolute inset-0 opacity-30 mix-blend-overlay"
          style={{ backgroundImage: "radial-gradient(circle at 20% 20%, hsl(var(--primary)/0.5), transparent 50%), radial-gradient(circle at 80% 70%, hsl(var(--accent)/0.4), transparent 55%)" }}
        />
        <div className="relative flex items-center gap-3">
          <div className="h-11 w-11 rounded-xl bg-gradient-primary flex items-center justify-center shadow-glow">
            <Activity className="h-5 w-5 text-primary-foreground" strokeWidth={2.5} />
          </div>
          <div>
            <div className="font-display text-2xl font-bold tracking-tight">TENNISIX</div>
            <div className="text-xs text-white/60 uppercase tracking-widest">Premium Club</div>
          </div>
        </div>

        <div className="relative space-y-6 max-w-md">
          <h1 className="font-display text-5xl font-bold leading-tight">
            Twój kort. <br />
            <span className="text-primary">Twoja gra.</span>
          </h1>
          <p className="text-white/70 text-lg">
            Zarządzaj rezerwacjami, turniejami i sprzętem z jednego miejsca. Zaloguj się, aby kontynuować.
          </p>
          <div className="flex gap-6 pt-4 text-sm text-white/60">
            <div><div className="text-2xl font-bold text-white">12</div>Kortów</div>
            <div><div className="text-2xl font-bold text-white">2.4k</div>Członków</div>
            <div><div className="text-2xl font-bold text-white">98%</div>Satysfakcji</div>
          </div>
        </div>

        <div className="relative text-xs text-white/40">© 2026 TENNISIX. All rights reserved.</div>
      </div>

      {/* Right – form */}
      <div className="flex items-center justify-center p-6 sm:p-12">
        <div className="w-full max-w-md space-y-8">
          <div className="lg:hidden flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-gradient-primary flex items-center justify-center shadow-glow">
              <Activity className="h-5 w-5 text-primary-foreground" strokeWidth={2.5} />
            </div>
            <div className="font-display text-xl font-bold">TENNISIX</div>
          </div>

          <div>
            <h2 className="font-display text-3xl font-bold">Zaloguj się</h2>
            <p className="text-muted-foreground mt-1.5">Wybierz typ konta i podaj swoje dane.</p>
          </div>

          {/* Role tabs */}
          <div className="grid grid-cols-2 gap-3">
            {(["client", "receptionist"] as Role[]).map((r) => {
              const active = role === r;
              const Icon = r === "client" ? UserIcon : Briefcase;
              return (
                <button
                  key={r}
                  type="button"
                  onClick={() => setRole(r)}
                  className={cn(
                    "p-4 rounded-xl border-2 text-left transition-all",
                    active
                      ? "border-primary bg-primary/5 shadow-soft"
                      : "border-border hover:border-primary/40 hover:bg-secondary/50",
                  )}
                >
                  <div className="flex items-center gap-2">
                    <div className={cn(
                      "h-8 w-8 rounded-lg flex items-center justify-center",
                      active ? "bg-primary text-primary-foreground" : "bg-secondary text-muted-foreground",
                    )}>
                      <Icon className="h-4 w-4" />
                    </div>
                    <div className="font-semibold text-sm">
                      {r === "client" ? "Klient" : "Pracownik"}
                    </div>
                  </div>
                  <div className="text-xs text-muted-foreground mt-2">
                    {r === "client" ? "Rezerwacje, turnieje, karnet" : "Recepcja, kalendarz, płatności"}
                  </div>
                </button>
              );
            })}
          </div>

          <form onSubmit={submit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">E-mail</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  placeholder="ty@tennisix.pl"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10 h-11"
                  autoComplete="email"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Hasło</Label>
                <button
                  type="button"
                  onClick={() => toast("Wysłano link resetujący na e-mail")}
                  className="text-xs text-primary hover:underline font-medium"
                >
                  Zapomniałeś hasła?
                </button>
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="password"
                  type={showPwd ? "text" : "password"}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10 pr-10 h-11"
                  autoComplete="current-password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPwd((v) => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showPwd ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 text-sm cursor-pointer">
                <Checkbox checked={remember} onCheckedChange={(v) => setRemember(!!v)} />
                <span className="text-muted-foreground">Zapamiętaj mnie</span>
              </label>
              <button
                type="button"
                onClick={fillDemo}
                className="text-xs text-muted-foreground hover:text-primary font-medium"
              >
                Użyj danych demo →
              </button>
            </div>

            <Button type="submit" variant="hero" size="lg" className="w-full" disabled={loading}>
              {loading ? "Logowanie..." : (
                <>Zaloguj się <ArrowRight className="h-4 w-4" /></>
              )}
            </Button>
          </form>

          <div className="relative">
            <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-border" /></div>
            <div className="relative flex justify-center text-xs"><span className="bg-background px-3 text-muted-foreground uppercase tracking-widest">Lub</span></div>
          </div>

          <div className="text-center text-sm text-muted-foreground">
            Nie masz konta?{" "}
            <button
              onClick={() => toast("Skontaktuj się z recepcją, aby założyć konto")}
              className="text-primary font-semibold hover:underline"
            >
              Dołącz do klubu
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
