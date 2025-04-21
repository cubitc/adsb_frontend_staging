"use client";

import {
  QueryCache,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";

import { PropsWithChildren, useState } from "react";

const HttpProvider = ({ children }: PropsWithChildren) => {
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

        queryCache: new QueryCache({}),
      })
  );

  return (
    <QueryClientProvider client={client}>
      {children}
      {/* <ReactQueryDevtools initialIsOpen={false} buttonPosition="top-left" /> */}
    </QueryClientProvider>
  );
};

export default HttpProvider;
