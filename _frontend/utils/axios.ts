import axios from "axios";
import Cookies from "universal-cookie";

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
    const token = cookie.get(`x-token`);
    if (token) config.headers.Authorization = token;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
export default instance;
