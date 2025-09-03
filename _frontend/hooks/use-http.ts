/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/rules-of-hooks */
import {
  useMutation,
  UseMutationOptions,
  useQuery,
  UseQueryOptions,
} from "@tanstack/react-query";
import { AxiosError, AxiosResponse } from "axios";
import toast from "react-hot-toast";
import instance from "../utils/axios";

interface ValidationErrorResponse {
  success?: boolean;
  message?: string;
  errors?: Record<string, string[]>;
}

interface ApiResponse<T> {
  data: T;
  [key: string]: any;
}

const pathSeparator = "/";

function getErrorMessage<TVariables>(
  error: AxiosError<ValidationErrorResponse> | null | undefined,
  field: keyof TVariables
): string | undefined {
  return error?.response?.data?.errors?.[field as string]?.[0];
}

function useHttp() {
  const get = <TResponse, TError = AxiosError>(
    path: string,
    options?: UseQueryOptions<ApiResponse<TResponse>, TError>
  ) => {
    const query = useQuery<ApiResponse<TResponse>, TError>({
      queryKey: [path],
      queryFn: ({ queryKey }) =>
        instance
          .get(queryKey.join(pathSeparator))
          .then((res) => res as ApiResponse<TResponse>),
      staleTime: 0,
      gcTime: 0,
      ...options,
    });

    return { ...query, data: query.data?.data };
  };

  const createMutation = <TVariables, TResponse = unknown>(
    method: "post" | "patch" | "delete",
    path: string,
    options?: UseMutationOptions<
      ApiResponse<TResponse>,
      AxiosError<ValidationErrorResponse>,
      TVariables
    >,
    headers?: Record<string, string>,
    config: { withCredentials?: boolean } = {}
  ) => {
    const mutationFn = (payload: TVariables) => {
      const axiosConfig = {
        headers: { ...headers },
        withCredentials: config.withCredentials,
      };

      let request: Promise<AxiosResponse<ApiResponse<TResponse>>>;
      if (method === "post") {
        request = instance.post(path, payload, axiosConfig);
      } else if (method === "patch") {
        request = instance.patch(path, payload, axiosConfig);
      } else {
        request = instance.delete(path, axiosConfig);
      }

      return request.then((response) => {
        return response.data;
      });
    };

    const mutation = useMutation<
      ApiResponse<TResponse>,
      AxiosError<ValidationErrorResponse>,
      TVariables
    >({
      mutationKey: [path],
      mutationFn,
      onError: (error: AxiosError<ValidationErrorResponse>) => {
        if (!options?.onError) {
          const data = error?.response?.data;

          const firstError =
            data?.errors && Object.values(data.errors)?.[0]?.[0];

          toast.error(
            data?.message || firstError || "Oops. Unexpected error occurred"
          );
        }
      },
      ...options,
    });

    const errorMsg = <TKey extends keyof TVariables>(field: TKey) =>
      getErrorMessage<TVariables>(mutation.error, field);

    return { ...mutation, errorMsg };
  };
  function getErrorMap<TFields extends Record<string, any>>(
    error?: AxiosError<ValidationErrorResponse> | null
  ): Partial<Record<keyof TFields, string>> & { _global?: string } {
    const result = {} as Partial<Record<keyof TFields, string>> & {
      _global?: string;
    };

    const data = error?.response?.data;
    if (!data) return result;

    if (data.message) {
      result._global = data.message;
    }

    if (data.errors) {
      for (const key in data.errors) {
        if (key in result || true) {
          result[key as keyof TFields] = data.errors[key][0] as any;
        }
      }
    }

    return result;
  }
  return {
    getErrorMap,
    get,
    post: <TVariables, TResponse = unknown>(
      path: string,
      options?: UseMutationOptions<
        ApiResponse<TResponse>,
        AxiosError<ValidationErrorResponse>,
        TVariables
      >,
      headers?: Record<string, string>,
      config?: { withCredentials?: boolean }
    ) => createMutation("post", path, options, headers, config),

    patch: <TVariables, TResponse = unknown>(
      path: string,
      options?: UseMutationOptions<
        ApiResponse<TResponse>,
        AxiosError<ValidationErrorResponse>,
        TVariables
      >,
      headers?: Record<string, string>
    ) => createMutation("patch", path, options, headers),

    destroy: <TVariables, TResponse = unknown>(
      path: string,
      options?: UseMutationOptions<
        ApiResponse<TResponse>,
        AxiosError<ValidationErrorResponse>,
        TVariables
      >
    ) => createMutation("delete", path, options),
  };
}

export default useHttp;
