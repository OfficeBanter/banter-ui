import { Button, Modal } from "flowbite-react";
import React, { useState } from "react";
import Select from "react-select";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { useSettings } from "../../../services/setting.context";

export default function ChannelSelectContainer({
  slackChannel,
  setSlackChannel,
  channels,
  deleteChannel,
  disabled,
}) {
  const { settings } = useSettings();
  const [isDeleteConfirmationModalOpen, setIsDeleteConfirmationModalOpen] =
    useState(false);
  const openDeleteConfirmationModal = () => {
    setIsDeleteConfirmationModalOpen(true);
  };

  const channelsInUse = new Set(
    settings?.map((setting) => setting.channel?.uniqueId)
  );
  return (
    <div className="flex flex-col space-y-4 align-middle justify-center w-[40vw]">
      <h1 className="text-center text-2xl font-bold">
        Pick the channel you want to add Banter
      </h1>
      <p className="text-center text-lg">
        We recommend adding Banter to a channel that is already used for small
        talk and getting to know each other. #random or #general are usually
        good fits.
      </p>
      <Select
        classNamePrefix="select"
        isLoading={!channels}
        isClearable={false}
        isSearchable={true}
        isDisabled={disabled}
        name="channels"
        options={
          channels?.filter(({ value }) => !channelsInUse.has(value)) || []
        }
        value={slackChannel}
        onChange={(channel) =>
          setSlackChannel({
            ...channel,
            uniqueId: channel.value,
            name: channel.label,
          })
        }
      />
      <p className="text-center whitespace-pre-wrap">
        Don't see your private channel? Go to the Slack channel you'd like to
        set up Banter in, type
        <strong className="text-lg block pt-4">/invite @BanterBot</strong>
      </p>
      {!!deleteChannel && (
        <Button
          color="bg-none underline"
          className="w-48 self-center"
          onClick={() => openDeleteConfirmationModal()}
        >
          Delete Channel
        </Button>
      )}
      <Modal
        show={isDeleteConfirmationModalOpen}
        onClose={() => setIsDeleteConfirmationModalOpen(false)}
      >
        <Modal.Body>
          <div className="text-center">
            <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
              Are you sure you want to delete this channel?
            </h3>
            <div className="flex justify-center gap-4">
              <Button color="failure" onClick={deleteChannel}>
                Yes, I'm sure
              </Button>
              <Button
                color="gray"
                onClick={() => setIsDeleteConfirmationModalOpen(false)}
              >
                No, cancel
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
}
