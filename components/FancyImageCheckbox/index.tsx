import React, { useEffect, useState } from "react";
import * as S from "./style";

export default function FancyImageCheckbox({
  title,
  description = null,
  image,
  checked,
  onChange,
}) {
  return (
    <S.Container>
      <S.Image src={image} />
      <S.Title>{title}</S.Title>
      <S.Description>{description}</S.Description>
      <S.Checkbox checked={checked} onChange={onChange} />
    </S.Container>
  );
}
