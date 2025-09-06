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

// ✅ Submit a challenge
export const submitChallenge = async (id, payload) => {
  const res = await axiosClient.post(`/api/challengeSubmit/${id}`, payload);
  return res.data;
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
