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

const saveSetting = async (setting) => {
  const { data } = await axios.put(
    `${process.env.NEXT_PUBLIC_API_URL}/setting/${setting._id}`,
    setting
  );
  return data;
};

const getSetting = async (settingId: string) => {
  const { data } = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/setting/${settingId}`
  );
  return data;
};

const reorderMessages = async (
  from: number,
  to: number,
  settingId: string,
  messageId: string
) => {
  const { data } = await axios.post(
    `${process.env.NEXT_PUBLIC_API_URL}/setting/${settingId}/reorder-message-schedule/${messageId}`,
    { from, to }
  );
  return data;
};

const deleteMessage = async (messageId: string, settingId: string) => {
  const { data } = await axios.delete(
    `${process.env.NEXT_PUBLIC_API_URL}/setting/${settingId}/delete-message-schedule/${messageId}`
  );
  return data;
};

interface CreateNewMessage {
  message: string;
  file: string;
}
const createNewMessage = async (
  settingId: string,
  { message, file }: CreateNewMessage
) => {
  const formData = new FormData();

  formData.append("file", file);
  formData.append("message", message);
  const { data } = await axios.post(
    `${process.env.NEXT_PUBLIC_API_URL}/setting/${settingId}/create-message-schedule`,
    formData
  );
  return data;
};

const updateMessage = async (
  settingId: string,
  { message, file }: CreateNewMessage
) => {
  const formData = new FormData();

  if (file) formData.append("file", file);
  formData.append("message", message);
  const { data } = await axios.put(
    `${process.env.NEXT_PUBLIC_API_URL}/setting/${settingId}/update-message-schedule/${message._id}`,
    formData
  );
  return data;
};

export default Object.freeze({
  getAllSettingsForWorkspace,
  getChannels,
  getTimezones,
  createSetting,
  saveSetting,
  getSetting,
  reorderMessages,
  deleteMessage,
  createNewMessage,
  updateMessage,
});
