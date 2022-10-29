import Link from "next/link";
import styled from "styled-components";
import { whenDesktop } from "../../components/Layout/layoutQueries";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  grid-area: sidebar;
`;

export const BotChannelsHeading = styled.h2`
  font-size: 16px;
`;

export const BotChannelsList = styled.ul``;

export const BotChannelsListItem = styled.li``;

export const AddBotChannelButton = styled.button``;
