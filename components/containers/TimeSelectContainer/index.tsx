import React, { useEffect, useState } from "react";
import * as S from "./style";
import settingService from "../../../services/setting.service";
import TIMEZONES, { Timezone } from "../../Constants/timezones";
import { time } from "console";
import DAYS from "../../Constants/days";

export default function ChannelSelectContainer({
  timezone,
  setTimezone,
  day,
  setDay,
  time,
  setTime = () => {},
}: {
  timezone?: Timezone;
  setTimezone: (timezone: Timezone) => void;
  day?: string;
  setDay: (day: string) => void;
  time?: string;
  setTime: (time: string) => void;
}) {
  const setTimezoneFromId = (timezoneId: string) => {
    const timezone = TIMEZONES.find(({ _id }) => _id === timezoneId);
    if (timezone) {
      setTimezone(timezone);
    }
  };

  return (
    <S.Container>
      <S.BotChannelsHeading>
        When do you want banter to happen?
      </S.BotChannelsHeading>
      <S.BotChannelsDescription>
        Choose when you want Banter to fire. We recommend every other day or
        once week.
      </S.BotChannelsDescription>
      <S.SelectDropdown value={day} onChange={(e) => setDay(e.target.value)}>
        {DAYS.map((day) => (
          <option key={day.key} value={day.key}>
            {day.val}
          </option>
        ))}
      </S.SelectDropdown>

      <S.TimeInput
        type="time"
        value={time}
        onChange={(e) => setTime(e.target.value)}
      />

      <S.SelectDropdown
        value={timezone?._id}
        onChange={(e) => setTimezoneFromId(e.target.value)}
      >
        {TIMEZONES.map((timezone) => (
          <option key={timezone._id} value={timezone._id}>
            {timezone.label}
          </option>
        ))}
      </S.SelectDropdown>
    </S.Container>
  );
}
