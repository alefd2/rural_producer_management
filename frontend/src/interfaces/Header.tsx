/* eslint-disable no-empty-pattern */
import styled from "@emotion/styled";
import { Logout } from "@mui/icons-material";
import {
  Avatar,
  Box,
  Breadcrumbs,
  Divider,
  IconButton,
  ListItemIcon,
  Menu,
  MenuItem,
  Toolbar,
  Tooltip,
  useScrollTrigger,
} from "@mui/material";
import MuiAppBar from "@mui/material/AppBar";
import { cloneElement, useState, MouseEvent } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { AuthContextType } from "../contexts/@types";

const ElevationScroll = ({ children }: { children: React.ReactElement }) => {
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
    target: document.querySelector("main") ?? undefined,
  });

  return cloneElement(children, {
    elevation: trigger ? 2 : 0,
  });
};

const LinkCustom = styled(Link)(({}) => ({
  padding: "3px 4px",
  textDecoration: "none",
  color: "ActiveBorder",
  backgroundColor: "#85858514",
  borderRadius: "6px",
  transition: "background-color 0.2s ease-in-out",
  "&:hover": {
    backgroundColor: "#8585852d",
    color: "#3b3b3bdc",
  },
}));

const BreadcrumbItem = ({ to, label }: { to: string; label: string }) => {
  return (
    <LinkCustom color="inherit" to={to}>
      {label}
    </LinkCustom>
  );
};

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open" && prop !== "width",
})(({}) => ({
  // zIndex: theme.zIndex.drawer - 1,
  width: "100%",
  display: "flex",
  backdropFilter: "blur(8px)",
  backgroundColor: "#f0f0f03e",
  boxShadow: "none",
}));

const Header = () => {
  const { logoff } = useAuth() as AuthContextType;

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((x) => x);

  return (
    <ElevationScroll>
      <AppBar position="sticky">
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          {/* <IconButton color="secondary" onClick={toggleDrawer}>
              {menuOpen ? <MenuOpenIcon /> : <MenuIcon />}
            </IconButton> */}

          <Breadcrumbs aria-label="breadcrumb">
            <BreadcrumbItem to="/" label="Home" />
            {pathnames.map((name, index) => (
              <BreadcrumbItem
                key={index}
                to={`/${pathnames.slice(0, index + 1).join("/")}`}
                label={name}
              />
            ))}
          </Breadcrumbs>

          <Box>
            <Box>
              <Tooltip title="account_settings">
                <IconButton
                  onClick={handleClick}
                  size="small"
                  sx={{ ml: 2 }}
                  aria-controls={open ? "account-menu" : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? "true" : undefined}
                >
                  <Avatar sx={{ width: 32, height: 32 }}>
                    <Avatar />
                  </Avatar>
                </IconButton>
              </Tooltip>
            </Box>
            <Menu
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              onClick={handleClose}
              // paper={paperProps}
            >
              <Box>
                <Box
                  height="64px"
                  sx={{
                    backgroundColor: "#1C2536",
                    marginTop: "-20px",
                  }}
                ></Box>
                <Box
                  display="flex"
                  flexDirection="column"
                  alignItems="center"
                  justifyContent="space-around"
                  height="100px"
                  width="200px"
                  sx={{ marginTop: "-52px" }}
                >
                  <Avatar />
                </Box>
              </Box>
              <Divider />
              <MenuItem onClick={logoff}>
                <ListItemIcon>
                  <Logout fontSize="small" />
                </ListItemIcon>
                Sair
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </AppBar>
    </ElevationScroll>
  );
};

export default Header;
