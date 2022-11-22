import React, { useEffect, useState } from "react";
import FancyImageCheckbox from "../../FancyImageCheckbox";
import * as S from "./style";
import { TAGS } from "../../Constants/tags.ts";

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
    <S.Container>
      <S.Heading>What kinds of Banter do you want?</S.Heading>
      <S.Description>
        Banter has several kinds of topics to initiate, from fun and light to
        deeper topics to really get to know your teammates. We recommend leaving
        them all on to get a feel for them
      </S.Description>
      <S.Description>
        Banter works best when all topics are enabled.
      </S.Description>
      {TAGS.map((tag) => {
        return (
          <FancyImageCheckbox
            key={tag._id}
            title={tag.name}
            image={tag.img}
            checked={tags.includes(tag._id)}
            onChange={(e) => toggleTags(tag._id)}
          />
        );
      })}
    </S.Container>
  );
}
