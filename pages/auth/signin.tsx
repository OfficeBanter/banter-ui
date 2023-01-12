import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import authService from "../../services/auth.service";
import AuthPage from "..";
import segmentService from "../../services/segment.service";
import { useSettings } from "../../services/setting.context";

export default function SigninRedirect() {
  const [message, setMessage] = useState("Redirecting to Slack...");
  const router = useRouter();
  const { getSettings } = useSettings();

  useEffect(() => {
    const setAuth = async () => {
      if (!router.query.code) return;

      const code = router.query.code;
      const data = await authService.signinToSlackWorkspace(code);
      if (data.error) {
        setMessage(data.error);
        return;
      }
      await getSettings();
      segmentService.track("log_in");

      router.reload();
    };
    setAuth();
  }, [router.query.code]);

  return <AuthPage message={message} />;
}
