import { axiosClient } from "../utils/apiClient";

export const CreatorSubscribe = async (token) => {
  try {
    const formData = new URLSearchParams();
    formData.append("token", token);

    const res = await axiosClient.post(
      `/api/creator/subscribe`,
      formData.toString(), 
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    return res.data;
  } catch (err) {
    console.error("Error subscribing device:", err?.response?.data || err);
    throw err;
  }
};

export const CreatorUnsubscribe = async (token) => {
  try {
    const formData = new URLSearchParams();
    formData.append("token", token);

    const res = await axiosClient.post(
      `/api/creator/fcm/unsubscribe`,
      formData.toString(), 
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    return res.data;
  } catch (err) {
    console.error("Error unsubscribing device:", err?.response?.data || err);
    throw err;
  }
};
