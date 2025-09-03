"use client";

import { Provider } from "jotai";
import { ReactNode } from "react";

interface IJotaiProviderProps {
  children: ReactNode;
}

export const JotaiProvider = ({ children }: IJotaiProviderProps) => (
  <Provider>{children}</Provider>
);
