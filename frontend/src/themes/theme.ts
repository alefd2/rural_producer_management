import { createTheme } from "@mui/material"
import { ptBR } from "@mui/material/locale"

const lightPalette = {
  palette: {
    primary: {
      main: "#008b55",
      light: "#2D5A2F",
      dark: "#2D5A2F",
      contrastText: "#FFF",
    },
    secondary: {
      main: "#636363",
      light: "#5a6f91",
      contrastText: "#000000DE",
    },
    light: {
      main: "#FFFFFF",
      light: "#FFFFFF",
      dark: "#f6eeee",
      contrastText: "#0f0f0fde",
    },
    success: {
      main: "#30bc82",
      light: "#6cefb2",
      dark: "#008b55",
      contrastText: "#FFF",
    },
    danger: {
      main: "#da5265",
      contrastText: "#ffffff",
    },
    warning: {
      main: "#F0C71B",
      light: "#ffeb71",
      dark: "#c18900",
      contrastText: "#FFF",
    },
    error: {
      main: "#da5265",
      light: "#ff8492",
      dark: "#a31b3b",
      contrastText: "#FFF",
    },
    background: {
      default: "#F0F0F0",
      paper: "#FFF",
    },
  },
}

const lightTheme = createTheme({ ...lightPalette }, ptBR)

export { lightTheme }
