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
      const data = await authService.signinToSlackWorkspace(code);
      console.log(data);
      if (data.error) {
        console.log(data.error, message);
        setMessage(data.error);
        return;
      }
      segmentService.trackSignIn();
      router.push("/dashboard");
    };
    setAuth();
  }, [router.query.code]);

  console.log(message);

  return <AuthPage message={message} />;
}
