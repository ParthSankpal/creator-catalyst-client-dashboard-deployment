// src/api/challenges.js
import { axiosClient } from "../utils/apiClient";

// ✅ Get all challenges
export const getChallenges = async () => {
  const res = await axiosClient.get("/api/getChallenges");
  return res.data;
};

// ✅ Get single challenge by ID
export const getChallengeById = async (id) => {
  const res = await axiosClient.get(`/api/getChallengeById/${id}`);
  return res.data;
};

// ✅ Start a challenge (creator)
export const startChallenge = async (id) => {
  const res = await axiosClient.post(`/api/challengeStart/${id}`);
  return res.data;
};

export const submitChallenge = (id, payload) => {
  return axiosClient.post(`/api/challengeSubmit/${id}`, payload, {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  });
};


// ✅ Get all submissions of a challenge (for creator)
export const getCreatorChallengeSubmissions = async (id) => {
  const res = await axiosClient.get(`/api/getCreatorChallengeSubmissions/${id}`);
  return res.data;
};

// ✅ Get all challenges created by the creator (progress tracking)
export const getCreatorChallenges = async () => {
  const res = await axiosClient.get(`/api/getCreatorChallenges`);
  return res.data;
};
