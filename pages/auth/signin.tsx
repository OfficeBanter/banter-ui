import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import authService from "../../services/auth.service";
import AuthPage from "..";

export default function SigninRedirect() {
  const [message, setMessage] = useState("Redirecting to Slack...");
  const router = useRouter();
  console.log("fuck off");

  console.log(router.query);

  useEffect(() => {
    const setAuth = async () => {
      if (!router.query.code) return;
      console.log(router.query);
      const code = router.query.code;
      const { data } = await authService.signinToSlackWorkspace(code);
      setMessage(data.error);
    };
    setAuth();
  }, [router.query.code]);

  return <AuthPage message={message} />;
}

// constructor(
//   private authService: AuthService,
//   private segmentService: SegmentService,
//   private activatedRoute: ActivatedRoute
// ) {}

// ngOnInit(): void {
//   this.authService.add(code).subscribe((data) => {
//     if (data.status) {
//       this.router.navigate(['/dashboard']);
//       this.segmentService.trackSignUp();
//       this.segmentService.identifyWithSetting();
//     } else {
//       this.message = data.error;
//     }
//   });
