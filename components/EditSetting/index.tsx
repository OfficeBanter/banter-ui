import React, { useEffect, useState, useContext } from "react";
import Head from "next/head";
import * as S from "./style";
import settingService from "../../services/setting.service";
import Button from "../Button";
import ChannelSelectContainer from "../containers/ChannelSelectContainer";
import SetTagsContainer from "../containers/SetTagsContainer";
import TimeSelectContainer from "../containers/TimeSelectContainer";
import { useRouter } from "next/router";

export default function EditSetting({ channels, setChannels }) {
  const router = useRouter();
  const { settingId, step } = router.query;

  const [setting, setSetting] = useState(null);
  useEffect(() => {
    const getSettings = async () => {
      const settings = await settingService.getAllSettingsForWorkspace();
      const setting = settings.find((setting) => setting._id === settingId);
      if (setting) {
        setSetting({
          ...setting,
          channel: {
            label: setting.channel.name,
            name: setting.channel.name,
            uniqueId: setting.channel.uniqueId,
            value: setting.channel.uniqueId,
          },
        });
      }
    };
    getSettings();
  }, [settingId]);

  const setDay = (day: string) => {
    setSetting({ ...setting, day });
  };

  const setTime = (time: string) => {
    setSetting({ ...setting, time });
  };

  const setTimezone = (timezone: Timezone) => {
    setSetting({ ...setting, timezone: timezone._id });
  };

  const setTags = (tags: string[]) => {
    setSetting({ ...setting, tags });
  };

  const setSlackChannel = (channel) => {
    setSetting({ ...setting, channel });
  };

  if (!setting) {
    return null;
  }

  const saveSetting = async () => {
    const newSetting = await settingService.saveSetting(setting);
    console.log(newSetting);
  };
  const tabs = [
    {
      name: "Overview",
      step: "overview",
    },
    {
      name: "Change Channel",
      step: "channel",
    },
    {
      name: "Topics",
      step: "tags",
    },
    {
      name: "Scheduling",
      step: "trigger",
    },
  ];
  return (
    <S.Container>
      <S.TabsList>
        {tabs.map((tab) => (
          <S.TabsListItem active={step === tab.step}>
            <S.TabsListItemLink href={`/setting/${setting._id}/${tab.step}`}>
              {tab.name}
            </S.TabsListItemLink>
          </S.TabsListItem>
        ))}
      </S.TabsList>

      {step === "overview" && <p>foobar</p>}
      {step === "channel" && (
        <ChannelSelectContainer
          channels={channels}
          slackChannel={setting.channel}
          setSlackChannel={setSlackChannel}
        />
      )}
      {step === "tags" && (
        <SetTagsContainer tags={setting.tags} setTags={setTags} />
      )}
      {step === "trigger" && (
        <TimeSelectContainer
          timezone={setting.timezone}
          day={setting.day}
          time={setting.time}
          setDay={setDay}
          setTime={setTime}
          setTimezone={setTimezone}
        />
      )}
      <Button onClick={saveSetting}>Save</Button>
    </S.Container>
  );
}
