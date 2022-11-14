import React, { useEffect, useState } from "react";
import * as S from "./style";
import settingService from "../../services/setting.service";

export default function ChannelSelect({}) {
  return (
    <S.Container>
      <S.BotChannelsHeading>Bot Channels</S.BotChannelsHeading>
    </S.Container>
  );
}
