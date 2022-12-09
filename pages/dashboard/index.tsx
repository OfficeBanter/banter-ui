import React, { useEffect } from "react";
import Head from "next/head";
import authService from "../../services/auth.service";
import { useRouter } from "next/router";
import NavBar from "../../components/NavBar";
import Onboarding from "../../components/AddToNewChannel";
import Sidebar from "../../components/Sidebar";
import Toast from "../../components/Toast";

export default function Dashboard() {
  const router = useRouter();

  useEffect(() => {
    if (!authService.getUser()) {
      router.replace("/");
      return;
    }
  }, []);

  return (
    <>
      <Head>
        <title>Banter Dashboard</title>
        <meta name="description" content="Banter Application" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div>
        <Toast />
        <NavBar />
        <div className="flex h-full">
          <Sidebar />
          <Onboarding />
        </div>
      </div>
    </>
  );
}
