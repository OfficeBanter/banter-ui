import React, { useEffect } from "react";
import Head from "next/head";
import * as S from "./style";
import authService from "../../services/auth.service";
import { useRouter } from "next/router";
import { redirect } from "next/dist/server/api-utils";
import NavBar from "../../components/NavBar";
import Onboarding from "../../components/AddToNewChannel";
import Sidebar from "../../components/Sidebar";

export default function AuthPage({ message }) {
  const router = useRouter();

  useEffect(() => {
    if (!authService.getUser()) {
      router.replace("/");
    }
  }, []);

  return (
    <>
      <Head>
        <title>Banter Dashboard</title>
        <meta name="description" content="Login for Banter" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <S.Container>
        <NavBar />
        <Sidebar />
        <Onboarding style={{ gridArea: "main" }} />
      </S.Container>
    </>
  );
}
