import React from "react";
import TIMEZONES, { Timezone } from "../../Constants/timezones";
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
    <div>
      <h1>When do you want banter to happen?</h1>
      <p>
        Choose when you want Banter to fire. We recommend every other day or
        once week.
      </p>
      <select value={day} onChange={(e) => setDay(e.target.value)}>
        {DAYS.map((day) => (
          <option key={day.key} value={day.key}>
            {day.val}
          </option>
        ))}
      </select>

      <input
        type="time"
        value={time}
        onChange={(e) => setTime(e.target.value)}
      />

      <select
        value={timezone?._id}
        onChange={(e) => setTimezoneFromId(e.target.value)}
      >
        {TIMEZONES.map((timezone) => (
          <option key={timezone._id} value={timezone._id}>
            {timezone.label}
          </option>
        ))}
      </select>
    </div>
  );
}
