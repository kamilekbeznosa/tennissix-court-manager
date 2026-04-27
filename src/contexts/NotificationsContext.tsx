import { createContext, useContext, useState, ReactNode, useCallback } from "react";

export interface AppNotification {
  id: string;
  title: string;
  desc: string;
  time: string;
  read: boolean;
  tone: "info" | "success" | "warning" | "danger";
}

interface Ctx {
  items: AppNotification[];
  unread: number;
  markAllRead: () => void;
  markRead: (id: string) => void;
  remove: (id: string) => void;
  push: (n: Omit<AppNotification, "id" | "read" | "time">) => void;
}

const NotificationsCtx = createContext<Ctx | null>(null);

const seed: AppNotification[] = [
  { id: "1", title: "Rezerwacja potwierdzona", desc: "Kort 2 · jutro 18:00", time: "5 min temu", read: false, tone: "success" },
  { id: "2", title: "Turniej Open startuje za 2 dni", desc: "Sprawdź drabinkę grupową", time: "1 godz temu", read: false, tone: "info" },
  { id: "3", title: "Płatność oczekująca", desc: "Rezerwacja #2841 — 180 zł", time: "3 godz temu", read: false, tone: "warning" },
  { id: "4", title: "Rakieta gotowa do odbioru", desc: "Naciąg Wilson Pro Staff", time: "wczoraj", read: true, tone: "info" },
  { id: "5", title: "Nowa wiadomość od trenera", desc: "Tomasz K. — zmiana godziny lekcji", time: "wczoraj", read: true, tone: "info" },
];

export const NotificationsProvider = ({ children }: { children: ReactNode }) => {
  const [items, setItems] = useState<AppNotification[]>(seed);

  const markAllRead = useCallback(() => setItems((p) => p.map((n) => ({ ...n, read: true }))), []);
  const markRead = useCallback((id: string) => setItems((p) => p.map((n) => (n.id === id ? { ...n, read: true } : n))), []);
  const remove = useCallback((id: string) => setItems((p) => p.filter((n) => n.id !== id)), []);
  const push = useCallback((n: Omit<AppNotification, "id" | "read" | "time">) => {
    setItems((p) => [{ ...n, id: crypto.randomUUID(), read: false, time: "teraz" }, ...p]);
  }, []);

  const unread = items.filter((n) => !n.read).length;

  return (
    <NotificationsCtx.Provider value={{ items, unread, markAllRead, markRead, remove, push }}>
      {children}
    </NotificationsCtx.Provider>
  );
};

export const useNotifications = () => {
  const ctx = useContext(NotificationsCtx);
  if (!ctx) throw new Error("useNotifications must be used within NotificationsProvider");
  return ctx;
};
