import React, { useEffect } from "react";
import Head from "next/head";
import authService from "../../services/auth.service";
import { useRouter } from "next/router";
import NavBar from "../../components/NavBar";
import Onboarding from "../../components/AddToNewChannel";
import Sidebar from "../../components/Sidebar";

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
        <NavBar />
        <div className="flex">
          <Sidebar />
          <Onboarding />
        </div>
      </div>
    </>
  );
}
