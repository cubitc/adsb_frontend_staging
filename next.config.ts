import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  env: {
    REACT_APP_SERVER_ENDPOINT: process.env.REACT_APP_SERVER_ENDPOINT,
    JWT_SECRET: process.env.JWT_SECRET,
  },
};

export default nextConfig;
