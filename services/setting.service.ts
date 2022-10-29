import axios from "axios";
import authService from "./auth.service";

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

export default Object.freeze({
  getAllSettingsForWorkspace,
  getChannels,
});
