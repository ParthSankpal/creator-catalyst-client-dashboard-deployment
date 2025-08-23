
import { addAuthHeaderToAxios, axiosClient } from "./apiClient";
import { getCookie } from "./cookieHandler";

export const getUser = async () => {
  try {
    // Ensure auth header is always set
    const jwt = getCookie("jwt");
    if (!jwt) return null;
    addAuthHeaderToAxios(`Bearer ${jwt}`);

    // Use axiosClient (has baseURL + interceptors)
    const res = await axiosClient.get("/api/auth/getUser");

    return res.data.user;
  } catch (err) {
    console.error("Error fetching user:", err);
    return null;
  }
};
