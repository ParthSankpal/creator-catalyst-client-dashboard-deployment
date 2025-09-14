import { axiosClient } from "../utils/apiClient";

export const CreatorSubscribe = async (token) => {
  try {
    console.log("Device token to subscribe:", token);
    const res = await axiosClient.post(
      `/api/creator/subscribe`,
      token,
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    console.log("Subscription response:", res.data);
    return res.data;
  } catch (err) {
    console.error("Error subscribing device:", err);
    throw err;
  }
};
