import styled from "styled-components";
import Select from "react-select";
import Link from "next/link";

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

export const TabsList = styled.ul``;

export const TabsListItem = styled.li``;

export const TabsListItemLink = styled(Link)``;
