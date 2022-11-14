import React, { useEffect, useState } from "react";
import Head from "next/head";
import * as S from "./style";
import settingService from "../../services/setting.service";
import { useRouter } from "next/router";

export default function Sidebar({}) {
  const [settings, setSettings] = useState(null);

  const router = useRouter();
  const { settingId } = router.query;

  useEffect(() => {
    const getSettings = async () => {
      const settings = await settingService.getAllSettingsForWorkspace();
      setSettings(settings);
    };
    getSettings();
  }, []);

  if (!settings) return null;

  return (
    <S.Container>
      <S.BotChannelsHeading>Bot Channels</S.BotChannelsHeading>
      <S.BotChannelsList>
        {settings?.map((setting) => (
          <S.BotChannelsListItem
            active={settingId === setting._id}
            key={setting._id}
          >
            <S.BotChannelsListItemLink
              href={`/setting/${setting._id}/overview`}
            >
              {setting.channel.name}
            </S.BotChannelsListItemLink>
          </S.BotChannelsListItem>
        ))}
      </S.BotChannelsList>
    </S.Container>
  );
}
