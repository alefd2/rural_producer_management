import Box from "@mui/material/Box";
import { Container } from "@mui/system";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import { MenuSide } from "./MenuSide";

const Layout = () => {
  return (
    <Box sx={{ display: "flex", width: "100%" }}>
      <MenuSide />
      <Box
        component="main"
        sx={{
          backgroundColor: (theme) =>
            theme.palette.mode === "light"
              ? theme.palette.background.default
              : theme.palette.grey[900],
          flexGrow: 1,
          height: "100vh",
          overflow: "auto",
          width: "100%",
        }}
      >
        <Header />

        <Container maxWidth="xl">
          <Outlet />
        </Container>
      </Box>
    </Box>
  );
};

export default Layout;
