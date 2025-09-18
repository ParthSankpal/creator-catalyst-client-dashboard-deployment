import { axiosClient } from "../utils/apiClient";



export const getRewardPageDetails  = async () => {
  const res = await axiosClient.get("/api/getRewardPageDetails");

  return res.data.data;
};



export const redeemReward = async (id) => {
  
  const res = await axiosClient.post(`/api/redeemRewardsById/${id}`);
  return res.data;
};
