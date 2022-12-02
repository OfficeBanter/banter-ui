import React, { useEffect, useState, useContext } from "react";
import Head from "next/head";
import * as S from "./style";
import settingService from "../../services/setting.service";
import Button from "../Button";
import ChannelSelectContainer from "../containers/ChannelSelectContainer";
import SetTagsContainer from "../containers/SetTagsContainer";
import TimeSelectContainer from "../containers/TimeSelectContainer";
import { useRouter } from "next/router";
import OverviewContainer from "../containers/OverviewContainer";
import MessageModal from "./MessageModal";

export default function EditSetting({ channels, setChannels }) {
  const router = useRouter();
  const { settingId, step } = router.query;

  const [isMessageModalOpen, setIsMessageModalOpen] = useState(false);
  const [selectedMessage, setSelectedMessage] = useState(null);

  const [setting, setSetting] = useState(null);
  useEffect(() => {
    const getSetting = async () => {
      if (settingId) {
        const setting = await settingService.getSetting(settingId);
        if (setting) {
          setSetting({
            ...setting,
            tags: setting.tags.map((tag) => tag._id),
            channel: {
              label: setting.channel.name,
              name: setting.channel.name,
              uniqueId: setting.channel.uniqueId,
              value: setting.channel.uniqueId,
            },
          });
          setMessages(setting.messages);
        }
      }
    };
    getSetting();
  }, [settingId]);
  const [messages, setMessages] = useState(setting?.messages);

  const messagesDropped = (
    dragIndex: number,
    dropIndex: number,
    messageId: string
  ) => {
    const setOrder = async () => {
      const data = await settingService.reorderMessages(
        dragIndex,
        dropIndex,
        settingId,
        messageId
      );
      setMessages(data.messages);
    };
    setOrder();
  };

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
  };

  const deleteMessage = async (message) => {
    const data = await settingService.deleteMessage(message._id, setting._id);
    setMessages(data.messages);
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
          <S.TabsListItem key={tab.name} active={step === tab.step}>
            <S.TabsListItemLink href={`/setting/${setting._id}/${tab.step}`}>
              {tab.name}
            </S.TabsListItemLink>
          </S.TabsListItem>
        ))}
      </S.TabsList>

      {step === "overview" && (
        <OverviewContainer
          messages={messages}
          setMessages={setMessages}
          messagesDropped={messagesDropped}
          deleteMessage={deleteMessage}
          createMessage={() => setIsMessageModalOpen(true)}
        />
      )}
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
      <MessageModal
        open={isMessageModalOpen}
        message={selectedMessage}
        setOpen={setIsMessageModalOpen}
      />
    </S.Container>
  );
}
