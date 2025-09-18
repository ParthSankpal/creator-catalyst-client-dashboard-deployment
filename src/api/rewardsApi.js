import { axiosClient } from "../utils/apiClient";



export const getRewardPageDetails  = async () => {
  const res = await axiosClient.get("/api/getRewardPageDetails");

  return res.data.data;
};
