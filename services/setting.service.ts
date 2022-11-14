import axios from "axios";
import authService from "./auth.service";

/// XXX I think we should setup axios to not use the token automatically
/// When we use the token automatically it exposes the auth to every endpoint
/// that we use. We should only use the token when we need it.
const getAllSettingsForWorkspace = async () => {
  const { data } = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/setting`
  );

  return data;
};

const getChannels = async () => {
  const { data } = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/channel/list`
  );

  return data;
};

const getTimezones = async () => {
  const { data } = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/timezone/list`
  );
  return data;
};

const createSetting = async (setting) => {
  const { data } = await axios.post(
    `${process.env.NEXT_PUBLIC_API_URL}/setting`,
    setting
  );
  return data;
};

export default Object.freeze({
  getAllSettingsForWorkspace,
  getChannels,
  getTimezones,
  createSetting,
});
