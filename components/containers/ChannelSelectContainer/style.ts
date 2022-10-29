import Link from "next/link";
import styled from "styled-components";
import { whenDesktop } from "../../components/Layout/layoutQueries";
import Select from "react-select";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
`;

export const BotChannelsHeading = styled.h2`
  font-size: 16px;
`;

export const BotChannelsDescription = styled.p``;

export const BotChannelsNotFound = styled.p``;

export const SelectDropdown = styled(Select)`
  width: 320px;
`;
