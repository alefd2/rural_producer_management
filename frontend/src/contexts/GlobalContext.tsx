import { ReactNode, createContext, useContext, useMemo } from "react";
import { useImmerReducer } from "use-immer";

interface GlobalState {
  menuOpen: boolean;
  menuWidth: number;
  darkMode: boolean;
}

type GlobalAction = { type: "toggleMenu" } | { type: "toggleTheme" };

interface GlobalContextType extends GlobalState {
  dispatch: (action: GlobalAction) => void;
}

const initialState: GlobalState = {
  menuOpen: true,
  menuWidth: 300,
  darkMode: false,
};

const reducer = (state: GlobalState, action: GlobalAction): void => {
  switch (action.type) {
    case "toggleMenu":
      state.menuOpen = !state.menuOpen;
      break;
    case "toggleTheme":
      state.darkMode = !state.darkMode;
      break;
    default:
      break;
  }
};

const GlobalContext = createContext<GlobalContextType | undefined>(undefined);

export const ContextProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [state, dispatch] = useImmerReducer(reducer, initialState);

  const contextValue = useMemo(() => ({ ...state, dispatch }), [state]);

  return (
    <GlobalContext.Provider value={contextValue}>
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = (): GlobalContextType => {
  const context = useContext(GlobalContext);
  if (context === undefined) {
    throw new Error("useGlobalContext must be used within a ContextProvider");
  }
  return context;
};
