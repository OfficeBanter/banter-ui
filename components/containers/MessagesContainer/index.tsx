import React, { useCallback } from "react";
import { Message } from "./Message";
import update from "immutability-helper";
import { Button } from "flowbite-react";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from "@dnd-kit/core";
import {
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
export default function MessagesContainer({
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
      <Message className="max-w-full mb-4" id={message._id}>
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
                <p key={topic} className="text-xs">
                  {topic}
                </p>
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

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    console.log();

    if (active.id !== over.id) {
      const oldIndex = messages.map((i) => i._id).indexOf(active.id);
      const newIndex = messages.map((i) => i._id).indexOf(over.id);
      console.log(oldIndex, newIndex);
      messagesDropped(oldIndex, newIndex, messages[oldIndex]._id);
    }
  }

  return (
    <div className="max-w-full height-full">
      <Button className="float-right" onClick={createMessage}>
        New Message
      </Button>

      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        {/* items is a list of unique identifiers, if you do not set it to the
            ids, then you do not get the correct output */}
        <SortableContext
          items={messages.map((message) => message._id)}
          strategy={verticalListSortingStrategy}
        >
          {messages?.map((message, i) => renderMessage(message, i))}
        </SortableContext>
      </DndContext>
    </div>
  );
}
