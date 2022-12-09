import React, { useEffect, useState, useCallback } from "react";
import Head from "next/head";
import { Message } from "./Message";
import update from "immutability-helper";
import settingService from "../../../services/setting.service";
import { Button } from "flowbite-react";
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
    const topics = message?.message?.tags.map(({ name }) => name);

    return (
      <Message
        className="max-w-full mb-4"
        index={index}
        id={message._id}
        moveMessage={moveMessage}
        onDropped={messagesDropped}
      >
        <div
          key={message._id}
          className={`
        flex flex-col items-center bg-white border rounded-lg shadow-md 
        md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700
         dark:bg-gray-800 dark:hover:bg-gray-700`}
        >
          <img
            className="h-full max-w-[120px] min-w-[120px] object-cover rounded-lg"
            src={`${
              message?.customFile?.location ||
              "https://cdn.vectorstock.com/i/1000x1000/65/35/no-picture-icon-editable-line-vector-30386535.webp"
            }`}
          />
          <div className="w-full flex flex-2 flex-col justify-between p-4 leading-normal">
            <p className="mb-2 font-bold tracking-tight text-gray-900 dark:text-white">
              {scheduledDateRaw.toLocaleDateString("en-US", {
                weekday: "short",
                month: "short",
                day: "numeric",
              })}
            </p>
            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
              {message.customMessage}
            </p>
            <div>
              {topics?.map((topic) => (
                <p className="text-xs">{topic}</p>
              ))}
            </div>
          </div>

          <div className="pr-8">
            <button
              className={`
              w-full
              py-2.5 px-5 mr-2 mb-2 
              text-sm font-medium text-gray-900 focus:outline-none
            bg-white rounded-lg border border-gray-200 hover:bg-gray-100
            hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200
            dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400
            dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"`}
              onClick={() => editMessage(message)}
            >
              Edit
            </button>
            <button
              className={`w-full focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900`}
              onClick={() => deleteMessage(message)}
            >
              Delete
            </button>
          </div>
        </div>
      </Message>
    );
  }, []);
  return (
    <div className="max-w-full height-full">
      <Button className="float-right" onClick={createMessage}>
        New Message
      </Button>
      {messages?.map((message, i) => renderMessage(message, i))}
    </div>
  );
}
