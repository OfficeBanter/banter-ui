import styled from "styled-components";
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

export const MessageDate = styled.p<{ bold: boolean }>`
  ${({ bold }) => (bold ? "font-weight: bold;" : "")}})}
`;

export const MessageText = styled.p``;

export const HasImage = styled.div``;

export const Topics = styled.p``;

export const EditButton = styled.button``;

export const DeleteButton = styled.button``;

export const Modal = styled.div``;
