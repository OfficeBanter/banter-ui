import React, { useEffect, useState, useCallback } from "react";
import { TAGS, TEAM_AWARDS } from "../../Constants/tags";
import { Checkbox, Label, Modal } from "flowbite-react";
import { useFlags } from "launchdarkly-react-client-sdk";

export default function SetTagsContainer({
  tags,
  setTags,
  disabled,
}: {
  tags: string[];
  setTags: (tags: string[]) => void;
  disabled?: boolean;
}) {
  const flags = useFlags();

  const escFunction = useCallback((event) => {
    if (event.key === "Escape") {
      setModalState(null);
    }
  }, []);

  useEffect(() => {
    document.addEventListener("keydown", escFunction, false);

    return () => {
      document.removeEventListener("keydown", escFunction, false);
    };
  }, []);

  const toggleTags = (tag: string) => {
    const newTags = tags.filter((t) => t !== tag);
    if (newTags.length === tags.length) {
      newTags.push(tag);
    }
    setTags(newTags);
  };

  const [modalState, setModalState] = useState(null);
  const toggleImageModal = (tag) => {
    setModalState(tag);
  };

  return (
    <div className="flex flex-col space-y-4 w-[40vw]">
      <h1 className="text-2xl text-center font-bold">
        What kinds of Banter do you want?
      </h1>
      <p className="text-md text-center text-lg">
        Banter has several kinds of topics to initiate, from fun and light to
        deeper topics to really get to know your teammates. We recommend leaving
        them all on to get a feel for them
      </p>
      <p className="text-m text-center">
        Banter works best when all topics are enabled.
      </p>
      {TAGS.filter((tag) => {
        return flags.teamAwards || tag.name !== TEAM_AWARDS;
      }).map((tag) => {
        return (
          <React.Fragment key={tag._id}>
            <div className="flex items-center gap-2 disabled:">
              <Checkbox
                disabled={disabled}
                id={tag.name}
                checked={tags.includes(tag._id)}
                onChange={(e) => toggleTags(tag._id)}
              />
              <img className="h-6" alt={tag.description} src={tag.img} />
              <Label className="text-lg" htmlFor={tag.name}>
                {tag.name}
              </Label>
              <button onClick={() => toggleImageModal(tag)}>
                (See Example)
              </button>
            </div>
          </React.Fragment>
        );
      })}

      <Modal
        className="z-40"
        onClick={() => setModalState(null)}
        aria-hidden="true"
        onClose={() => setModalState(null)}
        show={!!modalState}
      >
        <div className="p-8">
          <p className="text-l text-center font-bold">
            {modalState?.description}
          </p>

          <img
            className="max-w-full h-auto"
            alt={modalState?.description}
            src={modalState?.preview}
          />
        </div>
      </Modal>
    </div>
  );
}
