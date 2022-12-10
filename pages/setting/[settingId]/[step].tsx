import React, { useEffect, useState } from "react";
import Head from "next/head";
import authService from "../../../services/auth.service";
import { useRouter } from "next/router";
import NavBar from "../../../components/NavBar";
import Sidebar from "../../../components/Sidebar";
import EditSetting from "../../../components/EditSetting";
import settingService from "../../../services/setting.service";
import Toast from "../../../components/Toast";

export default function AuthPage({ message }) {
  const router = useRouter();

  useEffect(() => {
    if (!authService.getUser()) {
      router.replace("/");
    }
  }, []);

  const [channels, setChannels] = useState(null);
  useEffect(() => {
    const getChannels = async () => {
      const channels = await settingService.getChannels();
      setChannels(
        channels.map(({ uniqueId, name, isPrivate, ...rest }) => ({
          ...rest,
          value: uniqueId,
          label: `${isPrivate ? "🔒" : ""}${name}`,
        }))
      );
    };
    getChannels();
  }, []);

  return (
    <>
      <Head>
        <title>Banter Dashboard</title>
        <meta name="description" content="Login for Banter" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Toast />
      <div
        style={{ gridTemplateRows: "80px auto 1fr" }}
        className="grid grid-cols-12 grid-rows-3 auto-rows-min"
      >
        <NavBar />
        <Sidebar />
        <EditSetting channels={channels} setChannels={setChannels} />
      </div>
    </>
  );
}
