import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  ReactNode,
} from "react";
import {
  SnackbarProvider as NotistackProvider,
  useSnackbar as useNotistack,
  OptionsObject,
  SnackbarMessage,
} from "notistack";

interface SnackbarContextType {
  alert: (message: SnackbarMessage, options?: OptionsObject) => void;
  setError: (message: SnackbarMessage, options?: OptionsObject) => void;
  setSuccess: (message: SnackbarMessage, options?: OptionsObject) => void;
  setInfo: (message: SnackbarMessage, options?: OptionsObject) => void;
  setWarning: (message: SnackbarMessage, options?: OptionsObject) => void;
}

const SnackContext = createContext<SnackbarContextType | undefined>(undefined);

/**
 * Hook para utilizar alertas
 */
export const useSnackbar = (): SnackbarContextType => {
  const context = useContext(SnackContext);
  if (context === undefined) {
    throw new Error("useSnackbar must be used within a SnackbarProvider");
  }
  return context;
};

interface WrappedProps {
  children: ReactNode;
}

const Wrapped = ({ children }: WrappedProps) => {
  const { enqueueSnackbar } = useNotistack();

  const alert = useCallback(
    (message: SnackbarMessage, options?: OptionsObject) => {
      enqueueSnackbar(message, {
        preventDuplicate: false,
        persist: false,
        anchorOrigin: {
          vertical: "top",
          horizontal: "right",
        },
        ...options,
      });
    },
    [enqueueSnackbar]
  );

  const contextValue = useMemo(
    () => ({
      alert,
      setError: (message: SnackbarMessage, options?: OptionsObject) =>
        alert(message, { ...options, variant: "error" }),
      setSuccess: (message: SnackbarMessage, options?: OptionsObject) =>
        alert(message, { ...options, variant: "success" }),
      setInfo: (message: SnackbarMessage, options?: OptionsObject) =>
        alert(message, { ...options, variant: "info" }),
      setWarning: (message: SnackbarMessage, options?: OptionsObject) =>
        alert(message, { ...options, variant: "warning" }),
    }),
    [alert]
  );

  return (
    <SnackContext.Provider value={contextValue}>
      {children}
    </SnackContext.Provider>
  );
};

interface SnackbarProviderProps {
  children: ReactNode;
}

const SnackbarProvider = ({ children }: SnackbarProviderProps) => {
  return (
    <NotistackProvider
      autoHideDuration={4000}
      maxSnack={5}
      preventDuplicate={false}
    >
      <Wrapped>{children}</Wrapped>
    </NotistackProvider>
  );
};

export default SnackbarProvider;
