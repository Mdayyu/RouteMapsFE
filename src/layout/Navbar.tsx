import {
  AppBar,
  Toolbar,
  Box,
  IconButton,
  Tooltip,
} from "@mui/material";

import MenuIcon from "@mui/icons-material/Menu";
import LogoutIcon from "@mui/icons-material/Logout";
import { useTheme, useMediaQuery } from "@mui/material";
import { useNavigate } from "react-router-dom";

interface NavbarProps {
  onMenuClick: () => void;
  sidebarOpen: boolean;
}

export function Navbar({ onMenuClick, sidebarOpen }: NavbarProps) {
  const theme = useTheme();
  const isTablet = useMediaQuery(theme.breakpoints.down("md"));
  const navigate = useNavigate();

  const role = localStorage.getItem("role");

  const SIDEBAR_WIDTH = 400;

  const handleLogout = () => {
    localStorage.removeItem("role");
    sessionStorage.removeItem("adminWelcomed");

    navigate("/login");
  };

  return (
    <AppBar
      position="fixed"
      color="inherit"
      elevation={1}
      sx={{
        ml: !isTablet && sidebarOpen ? `${SIDEBAR_WIDTH}px` : 0,
        width:
          !isTablet && sidebarOpen
            ? `calc(100% - ${SIDEBAR_WIDTH}px)`
            : "100%",
        transition: "all 0.3s ease",
      }}
    >
      <Toolbar>

        {/* HAMBURGER */}
        <IconButton
          edge="start"
          onClick={onMenuClick}
          sx={{
            outline: "none",
            "&:focus": {
              outline: "none",
            },
          }}
        >
          <MenuIcon />
        </IconButton>

        {/* TENGAH: LOGO */}
        <Box
          component="img"
          src="/nameWeb.png"
          alt="Jogja Sweep"
          sx={{
            height: { xs: 30, sm: 40 },
            position: "absolute",
            left: "50%",
            transform: "translateX(-50%)",
          }}
        />

        {/* KANAN */}
        <Box display="flex" alignItems="center" gap={2} ml="auto">

          {role === "admin" && (
            <Tooltip title="Logout Admin">
              <IconButton
                onClick={handleLogout}
                sx={{
                  bgcolor: "#f5f5f5",
                  boxShadow: 1,
                  "&:hover": {
                    bgcolor: "#e57373",
                    color: "white",
                  },
                }}
              >
                <LogoutIcon />
              </IconButton>
            </Tooltip>
          )}

        </Box>

      </Toolbar>
    </AppBar>
  );
}