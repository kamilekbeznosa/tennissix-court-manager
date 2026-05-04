import { useState } from "react";
import { Link, useNavigate, Navigate } from "react-router-dom";
import {
  Activity, Mail, Lock, Eye, EyeOff, ArrowRight, User as UserIcon,
  Briefcase, Phone, Check, Trophy, Users, Shield,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";
import { useAuth } from "@/contexts/AuthContext";
import { Role } from "@/contexts/RoleContext";
import { toast } from "sonner";

const passwordStrength = (pwd: string) => {
  let score = 0;
  if (pwd.length >= 6) score++;
  if (pwd.length >= 10) score++;
  if (/[A-Z]/.test(pwd) && /[a-z]/.test(pwd)) score++;
  if (/\d/.test(pwd)) score++;
  if (/[^A-Za-z0-9]/.test(pwd)) score++;
  return Math.min(score, 4);
};

const strengthLabels = ["Bardzo słabe", "Słabe", "Średnie", "Dobre", "Silne"];
const strengthColors = ["bg-destructive", "bg-destructive", "bg-accent", "bg-primary/70", "bg-primary"];

const Register = () => {
  const { user, signup } = useAuth();
  const navigate = useNavigate();

  const [role, setRole] = useState<Role>("client");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [showPwd, setShowPwd] = useState(false);
  const [accept, setAccept] = useState(false);
  const [newsletter, setNewsletter] = useState(true);
  const [loading, setLoading] = useState(false);

  if (user) return <Navigate to="/" replace />;

  const strength = passwordStrength(password);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirm) return toast.error("Hasła nie są identyczne");
    if (!accept) return toast.error("Zaakceptuj regulamin klubu");
    setLoading(true);
    try {
      await signup({ name: name.trim(), email: email.trim(), password, role, phone });
      toast.success("Konto utworzone! Witaj w TENNISIX 🎾");
      navigate("/", { replace: true });
    } catch (err: any) {
      toast.error(err.message || "Błąd rejestracji");
    } finally {
      setLoading(false);
    }
  };

  const benefits = [
    { icon: Trophy, title: "Zniżki członkowskie", desc: "Do 20% taniej na rezerwacje i sprzęt" },
    { icon: Users, title: "Turnieje i ligi", desc: "Pierwszeństwo w zapisach i rankingu" },
    { icon: Shield, title: "Karnet VIP", desc: "Priorytetowy dostęp do najlepszych kortów" },
  ];

  return (
    <div className="min-h-screen w-full grid lg:grid-cols-2 bg-background">
      {/* Left – brand panel */}
      <div className="relative hidden lg:flex flex-col justify-between p-12 text-primary-foreground overflow-hidden bg-gradient-hero">
        <div
          className="absolute inset-0 opacity-30 mix-blend-overlay"
          style={{
            backgroundImage:
              "radial-gradient(circle at 20% 20%, hsl(var(--primary)/0.5), transparent 50%), radial-gradient(circle at 80% 70%, hsl(var(--accent)/0.4), transparent 55%)",
          }}
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

        <div className="relative space-y-8 max-w-md">
          <div>
            <h1 className="font-display text-5xl font-bold leading-tight">
              Dołącz do <span className="text-primary">elity</span> tenisa.
            </h1>
            <p className="text-white/70 text-lg mt-4">
              Rejestracja zajmie minutę. Otrzymasz dostęp do kortów, turniejów i ekskluzywnych ofert.
            </p>
          </div>

          <div className="space-y-4">
            {benefits.map((b) => (
              <div key={b.title} className="flex items-start gap-3">
                <div className="h-10 w-10 rounded-lg bg-white/10 backdrop-blur flex items-center justify-center shrink-0">
                  <b.icon className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <div className="font-semibold">{b.title}</div>
                  <div className="text-sm text-white/60">{b.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="relative text-xs text-white/40">© 2026 TENNISIX. All rights reserved.</div>
      </div>

      {/* Right – form */}
      <div className="flex items-center justify-center p-6 sm:p-12 overflow-y-auto">
        <div className="w-full max-w-md space-y-6 py-6">
          <div className="lg:hidden flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-gradient-primary flex items-center justify-center shadow-glow">
              <Activity className="h-5 w-5 text-primary-foreground" strokeWidth={2.5} />
            </div>
            <div className="font-display text-xl font-bold">TENNISIX</div>
          </div>

          <div>
            <h2 className="font-display text-3xl font-bold">Utwórz konto</h2>
            <p className="text-muted-foreground mt-1.5">Wybierz typ konta i wypełnij dane.</p>
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
                    <div
                      className={cn(
                        "h-8 w-8 rounded-lg flex items-center justify-center",
                        active ? "bg-primary text-primary-foreground" : "bg-secondary text-muted-foreground",
                      )}
                    >
                      <Icon className="h-4 w-4" />
                    </div>
                    <div className="font-semibold text-sm">{r === "client" ? "Klient" : "Pracownik"}</div>
                  </div>
                  <div className="text-xs text-muted-foreground mt-2">
                    {r === "client" ? "Gracz / członek klubu" : "Konto recepcji (kod zaproszenia)"}
                  </div>
                </button>
              );
            })}
          </div>

          <form onSubmit={submit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Imię i nazwisko</Label>
              <div className="relative">
                <UserIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="name"
                  placeholder="Jan Kowalski"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="pl-10 h-11"
                  maxLength={80}
                  required
                />
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
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
                    maxLength={120}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Telefon</Label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="+48 600 000 000"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="pl-10 h-11"
                    maxLength={20}
                  />
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Hasło</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="password"
                  type={showPwd ? "text" : "password"}
                  placeholder="min. 6 znaków"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10 pr-10 h-11"
                  autoComplete="new-password"
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
              {password && (
                <div className="space-y-1.5">
                  <div className="flex gap-1">
                    {[0, 1, 2, 3].map((i) => (
                      <div
                        key={i}
                        className={cn(
                          "h-1 flex-1 rounded-full transition-colors",
                          i < strength ? strengthColors[strength] : "bg-secondary",
                        )}
                      />
                    ))}
                  </div>
                  <div className="text-xs text-muted-foreground">Siła hasła: {strengthLabels[strength]}</div>
                </div>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirm">Powtórz hasło</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="confirm"
                  type={showPwd ? "text" : "password"}
                  placeholder="Powtórz hasło"
                  value={confirm}
                  onChange={(e) => setConfirm(e.target.value)}
                  className="pl-10 h-11"
                  required
                />
                {confirm && password === confirm && (
                  <Check className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-primary" />
                )}
              </div>
            </div>

            <div className="space-y-2.5 pt-1">
              <label className="flex items-start gap-2.5 text-sm cursor-pointer">
                <Checkbox checked={accept} onCheckedChange={(v) => setAccept(!!v)} className="mt-0.5" />
                <span className="text-muted-foreground leading-relaxed">
                  Akceptuję{" "}
                  <button
                    type="button"
                    onClick={() => toast("Otwieranie regulaminu...")}
                    className="text-primary font-medium hover:underline"
                  >
                    regulamin klubu
                  </button>{" "}
                  oraz{" "}
                  <button
                    type="button"
                    onClick={() => toast("Otwieranie polityki prywatności...")}
                    className="text-primary font-medium hover:underline"
                  >
                    politykę prywatności
                  </button>
                  .
                </span>
              </label>
              <label className="flex items-start gap-2.5 text-sm cursor-pointer">
                <Checkbox checked={newsletter} onCheckedChange={(v) => setNewsletter(!!v)} className="mt-0.5" />
                <span className="text-muted-foreground leading-relaxed">
                  Chcę otrzymywać informacje o turniejach i promocjach.
                </span>
              </label>
            </div>

            <Button type="submit" variant="hero" size="lg" className="w-full" disabled={loading}>
              {loading ? "Tworzenie konta..." : (
                <>Utwórz konto <ArrowRight className="h-4 w-4" /></>
              )}
            </Button>
          </form>

          <div className="text-center text-sm text-muted-foreground">
            Masz już konto?{" "}
            <Link to="/login" className="text-primary font-semibold hover:underline">
              Zaloguj się
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
