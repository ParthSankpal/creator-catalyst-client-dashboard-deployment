import { axiosClient } from "../utils/apiClient";


// ✅ Get all rewards
export const getRewardPageDetails  = async () => {
  const res = await axiosClient.get("/api/getRewardPageDetails");
  return res.data.data;
};
