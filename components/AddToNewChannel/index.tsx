import React, { useEffect, useState } from "react";
import Head from "next/head";
import * as S from "./style";
import settingService from "../../services/setting.service";
import Button from "../Button";
import ChannelSelectContainer from "../containers/ChannelSelectContainer";
import SetTopicContainer from "../containers/SetTopicContainer";

export default function Onboarding({}) {
  const [step, setStep] = useState(0);
  useEffect(() => {
    if (step === -1) {
      setStep(0);
    }
    if (step > 3) {
      // TODO send this shit to the server
    }
  }, [step]);

  return (
    <S.Container>
      {step <= 0 && <ChannelSelectContainer />}
      {step === 1 && <SetTopicContainer />}
      <Button onClick={() => setStep(step - 1)}> Previous </Button>
      <Button onClick={() => setStep(step + 1)}> Next </Button>
    </S.Container>
  );
}
