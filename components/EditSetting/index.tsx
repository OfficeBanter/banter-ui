import React, { useEffect, useState, useContext } from "react";
import settingService from "../../services/setting.service";
import ChannelSelectContainer from "../containers/ChannelSelectContainer";
import SetTagsContainer from "../containers/SetTagsContainer";
import TimeSelectContainer from "../containers/TimeSelectContainer";
import { useRouter } from "next/router";
import MessagesContainer from "../containers/MessagesContainer";
import MessageModal from "./MessageModal";
import { Tabs } from "flowbite-react";
import { useLoading } from "../Loading";
import { useToast } from "../Toast";
import { Button } from "flowbite-react";

export default function EditSetting({ channels, setChannels }) {
  const router = useRouter();
  const { settingId, step } = router.query;
  const setLoading = useLoading({ name: "overview" });
  const { addToast } = useToast();

  const [isMessageModalOpen, setIsMessageModalOpen] = useState(false);
  const [selectedMessage, setSelectedMessage] = useState(null);

  const [setting, setSetting] = useState(null);
  useEffect(() => {
    const getSetting = async () => {
      if (settingId) {
        setLoading(true);
        try {
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
        } catch (e) {
          addToast({ type: "error", message: e.message });
        }
        setLoading(false);
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
      setLoading(true);
      try {
        const data = await settingService.reorderMessages(
          dragIndex,
          dropIndex,
          settingId,
          messageId
        );
        setMessages(data.messages);
      } catch (error) {}

      setLoading(false);
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
    try {
      setLoading(true);
      const { setting: newSetting } = await settingService.saveSetting(setting);
      setSetting({
        ...newSetting,
        tags: newSetting.tags,
        channel: {
          label: newSetting.channel.name,
          name: newSetting.channel.name,
          uniqueId: newSetting.channel.uniqueId,
          value: newSetting.channel.uniqueId,
        },
      });
      addToast({ type: "success", message: "Setting saved" });
    } catch (error) {
      console.error(error);
      addToast({ type: "error", message: error?.message });
    }

    setLoading(false);
  };

  const deleteMessage = async (message) => {
    try {
      setLoading(true);
      const data = await settingService.deleteMessage(message._id, setting._id);
      setMessages(data.messages);
      addToast({
        type: "success",
        message: "Message deleted",
      });
    } catch (error) {
      console.error(error);
      addToast({
        type: "error",
        message: error?.message || "Something went wrong!",
      });
    }
    setLoading(false);
  };

  const editMessage = (message) => {
    setSelectedMessage({
      message: message.customMessage,
      customFile: message.customFile,
    });
    setIsMessageModalOpen(true);
  };

  const saveMessage = async (message) => {
    try {
      setLoading(true);
      const data = message._id
        ? await settingService.updateMessage(setting._id, message)
        : await settingService.createNewMessage(setting._id, message);

      setMessages(data.messages);
      addToast({
        type: "success",
        message: "Message saved",
      });
      setIsMessageModalOpen(false);
    } catch (error) {
      console.error(error);
      addToast({
        type: "error",
        message: error?.message || "Something went wrong!",
      });
    }
    setLoading(false);
  };

  const deleteChannel = async (channel) => {
    try {
      setLoading(true);
      const data = await settingService.deleteChannel(setting._id);
      setChannels(data.channels);
      addToast({
        type: "success",
        message: "Channel deleted",
      });
      router.push("/dashboard");
    } catch (error) {
      console.error(error);
      addToast({
        type: "error",
        message: error?.message || "Something went wrong!",
      });
    }
    setLoading(false);
  };

  const tabs = [
    {
      name: "Overview",
      step: "overview",
      component: (
        <MessagesContainer
          messages={messages}
          messagesDropped={messagesDropped}
          deleteMessage={deleteMessage}
          editMessage={editMessage}
          createMessage={() => {
            setSelectedMessage(null);
            setIsMessageModalOpen(true);
          }}
        />
      ),
    },
    {
      name: "Channel",
      step: "channel",
      component: (
        <ChannelSelectContainer
          channels={channels}
          deleteChannel={deleteChannel}
          slackChannel={setting.channel}
          setSlackChannel={setSlackChannel}
        />
      ),
    },
    {
      name: "Topics",
      step: "tags",
      component: <SetTagsContainer tags={setting.tags} setTags={setTags} />,
    },
    {
      name: "Scheduling",
      step: "trigger",
      component: (
        <TimeSelectContainer
          timezone={setting.timezone}
          day={setting.day}
          time={setting.time}
          setDay={setDay}
          setTime={setTime}
          setTimezone={setTimezone}
        />
      ),
    },
  ];

  return (
    <div className="w-full">
      <Tabs.Group aria-label="Full width tabs" style="fullWidth">
        {tabs.map((tab) => (
          <Tabs.Item
            onClick={(e) => e.preventDefault()}
            title={tab.name}
            key={tab.step}
            active={step === tab.step}
          >
            <div className="h-full p-4">
              {tab.component}
              {tab.step !== "overview" && (
                <>
                  <div className="w-full pt-4 flex flex-row-reverse">
                    <Button onClick={saveSetting}>Save</Button>
                  </div>
                </>
              )}
              {isMessageModalOpen && (
                <MessageModal
                  saveMessage={saveMessage}
                  open={isMessageModalOpen}
                  message={selectedMessage}
                  setOpen={setIsMessageModalOpen}
                />
              )}
            </div>
          </Tabs.Item>
        ))}
      </Tabs.Group>
    </div>
  );
}
