import { axiosClient } from "../utils/apiClient";

// ✅ Get all modules
export const getModules = async () => {
  const res = await axiosClient.get("/api/getModules");
  return res.data;
};

// ✅ Get single module by ID
export const getModuleById = async (id) => {
  const res = await axiosClient.get(`/api/getModuleById/${id}`);
  return res.data;
};

// ✅ Start a module (creator)
export const startModule = async (id) => {
  const res = await axiosClient.post(`/api/moduleStart/${id}`);
  return res.data;
};

// ✅ Mark a module as completed
export const completeModule = async (id) => {
  const res = await axiosClient.post(`/api/moduleComplete/${id}`);
  return res.data;
};

// ✅ Submit YouTube links for a module
export const submitModule = async (id, url) => {
  const formData = new URLSearchParams();
  formData.append("submission", url);

  const res = await axiosClient.post(`/api/moduleSubmit/${id}`, formData, {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  });
  return res.data;
};


// ✅ Get all submissions of a challenge (for creator)
export const getCreatorModulSubmissions = async (id) => {
  const res = await axiosClient.get(
    `/api/getCreatorSubmissionsById/${id}?submission_type=module`
  );
  return res.data;
};

// ✅ Get all modules created by the creator (progress tracking)
export const getCreatorModules = async () => {
  const res = await axiosClient.get(`/api/getCreatorModules`);
  return res.data;
};
