import { axiosClient } from "../utils/apiClient";

export const getLeaderboard = async () => {
  const res = await axiosClient.get("/api/getLeaderboard");
  // console.log("getUser response:", res.data);
  return res.data; // { user }
};