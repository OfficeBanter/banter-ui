import React, { useEffect } from "react";
import Head from "next/head";
import authService from "../../services/auth.service";
import { useRouter } from "next/router";
import NavBar from "../../components/NavBar";
import Onboarding from "../../components/AddToNewChannel";
import Sidebar from "../../components/Sidebar";
import Toast from "../../components/Toast";
import { useSettings } from "../../services/setting.context";

export default function Dashboard() {
  const { settings } = useSettings();
  const router = useRouter();

  const showNav = settings && settings.length > 0;

  if (router.query.new === undefined && settings?.length) {
    router.replace({
      pathname: `/setting/${settings[0]._id}/overview`,
      query: router.query,
    });
    return;
  }
  const layout = showNav
    ? "grid grid-cols-12 grid-rows-3 auto-rows-min"
    : "grid grid-cols-9 grid-rows-3 auto-rows-min";

  return (
    <>
      <Head>
        <title>Banter Dashboard</title>
        <meta name="description" content="Banter Application" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Toast />
      <div
        style={{ gridTemplateRows: showNav ? "64px auto 1fr" : "auto" }}
        className={layout}
      >
        {showNav && (
          <>
            <NavBar />
            <Sidebar />
          </>
        )}
        <Onboarding />
      </div>
    </>
  );
}
