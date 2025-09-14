import { axiosClient } from "../utils/apiClient";

export const CreatorSubscribe = async (token) => {
  try {
    const res = await axiosClient.post(
      `/api/creator/subscribe`,
      token,
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );
    return res.data;
  } catch (err) {
    console.error("Error subscribing device:", err);
    throw err;
  }
};
