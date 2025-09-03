import { routes } from "@/constants/route";
import axios from "axios";
import toast from "react-hot-toast";
import Cookies from "universal-cookie";
import { cookieName } from "../enums/cookie";

const cookie = new Cookies();

const instance = axios.create({
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
  baseURL: `${process.env.REACT_APP_SERVER_ENDPOINT}/api`,
});

instance.interceptors.request.use(
  (config) => {
    const token = cookie.get(cookieName.x_token);
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
instance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      toast.error("Session expired. Please login again.");
      localStorage.clear();
      cookie.remove(cookieName.x_token, { path: "/" });

      // Redirect to login page
      if (typeof window !== "undefined") {
        console.log("Redirecting to login page due to 401 error");
        window.location.href = routes.auth.login;
      }
    }

    return Promise.reject(error);
  }
);
export default instance;
