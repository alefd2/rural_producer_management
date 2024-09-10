/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, { AxiosInstance, AxiosRequestConfig } from "axios";
import React, {
  createContext,
  useCallback,
  useContext,
  useMemo,
  ReactNode,
} from "react";
import { BASE_URL } from "../shared/api";
import { useAuth } from "./AuthContext";
import { AuthContextType } from "./@types";

interface ApiError {
  erros: {
    default?: string;
    [key: string]: any;
  };
  message?: string;
}

interface ApiContextType {
  get: (url: string, axiosRequestConfig?: AxiosRequestConfig) => Promise<any>;
  post: (
    url: string,
    data?: any,
    axiosRequestConfig?: AxiosRequestConfig
  ) => Promise<any>;
  put: (
    url: string,
    data?: any,
    axiosRequestConfig?: AxiosRequestConfig
  ) => Promise<any>;
  patch: (
    url: string,
    data?: any,
    axiosRequestConfig?: AxiosRequestConfig
  ) => Promise<any>;
  _delete: (
    url: string,
    axiosRequestConfig?: AxiosRequestConfig
  ) => Promise<any>;
  request: (axiosRequestConfig: AxiosRequestConfig) => Promise<unknown>;
}

interface ApiContextProviderProps {
  children: ReactNode;
}

export const ApiContext = createContext<ApiContextType | undefined>(undefined);

export const ApiContextProvider: React.FC<ApiContextProviderProps> = ({
  children,
}) => {
  const { authLoginResponse, logoff } = useAuth() as AuthContextType;

  const api: AxiosInstance = useMemo(() => {
    let headers: Record<string, string> = {};
    if (authLoginResponse.accessToken) {
      headers = {
        Authorization: `Bearer ${authLoginResponse.accessToken}`,
      };
    }
    return axios.create({ baseURL: BASE_URL, headers });
  }, [authLoginResponse.accessToken]);

  const requestMethod = useCallback(
    async (axiosRequestConfig: AxiosRequestConfig) => {
      try {
        const { data, status } = await api.request(axiosRequestConfig);
        if (status < 300) {
          return data;
        }
      } catch (error) {
        if (axios.isAxiosError(error)) {
          const apiError = error.response?.data as ApiError;

          if (apiError?.erros?.default === "Não autenticado") {
            logoff();
          }

          const errorMessage = apiError?.message || "Erro desconhecido";
          console.error("Error details:", apiError);
          throw new Error(errorMessage);
        }
        throw error;
      }
    },
    [api, logoff]
  );

  const getMethod = useCallback(
    async (url: string, axiosRequestConfig?: AxiosRequestConfig) => {
      return requestMethod({ method: "GET", url, ...axiosRequestConfig });
    },
    [requestMethod]
  );

  const postMethod = useCallback(
    async (
      url: string,
      data?: unknown,
      axiosRequestConfig?: AxiosRequestConfig
    ) => {
      return requestMethod({
        method: "POST",
        url,
        data,
        ...axiosRequestConfig,
      });
    },
    [requestMethod]
  );

  const putMethod = useCallback(
    async (
      url: string,
      data?: unknown,
      axiosRequestConfig?: AxiosRequestConfig
    ) => {
      return requestMethod({ method: "PUT", url, data, ...axiosRequestConfig });
    },
    [requestMethod]
  );

  const patchMethod = useCallback(
    async (
      url: string,
      data?: unknown,
      axiosRequestConfig?: AxiosRequestConfig
    ) => {
      return requestMethod({
        method: "PATCH",
        url,
        data,
        ...axiosRequestConfig,
      });
    },
    [requestMethod]
  );

  const deleteMethod = useCallback(
    async (url: string, axiosRequestConfig?: AxiosRequestConfig) => {
      return requestMethod({ method: "DELETE", url, ...axiosRequestConfig });
    },
    [requestMethod]
  );

  const apiContextProvider = useMemo(
    () => ({
      get: getMethod,
      post: postMethod,
      put: putMethod,
      patch: patchMethod,
      _delete: deleteMethod,
      request: requestMethod,
    }),
    [deleteMethod, getMethod, patchMethod, postMethod, putMethod, requestMethod]
  );

  return (
    <ApiContext.Provider value={apiContextProvider}>
      {children}
    </ApiContext.Provider>
  );
};

export const useApi = (): ApiContextType => {
  const context = useContext(ApiContext);
  if (context === undefined) {
    throw new Error("useApi must be used within an ApiContextProvider");
  }
  return context;
};
