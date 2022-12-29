import { createContext, useContext, useEffect, useState } from "react";
import settingService from "./setting.service";
interface SettingsContext {
  settings: SettingType[] | null;
  getSettings: () => Promise<void>;
}
const SettingsContext = createContext<SettingsContext | null>(null);

interface SettingType {}
export function SettingsProvider({ children }) {
  const [settings, setSettings] = useState<SettingType[] | null>(null);

  const getSettings = async () => {
    const fetchedSettings = await settingService.getAllSettingsForWorkspace();
    setSettings(fetchedSettings);
  };

  useEffect(() => {
    getSettings();
  }, []);

  const value = {
    settings,
    getSettings,
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
