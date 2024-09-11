import {
  ExpandLess,
  ExpandMore,
  HomeRounded,
  Logout,
  VerifiedUserRounded,
} from "@mui/icons-material";

import {
  Collapse,
  Divider,
  IconButton,
  List,
  ListItemText,
  Tooltip,
  alpha,
} from "@mui/material";
import MuiDrawer from "@mui/material/Drawer";
import ListItemButton from "@mui/material/ListItemButton";
import { styled } from "@mui/material/styles";
import useTheme from "@mui/material/styles/useTheme";
import { Box } from "@mui/system";
import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { useGlobalContext } from "../contexts/GlobalContext";
import { AuthContextType } from "../contexts/@types";
import { DrawerProps, MenuItemProps } from "./@types";

// Tipagem para a função ValidationMenuByAccess
export type ValidationMenuByAccessProps = (rolle: any) => JSX.Element[];

// Tipagem para o componente MenuSide
export interface MenuSideProps {
  menuOpen: boolean;
  menuWidth: string;
  dispatch: React.Dispatch<any>;
  logoff: () => void;
  rolle: any;
  currentUser: { company_name: string };
}

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open" && prop !== "width",
})<DrawerProps>(({ theme, open, width }) => ({
  "& .MuiDrawer-paper": {
    position: "relative",
    whiteSpace: "nowrap",
    overflowX: "hidden",
    width: open ? width || theme.spacing(50) : theme.spacing(7),
    height: "100vh",
    backgroundColor: theme.palette.primary.light,
    color: theme.palette.primary.contrastText,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    boxSizing: "border-box",
    ...(!open && {
      overflowX: "hidden",
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      width: theme.spacing(7),
    }),
  },
}));

const MenuItem = ({
  to,
  label,
  childs = [],
  isChild,
  onClick,
  isDisabled = false,
  sx = {},
}: MenuItemProps) => {
  const { menuOpen, dispatch } = useGlobalContext();
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();
  const theme = useTheme();
  const navigate = useNavigate();
  const isActive =
    pathname === "/" ? to === pathname : pathname.replace("/", "") === to;

  const handleClick = () => {
    setOpen(!open);
    if (!menuOpen && childs.length) {
      dispatch({ type: "toggleMenu" });
    }
    // Verificar se há childs para evitar a navegação
    if (!childs.length) {
      navigate(to || "");
    }
    onClick?.();
  };

  useEffect(() => {
    if (!menuOpen) {
      setOpen(false);
    }
  }, [menuOpen]);

  return (
    <>
      <ListItemButton
        {...(to && { component: Link, to: to })}
        onClick={handleClick}
        disabled={isDisabled}
        sx={{
          borderRadius: "10px",
          backgroundColor: isActive
            ? alpha(theme.palette.primary.main, 0.2)
            : undefined,
          "&:hover": {
            backgroundColor: alpha(theme.palette.primary.main, 0.2),
            "& .MuiListItemIcon-root": {
              color: "white",
            },
          },
          ...(isChild && {
            pl: 4,
          }),
          ...sx,
        }}
      >
        {/* <Tooltip arrow title={label}>
          <ListItemIcon sx={{ minWidth: 40 }}>
            <CustomIcon component={IconComponent} active={isActive} />
          </ListItemIcon>
        </Tooltip> */}
        <ListItemText primary={label} sx={{ pl: 2 }} />

        {childs?.length > 0 && (
          <Tooltip arrow title={open ? "Recolher item" : "Expandir item"}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-end",
                alignItems: "center",
              }}
            >
              {open ? <ExpandLess /> : <ExpandMore />}
            </Box>
          </Tooltip>
        )}
      </ListItemButton>
      <Divider />
      {childs?.length > 0 && (
        <Collapse in={open} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {childs.map((child, index) => (
              <MenuItem sx={{ pl: 4 }} key={index} isChild={true} {...child} />
            ))}
          </List>
        </Collapse>
      )}
    </>
  );
};

export const MenuSide = () => {
  const theme = useTheme();
  const { logoff } = useAuth() as AuthContextType;
  const { menuOpen } = useGlobalContext();

  return (
    <Drawer variant="permanent" open={menuOpen} sx={{ minWidth: "auto" }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: theme.spacing(2),
        }}
      >
        <IconButton color="inherit">Logo aqui</IconButton>
      </Box>

      <Box
        display={"flex"}
        flexDirection={"column"}
        justifyContent={"space-between"}
        height={"100%"}
        sx={{
          backgroundColor: theme.palette.primary.light,
          color: theme.palette.primary.contrastText,
        }}
      >
        <List
          component="nav"
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: theme.spacing(2),
            marginTop: theme.spacing(4),
            paddingX: theme.spacing(1),
          }}
        >
          <MenuItem icon={<HomeRounded />} to={"home"} label="Página inicial" />
          <MenuItem
            icon={<VerifiedUserRounded />}
            to={"producers"}
            label="Produtores"
          />
          <MenuItem
            icon={<VerifiedUserRounded />}
            to={"users"}
            label="Usuário"
          />
        </List>

        <List
          component="nav"
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: theme.spacing(2),
            marginTop: theme.spacing(4),
            paddingX: theme.spacing(1),
          }}
        >
          <MenuItem
            icon={<Logout />}
            label="Sair"
            to="/"
            onClick={() => logoff()}
          />
        </List>
      </Box>
    </Drawer>
  );
};

export default MenuSide;
