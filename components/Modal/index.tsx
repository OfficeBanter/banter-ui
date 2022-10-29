import React, { useEffect, useState } from "react";
import * as S from "./style";
import settingService from "../../services/setting.service";

export default function Button({ ...props }) {
  return <S.Button {...props} />;
}
