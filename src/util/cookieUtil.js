import { Cookies } from "react-cookie";

const cookies = new Cookies();

export const setCookie = (name, value, days = 1) => {
  if (days === 0) {
    return cookies.set(name, value, { path: "/" });
  }
  const expires = new Date();
  expires.setUTCDate(expires.getUTCDate() + days); // 보관기한

  return cookies.set(name, value, { path: "/", expires: expires });
};

export const getCookie = (name) => {
  return cookies.get(name);
};

export const removeCookie = (name, path = "/") => {
  return cookies.remove(name, { path: path });
};
