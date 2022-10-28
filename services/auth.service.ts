import axios from "axios";

// decode jwt token
const decodeToken = (token: string) => {
  const base64Url = token.split(".")[1];
  const base64 = base64Url.replace("-", "+").replace("_", "/");
  return JSON.parse(window.atob(base64));
};

const USER_SCOPE = ["identity.basic"];
const SLACK_BOT_SCOPES = [
  "channels:history",
  "channels:join",
  "channels:manage",
  "channels:read",
  "chat:write",
  "groups:read",
  "im:history",
  "im:write",
  "users:read",
  "users:read.email",
];

const getSlackSignInUrl = (): string => {
  const params = new URLSearchParams({
    client_id: process.env.NEXT_PUBLIC_SLACK_CLIENT_ID as string,
    user_scope: USER_SCOPE.join(","),
    redirect_uri: process.env.NEXT_PUBLIC_SLACK_SIGN_IN_REDIRECT_URL as string,
  });

  return `${process.env.NEXT_PUBLIC_SLACK_AUTHORIZE_URL}?${params.toString()}`;
};

const getSlackAddUrl = () => {
  const params = new URLSearchParams({
    client_id: process.env.NEXT_PUBLIC_SLACK_CLIENT_ID as string,
    scope: SLACK_BOT_SCOPES.join(","),
    user_scope: USER_SCOPE.join(","),
    redirect_uri: process.env.NEXT_PUBLIC_SLACK_ADD_REDIRECT_URL as string,
  });

  return `${process.env.NEXT_PUBLIC_SLACK_AUTHORIZE_URL}?${params.toString()}`;
};

const addSlackWorkspace = async (code: string) => {
  const data: any = await axios.post(
    `${process.env.NEXT_PUBLIC_API_URL}/slack/add`,
    { code }
  );
  if (data.status) {
    const user = {
      token: data.token,
      team: data.team,
    };
    // this.setAuth(user);
    // this.segmentService.identifyUser();
  }

  return data;
};

const signinToSlackWorkspace = async (code: string) => {
  const data: any = await axios.post(
    `${process.env.NEXT_PUBLIC_API_URL}/slack/signin`,
    { code }
  );
  if (data.status) {
    const user = {
      token: data.token,
      team: data.team,
    };
    // this.setAuth(user);
    // this.segmentService.identifyUser();
  }

  return data;
};

export default {
  getSlackSignInUrl,
  addSlackWorkspace,
  signinToSlackWorkspace,
  getSlackAddUrl,
};
