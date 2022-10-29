import React from "react";
import "./globalStyles.css";
import type { AppProps } from "next/app";
import Script from "next/script";
import * as snippet from "@segment/snippet";

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

  return (
    <>
      <Script
        dangerouslySetInnerHTML={{ __html: loadSegment() }}
        id="segmentScript"
      />
      <Component {...pageProps} />
    </>
  );
}

export default App;
