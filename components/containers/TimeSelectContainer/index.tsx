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
  disabled,
}: {
  timezone?: Timezone;
  setTimezone: (timezone: Timezone) => void;
  day?: string;
  setDay: (day: string) => void;
  time?: string;
  setTime: (time: string) => void;
  disabled?: boolean;
}) {
  const setTimezoneFromId = (timezoneId: string) => {
    const timezone = TIMEZONES.find(({ _id }) => _id === timezoneId.toString());
    if (timezone) {
      setTimezone(timezone);
    }
  };

  return (
    <div className="w-[40vw] flex flex-col space-y-2 text-center ">
      <h1 className="text-2xl font-bold">When do you want banter to happen?</h1>
      <p className="text-lg">
        Choose when you want Banter to fire. We recommend every other day or
        once week.
      </p>
      <div className="flex space-x-2">
        <select
          disabled={disabled}
          className="flex-grow"
          value={day}
          onChange={(e) => setDay(e.target.value)}
        >
          {DAYS.map((day) => (
            <option key={day.key} value={day.key}>
              {day.val}
            </option>
          ))}
        </select>

        <input
          disabled={disabled}
          type="time"
          value={time}
          onChange={(e) => setTime(e.target.value)}
        />
      </div>

      <select
        disabled={disabled}
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
