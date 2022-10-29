import React, { useEffect, useState } from "react";
import * as S from "./style";

export default function SetTopicContainer({}) {
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
    </S.Container>
  );
}
