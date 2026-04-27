import { createContext, useContext, useEffect, useState, ReactNode } from "react";

export interface Settings {
  theme: "light" | "dark";
  language: "pl" | "en";
  emailNotifications: boolean;
  pushNotifications: boolean;
  smsReminders: boolean;
  marketingEmails: boolean;
  compactMode: boolean;
}

const defaults: Settings = {
  theme: "light",
  language: "pl",
  emailNotifications: true,
  pushNotifications: true,
  smsReminders: false,
  marketingEmails: false,
  compactMode: false,
};

interface Ctx {
  settings: Settings;
  update: <K extends keyof Settings>(key: K, value: Settings[K]) => void;
}

const Ctx = createContext<Ctx>({ settings: defaults, update: () => {} });

export const SettingsProvider = ({ children }: { children: ReactNode }) => {
  const [settings, setSettings] = useState<Settings>(() => {
    try {
      const raw = localStorage.getItem("tennisix-settings");
      return raw ? { ...defaults, ...JSON.parse(raw) } : defaults;
    } catch {
      return defaults;
    }
  });

  useEffect(() => {
    localStorage.setItem("tennisix-settings", JSON.stringify(settings));
    document.documentElement.classList.toggle("dark", settings.theme === "dark");
  }, [settings]);

  const update = <K extends keyof Settings>(key: K, value: Settings[K]) =>
    setSettings((s) => ({ ...s, [key]: value }));

  return <Ctx.Provider value={{ settings, update }}>{children}</Ctx.Provider>;
};

export const useSettings = () => useContext(Ctx);
