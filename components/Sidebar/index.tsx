import React, { useEffect, useState } from "react";
import Head from "next/head";
import * as S from "./style";
import settingService from "../../services/setting.service";

export default function Sidebar({}) {
  const [settings, setSettings] = useState(null);
  useEffect(() => {
    const getSettings = async () => {
      const settings = await settingService.getAllSettingsForWorkspace();
      setSettings(settings);
      console.log(settings);
    };
    getSettings();
  }, []);

  if (!settings) return null;

  return (
    <S.Container>
      <S.BotChannelsHeading>Bot Channels</S.BotChannelsHeading>
      <S.BotChannelsList>
        {settings?.map((setting) => (
          <S.BotChannelsListItem>{setting.channel.name}</S.BotChannelsListItem>
        ))}
      </S.BotChannelsList>
    </S.Container>
  );
}
