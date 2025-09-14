import { axiosClient } from "../utils/apiClient";

export const CreatorSubscribe = async (token) => {
  try {
    const res = await axiosClient.post(`/api/creator/subscribe`, {
      token
    });
    return res.data;
  } catch (err) {
    console.error("Error subscribing device:", err);
    throw err;
  }
};
