import React, { useEffect, useState } from "react";
import Head from "next/head";
import * as S from "./style";
import settingService from "../../../services/setting.service";

export default function ChannelSelectContainer({}) {
  const [channels, setChannels] = useState(null);
  useEffect(() => {
    const getChannels = async () => {
      const channels = await settingService.getChannels();
      setChannels(
        channels.map(({ uniqueId, name, isPrivate }) => ({
          value: uniqueId,
          label: `${isPrivate ? "🔒" : "#"}${name}`,
        }))
      );
      console.log(channels);
    };
    getChannels();
  }, []);

  return (
    <S.Container>
      <S.BotChannelsHeading>
        Pick the channel you want to add Banter
      </S.BotChannelsHeading>
      <S.BotChannelsDescription>
        We recommend adding Banter to a channel that is already used for small
        talk and getting to know each other. #random or #general are usually
        good fits.
      </S.BotChannelsDescription>
      <S.SelectDropdown
        classNamePrefix="select"
        isLoading={!channels}
        isClearable={false}
        isSearchable={true}
        name="channels"
        options={channels || []}
      />
      <S.BotChannelsNotFound>
        Don't see your private channel? Go to the Slack channel you'd like to
        set up Banter in, type "/invite @BanterBot"
      </S.BotChannelsNotFound>
    </S.Container>
  );
}
