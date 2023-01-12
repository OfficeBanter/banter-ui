import { useLDClient } from "launchdarkly-react-client-sdk";
import { createContext, useContext, useEffect, useState } from "react";
import authService from "./auth.service";
import settingService from "./setting.service";
interface SettingsContext {
  settings: SettingType[] | null;
  getSettings: () => Promise<void>;
}
const SettingsContext = createContext<SettingsContext | null>(null);

interface SettingType {}

export function SettingsProvider({ children }) {
  const [settings, setSettings] = useState<SettingType[] | null>(null);
  const [subscription, setSubscription] = useState<SettingType[] | null>(null);

  const getSettings = async () => {
    const { settings, subscription } =
      await settingService.getAllSettingsForWorkspace();
    setSettings(settings);
    setSubscription(subscription);
  };

  const client = useLDClient();

  useEffect(() => {
    const user = authService.getUser();

    if (!user) return;
    client?.identify({
      key: user?.id,
      ...user,
    });
  }, []);

  useEffect(() => {
    (async () => {
      try {
        await getSettings();
      } catch (error) {
        console.error(error);
      }
    })();
  }, []);

  const value = {
    settings,
    subscription,
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
