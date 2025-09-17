import { axiosClient } from "../utils/apiClient";
import { removeCookie } from "../utils/cookieHandler";


export const startGoogle = () => {
  window.location.href = `${process.env.NEXT_PUBLIC_API_URL}/api/auth/google/start`;
};


export const getUser = async () => {
  const res = await axiosClient.get("/api/auth/getUser");
  // console.log("getUser response:", res);
  return res.data; // { user }
};


export const logout = async () => {
  try {
    await axiosClient.post("/api/auth/logout");
  } catch (err) {
    // Optional: log error, but don’t block logout
    console.warn("Logout API returned an error (probably 401):", err?.response?.status);
  } finally {
    // Remove client-side cookies anyway
    removeCookie("jwt");
    removeCookie("user");
  }
};


export const login = async (email, password) => {
  // kept from your pattern (if you have email/pwd path)
  const res = await axiosClient.post('/api/cms/auth/login', { email, password });
  return res.data;
};
