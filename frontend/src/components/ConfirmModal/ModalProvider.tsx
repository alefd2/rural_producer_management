/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  ReactNode,
  FC,
} from "react";
import { useImmer } from "use-immer";
import BasicModal from "./BasicModal";

interface ModalContextType {
  createModal: (
    Component: FC<any>,
    unmountDelay?: number
  ) => (props: any) => Promise<any>;
  confirm: (options: ConfirmOptions) => Promise<any>;
}

interface ConfirmOptions {
  message:
    | string
    | {
        description: string;
        title: string;
        okLabel: string;
        okFunction?: () => void;
        cancelLabel?: string;
      };
  buttonLabel?: string;
  title?: string;
  okFunction?: () => void;
  cancelLabel?: string;
}

interface ModalProviderProps {
  children: ReactNode;
}

const ModalProviderContext = createContext<ModalContextType | undefined>(
  undefined
);

export const useModal = () => {
  const context = useContext(ModalProviderContext);
  if (!context) {
    throw new Error("useModal must be used within a ModalProvider");
  }
  return context;
};

const ModalProvider: FC<ModalProviderProps> = ({ children }) => {
  const [modals, setCurrentModal] = useImmer<JSX.Element[]>([]);

  const close = useCallback(
    (unmountDelay: number, index: number) => () => {
      setTimeout(
        () =>
          setCurrentModal((modais) => {
            modais.splice(index, 1);
          }),
        unmountDelay
      );
    },
    [setCurrentModal]
  );

  const createModal = useCallback(
    (Component: FC<any>, unmountDelay = 0) =>
      (props: any) => {
        const promise = new Promise<any>((resolve, reject) => {
          setCurrentModal((modais) => {
            modais.push(
              <ModalWrapper
                Component={Component}
                close={close(unmountDelay, modals.length)}
                resolve={resolve}
                reject={reject}
                {...props}
              />
            );
          });
        });

        return promise.then(
          (result) => {
            close(unmountDelay, modals.length)();
            return result;
          },
          (result) => {
            close(unmountDelay, modals.length)();
            return Promise.reject(result);
          }
        );
      },
    [close, modals.length, setCurrentModal]
  );

  const confirm = useCallback(
    async ({
      message,
      buttonLabel = "Confirmar",
      title = "Confirmar",
      okFunction,
      cancelLabel,
    }: ConfirmOptions) => {
      const value =
        typeof message !== "string"
          ? message
          : {
              description: message,
              title: title,
              okLabel: buttonLabel,
              okFunction: okFunction,
              cancelLabel: cancelLabel,
            };
      return createModal(BasicModal)(value);
    },
    [createModal]
  );

  const context = useMemo(
    () => ({ createModal, confirm }),
    [createModal, confirm]
  );

  return (
    <ModalProviderContext.Provider value={context}>
      <>
        {children}
        {modals.map((Modal, key) => (
          <div key={key}>{Modal}</div>
        ))}
      </>
    </ModalProviderContext.Provider>
  );
};

export default ModalProvider;

interface ModalWrapperProps {
  Component: FC<any>;
  reject: (value: any) => void;
  resolve: (value: any) => void;
  close: () => void;
  [key: string]: any;
}

const ModalWrapper: FC<ModalWrapperProps> = ({
  Component,
  reject,
  resolve,
  close,
  ...props
}) => {
  const [show, setShow] = useState(true);

  const cancel = useCallback(
    (reject: (value: any) => void) => (value: any) => {
      setShow(false);
      reject(value);
      close();
    },
    [close]
  );

  const proceed = useCallback(
    (resolve: (value: any) => void) => (value: any) => {
      setShow(false);
      resolve(value);
      close();
    },
    [close]
  );

  return (
    <Component
      cancel={cancel(reject)}
      proceed={proceed(resolve)}
      open={show}
      {...props}
    />
  );
};
