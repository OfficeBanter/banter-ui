import React from "react";
import Select from "react-select";

export default function ChannelSelectContainer({
  slackChannel,
  setSlackChannel,
  channels,
}) {
  return (
    <div>
      <h1>Pick the channel you want to add Banter</h1>
      <p>
        We recommend adding Banter to a channel that is already used for small
        talk and getting to know each other. #random or #general are usually
        good fits.
      </p>
      <Select
        classNamePrefix="select"
        isLoading={!channels}
        isClearable={false}
        isSearchable={true}
        name="channels"
        options={channels || []}
        value={slackChannel}
        onChange={(channel) =>
          setSlackChannel({
            ...channel,
            uniqueId: channel.value,
            name: channel.label,
          })
        }
      />
      <p>
        Don't see your private channel? Go to the Slack channel you'd like to
        set up Banter in, type "/invite @BanterBot"
      </p>
    </div>
  );
}
