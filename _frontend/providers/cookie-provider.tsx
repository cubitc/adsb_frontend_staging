"use client";
import { PropsWithChildren } from "react";
import { CookiesProvider as Provider } from "react-cookie";
const CookiesProvider = ({ children }: PropsWithChildren) => {
  return <Provider>{children}</Provider>;
};

export default CookiesProvider;
