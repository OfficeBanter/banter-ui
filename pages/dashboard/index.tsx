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
  console.log("dashboard");

  const { settings } = useSettings();

  const showSidebar = settings && settings.length > 0;
  const layout = showSidebar
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
        style={{ gridTemplateRows: showSidebar ? "64px auto 1fr" : "auto" }}
        className={layout}
      >
        <NavBar />
        {showSidebar && <Sidebar />}
        <Onboarding />
      </div>
    </>
  );
}
