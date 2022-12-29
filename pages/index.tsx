import React, { useState } from "react";
import Head from "next/head";
import authService from "../services/auth.service";
import { Navbar } from "flowbite-react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function AuthPage({ message }) {
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  useEffect(() => {
    if (authService.getUser()) {
      router.push("/dashboard");
      return;
    }
    setLoading(false);
  }, []);

  if (loading) return;

  return (
    <>
      <Head>
        <title>Lets Login to Banter</title>
        <meta name="description" content="Login for Banter" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="h-screen">
        <Navbar className="bg-rose-50 rounded-none" fluid={true} rounded={true}>
          <Navbar.Brand href="/">
            <img
              src="/Banter_Logo.svg"
              className="mr-3 h-10 md:h-12"
              alt="Banter Logo"
            />
          </Navbar.Brand>
          <Link href={authService.getSlackSignInUrl()}>
            <img
              className="h-10"
              alt="Sign in with Slack"
              src="https://platform.slack-edge.com/img/sign_in_with_slack.png"
              srcSet="https://platform.slack-edge.com/img/sign_in_with_slack.png    1x,
              https://platform.slack-edge.com/img/sign_in_with_slack@2x.png 2xs"
            />
          </Link>
        </Navbar>
        <div
          className={`
          flex justify-center items-center h-full flex-col
        `}
        >
          <p className="text-lg font-bold mb-8">{message}</p>
          <Link href={authService.getSlackAddUrl()}>
            <img
              alt="Add to Slack"
              height="40"
              width="139"
              src="https://platform.slack-edge.com/img/add_to_slack.png"
              srcSet="https://platform.slack-edge.com/img/add_to_slack.png 1x, https://platform.slack-edge.com/img/add_to_slack@2x.png 2x"
            />
          </Link>
        </div>
      </div>
    </>
  );
}
