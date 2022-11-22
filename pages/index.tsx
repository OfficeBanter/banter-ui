import React from "react";
import Head from "next/head";
import * as S from "./style";
import authService from "../services/auth.service";
import { useRouter } from "next/router";

export default function AuthPage({ message }) {
  const router = useRouter();
  if (authService.getUser()) {
    router.replace("/dashboard");
  }
  return (
    <>
      <Head>
        <title>Lets Login to Banter</title>
        <meta name="description" content="Login for Banter" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <S.Container>
        <S.Nav>
          <S.NavList>
            <S.NavItem>
              <S.Logo src="/Banter_Logo.svg" />
            </S.NavItem>
            <S.NavItem>
              <S.SlackLogoLink href={authService.getSlackSignInUrl()}>
                <S.SlackSignin
                  height="40"
                  width="172"
                  alt="Sign in with Slack"
                  src="https://platform.slack-edge.com/img/sign_in_with_slack.png"
                  srcSet="https://platform.slack-edge.com/img/sign_in_with_slack.png    1x,
              https://platform.slack-edge.com/img/sign_in_with_slack@2x.png 2xs"
                />
              </S.SlackLogoLink>
            </S.NavItem>
          </S.NavList>
        </S.Nav>
        <S.Main>
          <S.Message>{message}</S.Message>
          <S.AddToSlackLink href={authService.getSlackSignInUrl()}>
            <S.AddToSlackButton
              alt="Add to Slack"
              height="40"
              width="139"
              src="https://platform.slack-edge.com/img/add_to_slack.png"
              srcSet="https://platform.slack-edge.com/img/add_to_slack.png 1x, https://platform.slack-edge.com/img/add_to_slack@2x.png 2x"
            />
          </S.AddToSlackLink>
        </S.Main>
      </S.Container>
    </>
  );
}
