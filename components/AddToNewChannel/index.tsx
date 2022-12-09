import React, { useEffect, useState } from "react";
import Head from "next/head";
import settingService from "../../services/setting.service";
import { Button } from "flowbite-react";
import ChannelSelectContainer from "../containers/ChannelSelectContainer";
import SetTagsContainer from "../containers/SetTagsContainer";
import TimeSelectContainer from "../containers/TimeSelectContainer";
import TIMEZONES, { Timezone } from "../Constants/timezones";
import { DEFAULT_TAGS } from "../Constants/tags.ts";
import DAYS from "../Constants/days";

export default function Onboarding({}) {
  const [channels, setChannels] = useState(null);
  useEffect(() => {
    const getChannels = async () => {
      const channels = await settingService.getChannels();
      setChannels(
        channels.map(({ uniqueId, name, isPrivate, ...rest }) => ({
          ...rest,
          value: uniqueId,
          label: `${isPrivate ? "🔒" : "#"}${name}`,
        }))
      );
    };
    getChannels();
  }, []);
  const [setting, setSetting] = useState({
    tags: DEFAULT_TAGS,
    timezone: TIMEZONES[6],
    day: DAYS[0].key,
    time: "11:00",
  });

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

  const [step, setStep] = useState(0);
  useEffect(() => {
    if (step === -1) {
      setStep(0);
    }
    if (step > 2) {
      const saveSetting = async () => {
        const createdSetting = await settingService.createSetting(setting);
      };
      saveSetting();
    }
  }, [step]);

  const isValidStep = () => {
    if (step === 0) {
      return setting.channel;
    }
    if (step === 1) {
      return setting.tags.length > 0;
    }
    if (step === 2) {
      return setting.day && setting.time && setting.timezone;
    }
  };

  return (
    <div>
      {step <= 0 && (
        <ChannelSelectContainer
          channels={channels}
          slackChannel={setting.channel}
          setSlackChannel={setSlackChannel}
        />
      )}
      {step === 1 && <SetTagsContainer tags={setting.tags} setTags={setTags} />}
      {step === 2 && (
        <TimeSelectContainer
          timezone={setting.timezone}
          day={setting.day}
          time={setting.time}
          setDay={setDay}
          setTime={setTime}
          setTimezone={setTimezone}
        />
      )}
      {step <= 2 && (
        <>
          {step > 0 && (
            <Button onClick={() => setStep(step - 1)}> Back </Button>
          )}
          <Button disabled={!isValidStep()} onClick={() => setStep(step + 1)}>
            {step === 2 ? "Submit" : "Next"}
          </Button>
        </>
      )}
    </div>
  );
}
