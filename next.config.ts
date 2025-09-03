import type { NextConfig } from "next";
import { routes } from "./constants/route";

const nextConfig: NextConfig = {
  /* config options here */
  env: {
    REACT_APP_SERVER_ENDPOINT: process.env.REACT_APP_SERVER_ENDPOINT,
    JWT_SECRET: process.env.JWT_SECRET,
  },
  async redirects() {
    return [
      {
        source: "/",
        destination: routes.dashboard.index,
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
