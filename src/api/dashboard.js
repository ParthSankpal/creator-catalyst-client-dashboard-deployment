// src/api/challenges.js
import { axiosClient } from "../utils/apiClient";

// get list of rewards creator earned
export const getCreatorRewards = async () => {
  const res = await axiosClient.get("/api/getCreatorRewards");
  return res.data;
};

// get leaderboad data
export const getLeaderboard = async (id) => {
  const res = await axiosClient.get(`/api/getLeaderboard`);
  return res.data;
};


export const getModules = async (id) => {
  const res = await axiosClient.post(`/api/getModules`);
  return res.data;
};

// ✅ Submit a challenge
export const submitChallenge = async (id, payload) => {
  const res = await axiosClient.post(`/api/challengeSubmit/${id}`, payload);
  return res.data;
};


export const getCreatorModules = async (id) => {
  const res = await axiosClient.get(`/api/getCreatorModules`);
  return res.data;
};

// ✅ Get all challenges created by the creator (progress tracking)
export const getCreatorChallenges = async () => {
  const res = await axiosClient.get(`/api/getCreatorChallenges`);
  return res.data;
};
