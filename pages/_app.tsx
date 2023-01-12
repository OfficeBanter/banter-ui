import React, { useState, useEffect, ComponentType } from "react";
import "./globalStyles.css";
import type { AppProps } from "next/app";
import Script from "next/script";
import * as snippet from "@segment/snippet";
import authService from "../services/auth.service";
import { useRouter } from "next/router";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import Loading, { LoadingProvider } from "../components/Loading";
import { ToastProvider } from "../components/Toast";
import { SettingsProvider } from "../services/setting.context";
import Head from "next/head";
import { LDProvider } from "launchdarkly-react-client-sdk";

function App({ Component, pageProps }: AppProps) {
  const [user, setUser] = useState(null);

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
    authService.init();
    const user = authService.getUser();
    if (user) setUser(user);
    if (!router.pathname.includes("auth") && !authService.getUser()) {
      router.push("/");
    }
    setLoading(false);
  }, []);

  const shouldLDWrap = (child) => {
    if (user)
      return (
        <LDProvider
          clientSideID={
            process.env.NEXT_PUBLIC_LAUNCHDARKLY_SDK_CLIENT_SIDE_ID!
          }
          options={{
            streaming: true,
          }}
          context={{
            key: user?.id,
            ...(user || {}),
          }}
          deferInitialization={true}
        >
          {child}
        </LDProvider>
      );
    return child;
  };
  return (
    <>
      <Script
        dangerouslySetInnerHTML={{ __html: loadSegment() }}
        id="segmentScript"
      />
      <Head>
        <link rel="icon" type="image/x-icon" href="/favicon.ico" />
      </Head>
      {!loading && (
        <>
          {/* ^^^^^^^^^^^
            Loading provider must be outside of the settings provider
            because the settings provider uses the loading provider to
            get the launch darkly user. */}
          {shouldLDWrap(
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
      )}
    </>
  );
}

export default App;
