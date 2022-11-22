import React, { useEffect, useState, useCallback } from "react";
import Head from "next/head";
import * as S from "./style";
import { Message } from "./Message";
import update from "immutability-helper";

export default function OverviewContainer({
  messages,
  setMessages,
  setFromTo,
}) {
  console.log(messages);
  const moveMessage = useCallback((dragIndex: number, hoverIndex: number) => {
    console.log(dragIndex, hoverIndex);
    setMessages((prevCards) =>
      update(prevCards, {
        $splice: [
          [dragIndex, 1],
          [hoverIndex, 0, prevCards[dragIndex]],
        ],
      })
    );
  }, []);

  const renderMessage = useCallback((message, index: number) => {
    const scheduledDateRaw = new Date(message.scheduledOn);
    const topics = message.message.tags.map(({ name }) => name).join(", ");

    return (
      <Message index={index} key={message._id} moveMessage={moveMessage}>
        <S.MessageDate bold={message.scheduledMessageId}>
          {scheduledDateRaw.toLocaleDateString("en-US", {
            weekday: "short",
            month: "short",
            day: "numeric",
          })}
        </S.MessageDate>

        <S.MessageText>{message.customMessage}</S.MessageText>

        <S.HasImage>{!!message.customFile && "Has Image"}</S.HasImage>

        <S.Topics>topics</S.Topics>

        <S.EditButton>Edit</S.EditButton>

        <S.DeleteButton>Delete</S.DeleteButton>
      </Message>
    );
  }, []);
  return (
    <S.Container>
      {messages?.map((message, i) => renderMessage(message, i))}
    </S.Container>
  );
}
