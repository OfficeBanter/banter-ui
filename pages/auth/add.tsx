import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import authService from "../../services/auth.service";
import AuthPage from "..";
import segmentService from "../../services/segment.service";

export default function SigninRedirect() {
  const [message, setMessage] = useState("Redirecting to Slack...");
  const router = useRouter();

  useEffect(() => {
    const setAuth = async () => {
      if (!router.query.code) return;
      const code = router.query.code;
      const data = await authService.addSlackWorkspace(code);
      if (data.error) {
        setMessage(data.error);
        return;
      }
      segmentService.track("sign_up");
      router.reload();
    };
    setAuth();
  }, [router.query.code]);

  return <AuthPage message={message} />;
}
