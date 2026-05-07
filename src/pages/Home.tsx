import { Box, Snackbar, Alert } from "@mui/material";
import { useState, useEffect } from "react";
import { Navbar } from "../layout/Navbar";
import { Sidebar } from "../layout/Sidebar";
import {
  MapContainer,
  TileLayer,
  LayersControl,
  ZoomControl,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useNavigate } from "react-router-dom";

const { BaseLayer } = LayersControl;

const Home = () => {
  const navigate = useNavigate();

  const [openSidebar, setOpenSidebar] = useState(false);
  const [welcomeAlert, setWelcomeAlert] = useState(false);

  const role = localStorage.getItem("role");

  const position: [number, number] = [-7.7956, 110.3695];

 useEffect(() => {
  const role = localStorage.getItem("role");

  if (!role) {
    navigate("/", { replace: true });
    return;
  }

  if (role === "admin" && !sessionStorage.getItem("adminWelcomed")) {
    sessionStorage.setItem("adminWelcomed", "true");

    setTimeout(() => {
      setWelcomeAlert(true);
    }, 0);
  }
}, []);

  return (
    <Box
      sx={{
        width: "100%",
        height: "100vh",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* 🔔 SNACKBAR WELCOME ADMIN */}
      <Snackbar
        open={welcomeAlert}
        autoHideDuration={4000}
        onClose={() => setWelcomeAlert(false)}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={() => setWelcomeAlert(false)}
          severity="success"
          variant="filled"
          sx={{
            width: "100%",
            fontWeight: "bold",
            mt: 6,
            borderRadius: "12px",
            boxShadow: "0px 4px 20px rgba(0,0,0,0.2)",
          }}
        >
          Selamat Datang, Admin! Panel kontrol rute siap digunakan.
        </Alert>
      </Snackbar>

      {/* NAVBAR */}
      <Navbar
        onMenuClick={() => setOpenSidebar(!openSidebar)}
        sidebarOpen={openSidebar}
      />

      {/* CONTENT */}
      <Box sx={{ display: "flex", flex: 1, overflow: "hidden" }}>
        {/* SIDEBAR */}
        <Sidebar open={openSidebar} onClose={() => setOpenSidebar(false)} />

        {/* MAP AREA */}
        <Box sx={{ flex: 1, position: "relative" }}>
          {/* ADMIN LABEL */}
          {role === "admin" && (
            <Box
              sx={{
                position: "absolute",
                top: 10,
                left: 10,
                zIndex: 1000,
                background: "white",
                padding: "6px 15px",
                borderRadius: "20px",
                boxShadow: 3,
                fontWeight: "bold",
                color: "#D989A6",
                border: "1px solid #D989A6",
                display: "flex",
                alignItems: "center",
                gap: 1,
              }}
            >
              <span style={{ fontSize: "18px" }}>⚙️</span> Admin Mode
            </Box>
          )}

          <MapContainer
            center={position}
            zoom={13}
            style={{ width: "100%", height: "100%" }}
            zoomControl={false}
          >
            <ZoomControl position="topright" />

            <LayersControl position="topright">
              <BaseLayer checked name="Peta">
                <TileLayer
                  attribution="&copy; OpenStreetMap contributors"
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
              </BaseLayer>

              <BaseLayer name="Satelit">
                <TileLayer
                  attribution="Tiles © Esri"
                  url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
                />
              </BaseLayer>

              <BaseLayer name="Hybrid">
                <TileLayer
                  attribution="Tiles © Esri"
                  url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
                />
              </BaseLayer>
            </LayersControl>
          </MapContainer>
        </Box>
      </Box>
    </Box>
  );
};

export default Home;