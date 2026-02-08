import { AppBar, Toolbar, Avatar, Box, Typography, IconButton } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

interface NavbarProps {
  onMenuClick: () => void;
  sidebarOpen: boolean;
}

export function Navbar({ onMenuClick, sidebarOpen }: NavbarProps) {

  const SIDEBAR_WIDTH = 400;
  return (
      <AppBar
      position="fixed"
      color="inherit"
      elevation={1}
      sx={{
        ml: sidebarOpen ? `${SIDEBAR_WIDTH}px` : 0,
        width: sidebarOpen
          ? `calc(100% - ${SIDEBAR_WIDTH}px)`
          : "100%",
        transition: "all 0.3s ease",
      }}
    >

      <Toolbar>

        {/* HAMBURGER */}
        <IconButton edge="start" onClick={onMenuClick}>
          <MenuIcon />
        </IconButton>

        {/* TENGAH: NAMA WEB */}
        <Box
          component="img"
          src="/nameWeb.png"
          alt="Jogja Sweep"
          sx={{
            height: 40,
            position: "absolute",
            left: "50%",
            transform: "translateX(-50%)",
          }}
        />

        {/* KANAN: USER */}
        <Box display="flex" alignItems="center" gap={2} ml="auto">
          <Typography variant="body2">Made Ayu</Typography>
          <Avatar />
        </Box>

      </Toolbar>
    </AppBar>
  );
}
