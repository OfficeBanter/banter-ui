import React, { useEffect, useState, useCallback } from "react";
import Head from "next/head";
import * as S from "./style";
import { Message } from "./Message";
import update from "immutability-helper";
import settingService from "../../../services/setting.service";
import Button from "../../Button";

export default function OverviewContainer({
  messages,
  setMessages,
  messagesDropped,
  deleteMessage,
  editMessage,
  createMessage,
}) {
  const moveMessage = useCallback((dragIndex: number, hoverIndex: number) => {
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
      <Message
        index={index}
        key={message._id}
        id={message._id}
        moveMessage={moveMessage}
        onDropped={messagesDropped}
      >
        <p
          className={`
          ${message.scheduledMessageId && "font-bold"}
        `}
        >
          {scheduledDateRaw.toLocaleDateString("en-US", {
            weekday: "short",
            month: "short",
            day: "numeric",
          })}
        </p>

        <p>{message.customMessage}</p>

        {!!message.customFile && (
          <img
            className={`
             h-20 max-w-20 rounded-lg
        `}
            src={message.customFile.location}
          />
        )}

        <S.Topics>{topics}</S.Topics>

        <button
          className={`
          py-2.5 px-5 mr-2 mb-2 
          text-sm font-medium text-gray-900 focus:outline-none
        bg-white rounded-lg border border-gray-200 hover:bg-gray-100
        hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200
        dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400
        dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"`}
          onClick={() => editMessage}
        >
          Edit
        </button>

        <button
          className={`focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900`}
          onClick={() => deleteMessage(message)}
        >
          Delete
        </button>
      </Message>
    );
  }, []);
  return (
    <>
      <S.Container>
        <Button onClick={createMessage}>New Message</Button>
        {messages?.map((message, i) => renderMessage(message, i))}
      </S.Container>
    </>
  );
}
