/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/rules-of-hooks */
import { LOGIN_PATH } from "@/constants/api";
import {
  useMutation,
  UseMutationOptions,
  useQuery,
  UseQueryOptions,
} from "@tanstack/react-query";
import { AxiosError, AxiosResponse } from "axios";
import toast from "react-hot-toast";
import Cookies from "universal-cookie";
import { cookieName } from "../enums/cookie";
import instance from "../utils/axios";

interface ValidationErrorResponse {
  success: boolean;
  errors: {
    [key: string]: string[];
  };
}
interface ApiResponse<T> {
  [x: string]: any;
  data: T;
}

const pathSeparator = "/";

export const useHttp = () => {
  const destroy = <TVariables, TData = unknown>(
    path: string,
    options?: UseMutationOptions<
      ApiResponse<TData>,
      AxiosError<ValidationErrorResponse>,
      TVariables
    >
  ) => {
    const mutation = useMutation<
      ApiResponse<TData>,
      AxiosError<ValidationErrorResponse>,
      TVariables
    >({
      mutationKey: [path],
      mutationFn: () =>
        instance
          .delete(path)
          .then((response: AxiosResponse<ApiResponse<TData>>) => {
            return response.data;
          }),
      onError: () => {
        toast.error("Oops. Unexpected error occurred");
      },
      ...options,
    });

    const errorMsg = <TKey extends keyof TVariables>(
      field: TKey
    ): string | undefined => {
      return (
        mutation.error?.response?.data?.errors?.[field as string]?.[0] ||
        undefined
      );
    };

    return { ...mutation, errorMsg };
  };

  const get = <TData, TError = AxiosError>(
    path: string,
    options?: UseQueryOptions<ApiResponse<TData>, TError>
  ) => {
    const query = useQuery<ApiResponse<TData>, TError>({
      queryKey: [path],
      staleTime: 0,
      gcTime: 0,
      queryFn: ({ queryKey }) =>
        instance
          .get(queryKey.join(pathSeparator))
          .then((response) => response as ApiResponse<TData>),
      ...options,
    });

    return { ...query, data: query.data?.data };
  };
  const post = <TVariables, TData = unknown>(
    path: string,
    options?: UseMutationOptions<
      ApiResponse<TData>,
      AxiosError<ValidationErrorResponse>,
      TVariables
    >,
    headers?: Record<string, string>,
    { withCredentials = false } = {}
  ) => {
    const mutation = useMutation<
      ApiResponse<TData>,
      AxiosError<ValidationErrorResponse>,
      TVariables
    >({
      mutationKey: [path],
      mutationFn: (payload: TVariables) =>
        instance
          .post(path, payload, {
            headers: {
              ...headers,
            },
            withCredentials: withCredentials,
          })
          .then((response: AxiosResponse<ApiResponse<TData>>) => {
            const requestUrl = response?.request.responseURL as string;
            if (requestUrl.includes(LOGIN_PATH)) {
              const jwt: string | undefined = response.headers["authorization"];
              const currentTime = new Date();

              currentTime.setHours(9999);
              const cookie = new Cookies();
              cookie.set(cookieName.x_token, jwt, {
                expires: currentTime,
                path: "/",
              });

              currentTime.setHours(9999);

              cookie.set(cookieName.x_user_id, response?.data?.id, {
                path: "/",
                expires: currentTime,
              });
            }
            return response.data;
          }),
      onError: () => {
        toast.error("Oops. Unexpected error occurred");
      },
      ...options,
    });

    const errorMsg = <TKey extends keyof TVariables>(
      field: TKey
    ): string | undefined => {
      return (
        mutation.error?.response?.data?.errors?.[field as string]?.[0] ||
        undefined
      );
    };

    return { ...mutation, errorMsg };
  };

  const patch = <TVariables, TData = unknown>(
    path: string,
    options?: UseMutationOptions<
      ApiResponse<TData>,
      AxiosError<ValidationErrorResponse>,
      TVariables
    >,
    headers?: Record<string, string>
  ) => {
    const mutation = useMutation<
      ApiResponse<TData>,
      AxiosError<ValidationErrorResponse>,
      TVariables
    >({
      mutationKey: [path],
      mutationFn: (payload: TVariables) =>
        instance
          .patch(path, payload, {
            headers: {
              ...headers,
            },
          })
          .then((response: AxiosResponse<ApiResponse<TData>>) => {
            return response.data;
          }),
      onError: () => {
        toast.error("Oops. Unexpected error occurred");
      },
      ...options,
    });

    const errorMsg = <TKey extends keyof TVariables>(
      field: TKey
    ): string | undefined => {
      return (
        mutation.error?.response?.data?.errors?.[field as string]?.[0] ||
        undefined
      );
    };

    // Extend the mutation return object with errorMsg
    return { ...mutation, errorMsg };
  };

  return {
    get,
    post,
    patch,
    destroy,
  };
};

export default useHttp;
