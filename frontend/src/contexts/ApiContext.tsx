import axios, { AxiosInstance, AxiosRequestConfig } from "axios";
import React, {
  createContext,
  useCallback,
  useContext,
  useMemo,
  ReactNode,
} from "react";
import { BASE_URL } from "../services/api";
import { AuthContextType, useAuth } from "./AuthContext";

interface ApiContextType {
  get: (
    url: string,
    axiosRequestConfig?: AxiosRequestConfig
  ) => Promise<unknown>;
  post: (
    url: string,
    data?: unknown,
    axiosRequestConfig?: AxiosRequestConfig
  ) => Promise<unknown>;
  put: (
    url: string,
    data?: unknown,
    axiosRequestConfig?: AxiosRequestConfig
  ) => Promise<unknown>;
  patch: (
    url: string,
    data?: unknown,
    axiosRequestConfig?: AxiosRequestConfig
  ) => Promise<unknown>;
  _delete: (
    url: string,
    axiosRequestConfig?: AxiosRequestConfig
  ) => Promise<unknown>;
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
        // id: companyId,
        // user: currentUser.user_id,
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
        if (
          axios.isAxiosError(error) &&
          // error.response?.status === 401
          error.response?.data.erros.default === "Não autenticado"
        ) {
          logoff();
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

// eslint-disable-next-line react-refresh/only-export-components
export const useApi = (): ApiContextType => {
  const context = useContext(ApiContext);
  if (context === undefined) {
    throw new Error("useApi must be used within an ApiContextProvider");
  }
  return context;
};
