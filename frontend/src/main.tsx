import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { AuthContextProvider } from "./contexts/AuthContext.tsx";
import { ApiContextProvider } from "./contexts/ApiContext.tsx";
import { ContextProvider } from "./contexts/GlobalContext.tsx";
import { lightTheme } from "./themes/theme";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { QueryClientProvider } from "react-query";
import { queryClient } from "./shared/queryClient.ts";
import SnackbarProvider from "./components/Snackbar/index.tsx";
import ModalProvider from "./components/ConfirmModal/ModalProvider.tsx";
import ErrorBoundary from "./ErrorBoundary.tsx";
import { BrowserRouter } from "react-router-dom";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ErrorBoundary>
      <ThemeProvider theme={lightTheme}>
        <CssBaseline />
        <SnackbarProvider>
          <ModalProvider>
            <QueryClientProvider client={queryClient}>
              <AuthContextProvider>
                <ApiContextProvider>
                  <ContextProvider>
                    <BrowserRouter>
                      <App />
                    </BrowserRouter>
                  </ContextProvider>
                </ApiContextProvider>
              </AuthContextProvider>
            </QueryClientProvider>
          </ModalProvider>
        </SnackbarProvider>
      </ThemeProvider>
    </ErrorBoundary>
  </StrictMode>
);
