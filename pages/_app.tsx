import React, { useState, useEffect } from "react";
import "./globalStyles.css";
import type { AppProps } from "next/app";
import Script from "next/script";
import * as snippet from "@segment/snippet";
import authService from "../services/auth.service";
import Router, { useRouter } from "next/router";

function App({ Component, pageProps }: AppProps) {
  const loadSegment = () => {
    const options = {
      apiKey: process.env.NEXT_PUBLIC_SEGMENT_WRITE_KEY,
    };
    if (process.env.NEXT_PUBLIC_NODE_ENV) {
      return snippet.max(options);
    } else {
      return snippet.min(options);
    }
  };
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  useEffect(() => {
    if (!authService.getUser()) {
      router.push("/");
    }
    authService.init();
    setLoading(false);
  }, []);

  return (
    <>
      <Script
        dangerouslySetInnerHTML={{ __html: loadSegment() }}
        id="segmentScript"
      />
      {!loading && <Component {...pageProps} />}
    </>
  );
}

export default App;
