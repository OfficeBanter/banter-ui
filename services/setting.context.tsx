import { createContext, useContext, useState } from "react";

interface SettingsContext {
  settings: SettingType[] | null;
  setSettings: (settings: SettingType[] | null) => void;
}
const SettingsContext = createContext<SettingsContext | null>(null);

interface SettingType {}
export function SettingsProvider({ children }) {
  const [settings, setSettings] = useState<SettingType[] | null>(null);

  const value = {
    settings,
    setSettings,
  };
  return (
    <SettingsContext.Provider value={value}>
      {children}
    </SettingsContext.Provider>
  );
}

export function useSettings(): SettingsContext {
  const context = useContext(SettingsContext);
  if (!context) {
    throw new Error("useSettings must be used within SettingsProvider");
  }
  return context;
}
