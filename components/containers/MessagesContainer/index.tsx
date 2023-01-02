import React, { useCallback, useState } from "react";
import { Message } from "./Message";
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

import {
  HiOutlineExclamationCircle,
  HiOutlineClock,
  HiOutlineCamera,
  HiPlusCircle,
  HiOutlineTrash,
  HiPencil,
} from "react-icons/hi";
import { Modal, Badge } from "flowbite-react";
import { useSettings } from "../../../services/setting.context";

const widths = "w-[30vw]";
export default function MessagesContainer({
  disabled,
  messages,
  messagesDropped,
  runDeleteMessage,
  editMessage,
  createMessage,
}) {
  const renderMessage = useCallback((message, index: number) => {
    const scheduledDateRaw = new Date(message.scheduledOn);
    const topics = message?.message?.tags.map(({ name }) => name);

    return (
      <Message
        key={message._id}
        disabled={disabled}
        className="flex flex-1"
        id={message._id}
      >
        <div
          onClick={() => editMessage(message)}
          key={message._id}
          className={`
        flex flex-row items-center
       hover:bg-gray-100 dark:border-gray-700
         dark:bg-gray-800 dark:hover:bg-gray-700`}
        >
          <p
            className={`w-28 flex-none ${
              message.scheduledMessageId && "font-bold"
            } tracking-tight text-gray-900 dark:text-white`}
          >
            {scheduledDateRaw.toLocaleDateString("en-US", {
              weekday: "short",
              month: "short",
              day: "numeric",
            })}
          </p>
          <p
            className={`font-normal truncate text-gray-700 dark:text-gray-400 flex-grow ${widths}`}
          >
            {message.customMessage}
          </p>
          {message.customFile && (
            <Badge className="mx-2" color="failure">
              <HiOutlineCamera />
            </Badge>
          )}
          <div
            className={`${!message.customFile && "ml-[44px]"} w-36 flex-none`}
          >
            {topics?.map((topic) => (
              <p key={topic} className="text-xs">
                {topic}
              </p>
            ))}
          </div>
          <HiPencil className="text-gray-600 mr-2" />
          <button
            className={`h-10 w-8 flex-none focus:outline-none flex items-center justify-center
               text-white hover:bg-red-100 focus:ring-4
                focus:ring-red-300 font-mediumtext-sm`}
            onClick={(e) => {
              e.stopPropagation();
              setDeleteMessage(message);
            }}
          >
            <HiOutlineTrash className="text-gray-600" />
          </button>
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

    if (active.id !== over.id) {
      const oldIndex = messages.map((i) => i._id).indexOf(active.id);
      const newIndex = messages.map((i) => i._id).indexOf(over.id);
      messagesDropped(oldIndex, newIndex, messages[oldIndex]._id);
    }
  }
  const [deleteMessage, setDeleteMessage] = useState(null);

  return (
    <div className="col-span-8">
      <div className="flex flex-row justify-between">
        <h2 className="text-2xl font-bold pb-12 text-gray-900">
          {`The next ${messages.length} upcoming Banter messages`}
        </h2>
        <Button
          disabled={disabled}
          className="rounded-full bg-lime-600 hover:bg-lime-800 text-xl"
          onClick={createMessage}
        >
          <HiPlusCircle className="mr-2" />
          Add your own message!
        </Button>
      </div>

      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <div className="divide-y divide-gray-200 select-none">
          <div
            className={`
        flex flex-row items-center`}
          >
            <p className="w-28 flex-none font-bold tracking-tight text-gray-900 dark:text-white">
              Date
            </p>
            <p className={`font-bold ${widths}`}>Message</p>
            <div className="ml-[44px] w-36 flex-none font-bold">Topics</div>
          </div>
          {/* items is a list of unique identifiers, if you do not set it to the
            ids, then you do not get the correct output */}
          <SortableContext
            items={messages.map((message) => message._id)}
            strategy={verticalListSortingStrategy}
          >
            {messages?.map((message, i) => renderMessage(message, i))}
          </SortableContext>
        </div>
      </DndContext>
      <Modal show={deleteMessage} onClose={() => setDeleteMessage(null)}>
        <Modal.Body>
          <div className="text-center">
            <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
              Are you sure you want to delete this message?
            </h3>
            <div className="flex justify-center gap-4">
              <Button
                color="failure"
                onClick={() => {
                  runDeleteMessage(deleteMessage);
                  setDeleteMessage(null);
                }}
              >
                Yes, I&apos;m sure
              </Button>
              <Button color="gray" onClick={() => setDeleteMessage(null)}>
                No, cancel
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
}
