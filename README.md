# 🎾 TENNISIX — Premium Tennis Club Management

Nowoczesna, w pełni interaktywna aplikacja webowa do zarządzania premium klubem tenisowym. Obsługuje dwie role użytkowników (**Klient** i **Pracownik recepcji**), rezerwacje kortów w czasie rzeczywistym, turnieje, wypożyczalnię i serwis sprzętu, system karnetów i lojalności.

> Projekt demonstracyjny — wszystkie dane są mockowane po stronie klienta (bez backendu).

---

## ✨ Funkcjonalności

### 👤 Klient
- **Dashboard** z personalizowanym powitaniem, statystykami gracza (win-rate, ranking) i kalendarzem
- **Kreator rezerwacji** (3-krokowy): wybór kortu (clay/hard) → dodatki (rakiety, piłki, trener) → płatność
- **Turnieje** — zapisy, wizualizacja drabinki
- **Serwis sprzętu** — zgłoszenia naprawy rakiet, śledzenie statusu
- **Cennik i karnety** z kodami promocyjnymi
- **Profil** z osiągnięciami i historią

### 🛎️ Recepcja
- Banery alertów (niezapłacone rezerwacje, zapisy na turnieje)
- **Gantt-style timeline** dostępności kortów (14 slotów godzinowych)
- Zarządzanie rezerwacjami i klientami

### 🔧 Systemowe
- 🔐 **Logowanie** z wyborem roli (klient/pracownik) — `/login`
- 🔔 **Powiadomienia** w czasie rzeczywistym
- ⚙️ **Ustawienia** — Light/Dark mode, język, preferencje (zapis w `localStorage`)
- 🌐 Pełna lokalizacja PL
- 📱 Responsywny design (mobile-first)

---

## 🛠️ Stack technologiczny

- **React 18** + **TypeScript 5**
- **Vite 5** — bundler
- **Tailwind CSS v3** + custom design system (HSL tokens)
- **shadcn/ui** — komponenty (Radix UI pod spodem)
- **React Router v6** — routing
- **TanStack Query** — zarządzanie stanem serwera
- **Lucide React** — ikony
- **Sonner** — toasty

---

## 🚀 Uruchomienie lokalne

### Wymagania
- **Node.js** ≥ 18 (zalecane 20+)
- **npm**, **bun** lub **pnpm**

### Krok po kroku

```bash
# 1. Sklonuj repozytorium
git clone <URL_TWOJEGO_REPO>
cd tennisix

# 2. Zainstaluj zależności
npm install
# lub: bun install
# lub: pnpm install

# 3. Uruchom dev server
npm run dev
# lub: bun run dev
```

Aplikacja będzie dostępna pod adresem: **http://localhost:8080**

### Inne komendy

```bash
npm run build       # Build produkcyjny → dist/
npm run preview     # Podgląd buildu produkcyjnego
npm run lint        # ESLint
```

---

## 🔑 Dane logowania (demo)

Na ekranie `/login` wybierz rolę i kliknij **„Użyj danych demo →"**, aby auto-uzupełnić formularz:

| Rola        | E-mail                   | Hasło       |
|-------------|--------------------------|-------------|
| Klient      | `klient@tennisix.pl`     | `tennis123` |
| Pracownik   | `recepcja@tennisix.pl`   | `tennis123` |

> Logowanie jest mockowane — akceptuje dowolny e-mail i hasło min. 4 znaki. Sesja jest zapisywana w `localStorage`.

---

## 📁 Struktura projektu

```
src/
├── components/
│   ├── auth/              # ProtectedRoute
│   ├── booking/           # BookingWizard (3-krokowy kreator)
│   ├── dashboard/         # Client & Receptionist dashboards
│   ├── layout/            # Sidebar, Header, AppLayout, NotificationsPopover, SettingsDialog
│   ├── service/           # Dialogi serwisowe
│   └── ui/                # shadcn/ui components
├── contexts/
│   ├── AuthContext.tsx    # Zarządzanie sesją użytkownika
│   ├── RoleContext.tsx    # Klient ↔ Recepcja
│   ├── NotificationsContext.tsx
│   └── SettingsContext.tsx
├── pages/
│   ├── Login.tsx          # Ekran logowania
│   ├── Index.tsx          # Dashboard (zależny od roli)
│   ├── Reservations.tsx
│   ├── Tournaments.tsx
│   ├── Service.tsx
│   ├── Pricing.tsx
│   └── Profile.tsx
├── index.css              # Design tokens (HSL) + Tailwind layers
└── main.tsx
```

---

## 🎨 Design system

Wszystkie kolory zdefiniowane w **HSL** w `src/index.css` jako semantic tokens:

- `--primary` — vibrant tennis-ball green (`78 92% 48%`)
- `--accent` — clay orange (`18 88% 56%`)
- `--court-hard` / `--court-clay` / `--court-grass` — kolory nawierzchni
- Customowe gradienty: `--gradient-hero`, `--gradient-primary`, `--gradient-clay`
- Typografia: **Space Grotesk** (display) + **Inter** (body)

---

## 📜 Licencja

Projekt edukacyjny / demonstracyjny.
