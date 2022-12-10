import React, { useState, useEffect } from "react";
import "./globalStyles.css";
import type { AppProps } from "next/app";
import Script from "next/script";
import * as snippet from "@segment/snippet";
import authService from "../services/auth.service";
import Router, { useRouter } from "next/router";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import Loading, { LoadingProvider } from "../components/Loading";
import { ToastProvider } from "../components/Toast";
import { SettingsProvider } from "../services/setting.context";

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
      {!loading && (
        <DndProvider backend={HTML5Backend}>
          <LoadingProvider>
            <ToastProvider>
              <SettingsProvider>
                <Component {...pageProps} />
                <Loading />
              </SettingsProvider>
            </ToastProvider>
          </LoadingProvider>
        </DndProvider>
      )}
    </>
  );
}

export default App;
