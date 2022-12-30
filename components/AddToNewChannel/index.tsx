import React, { useEffect, useState } from "react";
import settingService from "../../services/setting.service";
import { Button, Modal } from "flowbite-react";
import ChannelSelectContainer from "../containers/ChannelSelectContainer";
import SetTagsContainer from "../containers/SetTagsContainer";
import TimeSelectContainer from "../containers/TimeSelectContainer";
import TIMEZONES, { Timezone } from "../Constants/timezones";
import { DEFAULT_TAGS } from "../Constants/tags.ts";
import DAYS from "../Constants/days";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { useLoading } from "../Loading";
import { useToast } from "../Toast";
import { useRouter } from "next/router";
import { DateTime } from "luxon";
import { useSettings } from "../../services/setting.context";

export default function Onboarding({}) {
  const [channels, setChannels] = useState(null);
  const setLoading = useLoading({ name: "overview" });
  const { addToast } = useToast();
  const router = useRouter();

  const { getSettings, settings } = useSettings();

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
    (async () => {
      try {
        setLoading(true);
        await getChannels();
        setLoading(false);
      } catch (error) {
        addToast({ type: "error", message: error.message });
      }
    })();
  }, []);

  const [setting, setSetting] = useState({
    tags: DEFAULT_TAGS,
    timezone: TIMEZONES[6],
    day: DAYS[0].key,
    time: "11:00",
    userTimeZone: DateTime.local().zoneName,
  });

  const setDay = (day: string) => {
    setSetting({ ...setting, day });
  };

  const setTime = (time: string) => {
    setSetting({ ...setting, time });
  };

  const setTimezone = (timezone: Timezone) => {
    setSetting({ ...setting, timezone });
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
    if (step > 2 && settings?.length === 0) {
      submit();
    } else if (step > 2) {
      setIsModalOpen(true);
    }
  }, [step]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const submit = async () => {
    setStep(2);
    try {
      setLoading(true);
      const {
        data: createdSetting,
        status,
        message,
      } = await settingService.createSetting({
        ...setting,
        timezone: setting.timezone._id,
      });

      if (!status) {
        throw new Error(message);
      }

      addToast({
        type: "success",
        message: "New Banter Created!",
      });
      await getSettings();
      router.push(`/setting/${createdSetting._id}/overview`);
    } catch (error) {
      console.error(error);
      addToast({
        type: "error",
        message: error?.message || "Something went wrong!",
      });
    }
    setLoading(false);
    setIsModalOpen(false);
  };

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
    <div className="h-full col-span-9 row-span-2 p-6 w-min my-0 mx-auto">
      <div className="w-full h-6 mb-6 bg-gray-200 rounded-full dark:bg-gray-700">
        <div
          className="h-6 bg-blue-400 rounded-full dark:bg-blue-500"
          style={{ width: `${(step + 1) * 33}%` }}
        />
      </div>
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
      <div className="flex space-x-48 justify-center mt-8">
        {step <= 2 && (
          <>
            {step > 0 && (
              <Button
                className={`
                rounded-full bg-blue-50 border-2 border-blue-900
                 text-slate-900 hover:bg-blue-100 px-6`}
                onClick={() => setStep(step - 1)}
              >
                {" "}
                Back{" "}
              </Button>
            )}
            <Button
              className="rounded-full bg-blue-900 px-6 hover:bg-blue-800"
              disabled={!isValidStep()}
              onClick={() => setStep(step + 1)}
            >
              {step >= 2 ? "Submit" : "Next"}
            </Button>
          </>
        )}
      </div>
      <Modal show={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <Modal.Body>
          <div className="text-center">
            <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400 whitespace-pre-wrap">
              {`You are about to add another bot to your workspace.
              This will be billed at the same rate as your other channels.
              Including any promos.
              If you are on a free trial, nothing will be charged.`}
            </h3>
            <div className="flex justify-center gap-4">
              <Button color="success" onClick={submit}>
                Yes, I'm sure
              </Button>
              <Button
                color="gray"
                onClick={() => {
                  setStep(2);
                  setIsModalOpen(false);
                }}
              >
                No, cancel
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
}
