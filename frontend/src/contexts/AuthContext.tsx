import axios, { AxiosResponse } from "axios";
import React, {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  ReactNode,
} from "react";
import { useSnackbar } from "../components/Snackbar";
import { BASE_URL } from "../services/api";
import { parseCookies, setCookie, destroyCookie } from "nookies";
import { AuthContextType, AuthLocalStorage } from "./@types";

export const authLocalStorageInitial: AuthLocalStorage = {
  accessToken: "",
  expiresIn: 0,
  isAuthenticated: false,
};

const api = axios.create();

export const AuthContext = createContext({} as AuthContextType);

const getStorage = (): AuthLocalStorage => {
  const cookies = parseCookies();
  const token = cookies["auth.token"];
  const expiresIn = cookies["auth.expiresIn"];
  if (expiresIn != null && token != null) {
    try {
      const parseToken: string = token;
      const parseExpiresIn: string = expiresIn;
      if (parseToken === undefined) {
        return authLocalStorageInitial;
      }
      return {
        accessToken: parseToken,
        expiresIn: Number(parseExpiresIn),
        isAuthenticated: true,
      };
    } catch (error) {
      console.error(error);
    }
  }
  return authLocalStorageInitial;
};

interface AuthContextProviderProps {
  children: ReactNode;
}

export const AuthContextProvider: React.FC<AuthContextProviderProps> = ({
  children,
}) => {
  const [authLoginResponse, setAuthLoginResponse] = useState<AuthLocalStorage>(
    getStorage()
  );

  const { setError } = useSnackbar();

  const authClient = useCallback(
    async (user: string, password: string): Promise<boolean> => {
      try {
        const postData = {
          name: String(user),
          password: String(password),
        };

        const {
          data: { accessToken, expiresIn },
          status,
        }: AxiosResponse<{
          accessToken: string;
          expiresIn: number;
        }> = await api.post(`${BASE_URL}/auth/login`, postData);

        if (status === 200 && accessToken) {
          const authLocalStorage: AuthLocalStorage = {
            accessToken,
            expiresIn,
            isAuthenticated: true,
          };

          setCookie(undefined, "auth.token", accessToken, {
            maxAge: 60 * 60 * 1, // 1 hour
          });

          setCookie(undefined, "auth.expiresIn", String(expiresIn), {
            maxAge: 60 * 60 * 1, // 1 hour
          });

          setAuthLoginResponse(authLocalStorage);
          return true;
        }
      } catch (error) {
        if (axios.isAxiosError(error)) {
          setError("Usuário ou senha inválidos");
        }
        console.error(error);
        return false;
      }
      return false;
    },
    [setError]
  );

  const logoff = useCallback(() => {
    destroyCookie(undefined, "auth.token");
    destroyCookie(undefined, "auth.expiresIn");
    setAuthLoginResponse(authLocalStorageInitial);
  }, []);

  const authContextProvider = useMemo(
    () => ({
      isAuthenticated: authLoginResponse.isAuthenticated,
      authLoginResponse,
      authClient,
      logoff,
    }),
    [authClient, logoff, authLoginResponse]
  );

  return (
    <AuthContext.Provider value={authContextProvider}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook para usar o contexto de autenticação
// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
  return useContext(AuthContext);
};
