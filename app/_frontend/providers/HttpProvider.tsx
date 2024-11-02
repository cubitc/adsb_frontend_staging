"use client";

import { LOGIN_ROUTE } from "@/app/constants/route";
import {
  QueryCache,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { AxiosError } from "axios";

import { usePathname, useRouter } from "next/navigation";
import { PropsWithChildren, useState } from "react";
import { useCookies } from "react-cookie";

const HttpProvider = ({ children }: PropsWithChildren) => {
  const [, , removeCookie] = useCookies(["x-token"]);
  const pathname = usePathname();
  const router = useRouter();

  const [client] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            refetchOnWindowFocus: true,
            refetchOnMount: true,

            refetchOnReconnect: false,
            staleTime: 0,
            gcTime: 0,
            retry: 0,
          },
        },

        queryCache: new QueryCache({
          onError: (error) => {
            const axiosError = error as AxiosError;

            if (axiosError.response?.status === 401) {
              removeCookie("x-token", { path: "/" });
              let redirect = LOGIN_ROUTE;
              if (pathname !== "/") {
                redirect += `?next=${pathname}`;
              }
              router.replace(redirect);
            }
          },
        }),
      })
  );

  return (
    <QueryClientProvider client={client}>
      {children}
      <ReactQueryDevtools initialIsOpen={false} buttonPosition="top-left" />
    </QueryClientProvider>
  );
};

export default HttpProvider;
