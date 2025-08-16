import Cookies from "js-cookie";

export const getCookie = (key) => {
  if (typeof window === "undefined") return null;
  return Cookies.get(key) || null;
};

export const setCookie = (key, value, options = {}) => {
  if (typeof window === "undefined") return;
  Cookies.set(key, value, { expires: 7, ...options });
};

export const removeCookie = (key) => {
  if (typeof window === "undefined") return;
  if (key) {
    Cookies.remove(key);
  } else {
    // remove all cookies if key not given
    Object.keys(Cookies.get()).forEach((cookieName) => {
      Cookies.remove(cookieName);
    });
  }
};
