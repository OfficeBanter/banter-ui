import React, { useEffect, useState } from "react";
import { TAGS } from "../../Constants/tags.ts";
import { Checkbox, Label } from "flowbite-react";

export default function SetTagsContainer({
  tags,
  setTags,
}: {
  tags: string[];
  setTags: (tags: string[]) => void;
}) {
  const toggleTags = (tag: string) => {
    const newTags = tags.filter((t) => t !== tag);
    if (newTags.length === tags.length) {
      newTags.push(tag);
    }
    setTags(newTags);
  };

  return (
    <div>
      <h1>What kinds of Banter do you want?</h1>
      <p>
        Banter has several kinds of topics to initiate, from fun and light to
        deeper topics to really get to know your teammates. We recommend leaving
        them all on to get a feel for them
      </p>
      <p>Banter works best when all topics are enabled.</p>
      {TAGS.map((tag) => {
        return (
          <div className="flex items-center gap-2">
            <Checkbox id={tag.name} onChange={(e) => toggleTags(tag._id)} />
            <Label htmlFor={tag.name}>{tag.name}</Label>
          </div>
        );
      })}
    </div>
  );
}
