import { Box, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { MapContainer, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { motion } from "framer-motion";
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import PublicIcon from '@mui/icons-material/Public';



const Landing = () => {
  const navigate = useNavigate();

  const handlePublic = () => {
    localStorage.setItem("role", "public");
    navigate("/home");
  };

  const position: [number, number] = [-7.7956, 110.3695];

  return (
    <Box sx={{ width: "100%", height: "100vh", position: "relative", overflow: "hidden" }}>
      
      {/* 1. BACKGROUND MAP */}
      <MapContainer
        center={position}
        zoom={13}
        style={{ width: "100%", height: "100%", position: "absolute" }}
        zoomControl={false}
      >
        <TileLayer
          attribution="&copy; OpenStreetMap contributors"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
      </MapContainer>

      {/* 2. OVERLAY LAYER (Darken & Blur) */}
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          background: "rgba(0,0,0,0.4)", // Gelapkan sedikit agar kartu glass terlihat kontras
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 500,
        }}
      >
        {/* Title di atas Kartu */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <Typography 
            variant="h3" 
            sx={{ 
              color: "#fff", 
              fontWeight: "bold", 
              mb: 6, 
              textAlign: "center",
              textShadow: "2px 2px 10px rgba(0,0,0,0.5)" 
            }}
          >
            Pilih Akses
          </Typography>
        </motion.div>

       <Box
  sx={{
    display: "flex",
    gap: 6, // 🔥 jarak antar card diperbesar
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "center",
    mt: 8,
  }}
>
  {/* 🔥 ADMIN */}
  <motion.div whileHover={{ scale: 1.06 }} whileTap={{ scale: 0.97 }}>
    <Box
      onClick={() => navigate("/login")}
      sx={{
        width: { xs: "100%", sm: 360, md: 420 }, // 🔥 lebih besar
        p: 6, // 🔥 padding diperbesar
        cursor: "pointer",
        textAlign: "center",
        borderRadius: 6,
        background: "rgba(255, 255, 255, 0.15)",
        backdropFilter: "blur(18px)",
        border: "1px solid rgba(255, 255, 255, 0.3)",
        boxShadow: "0 12px 40px rgba(0, 0, 0, 0.35)",
        color: "#fff",
        transition: "0.3s",
        "&:hover": {
          boxShadow: "0 18px 60px rgba(0,0,0,0.5)",
        },
      }}
    >
      <AdminPanelSettingsIcon sx={{ fontSize: 90, mb: 3, color: "#D989A6" }} />
      
      <Typography variant="h4" fontWeight="bold">
        Admin
      </Typography>

      <Typography variant="body1" sx={{ opacity: 0.85, mt: 2 }}>
        Kelola data rute dan titik lokasi dengan kontrol penuh
      </Typography>
    </Box>
  </motion.div>

  {/* 🔥 PUBLIC */}
  <motion.div whileHover={{ scale: 1.06 }} whileTap={{ scale: 0.97 }}>
    <Box
      onClick={handlePublic}
      sx={{
        width: { xs: "100%", sm: 360, md: 420 },
        p: 6,
        cursor: "pointer",
        textAlign: "center",
        borderRadius: 6,
        background: "rgba(255, 255, 255, 0.15)",
        backdropFilter: "blur(18px)",
        border: "1px solid rgba(255, 255, 255, 0.3)",
        boxShadow: "0 12px 40px rgba(0, 0, 0, 0.35)",
        color: "#fff",
        transition: "0.3s",
        "&:hover": {
          boxShadow: "0 18px 60px rgba(0,0,0,0.5)",
        },
      }}
    >
      <PublicIcon sx={{ fontSize: 90, mb: 3, color: "#BFDBFE" }} />
      
      <Typography variant="h4" fontWeight="bold">
        Public
      </Typography>

      <Typography variant="body1" sx={{ opacity: 0.85, mt: 2 }}>
        Jelajahi peta dan temukan rute terbaik dengan mudah
      </Typography>
    </Box>
  </motion.div>
</Box>
     

        <Typography variant="caption" sx={{ color: "rgba(255,255,255,0.5)", mt: 8 }}>
          Aplikasi Pencarian Rute Berbasis Ant Colony Optimization (ACO) © 2026
        </Typography>
      </Box>
    </Box>
  );
};

export default Landing;