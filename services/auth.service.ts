import axios from "axios";

const VERSION = "v1";

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
  const { data } = await axios.post(
    `${process.env.NEXT_PUBLIC_API_URL}/slack/add`,
    { code }
  );
  if (data.status) {
    setToken(data.token);
  }

  return data;
};

const signinToSlackWorkspace = async (code: string) => {
  const { data } = await axios.post(
    `${process.env.NEXT_PUBLIC_API_URL}/slack/signin`,
    { code }
  );

  if (data.status) {
    setToken(data.token);
  }

  return data;
};

interface User {
  email: string;
  id: string;
  isAdmin: string;
  isSuperAdmin: string;
  name: string;
  stripeCustomerId: string;
  teamId: string;
  workspace: string;
  workspaceId: string;
}

const getUser = (): User | null => {
  const token = getToken();
  if (!token) return null;
  const data = decodeToken(token);
  return data ? data.sub : null;
};

const getToken = (): string => {
  return window?.localStorage?.getItem("token") || "";
};

const init = () => {
  if (window?.localStorage?.getItem("banter_version") !== VERSION) {
    // logout user
    window?.localStorage?.getItem("banter_version");
    window?.localStorage?.setItem("banter_version", VERSION);
    logoutUser();
    return;
  }
  const token = getToken();
  axios.defaults.headers.common = {
    Authorization: `Bearer ${token}`,
  };
};

const setToken = (token: string) => {
  window.localStorage.setItem("token", token);
  init();
};

const logoutUser = () => {
  localStorage.removeItem("token");
  // @ts-ignore
  window.location = "/";
};

export default {
  getSlackSignInUrl,
  addSlackWorkspace,
  signinToSlackWorkspace,
  getSlackAddUrl,
  getUser,
  getToken,
  setToken,
  init,
  logoutUser,
};
