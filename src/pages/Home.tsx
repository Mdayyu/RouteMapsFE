import { Box } from "@mui/material";
import { useState } from "react";
import { Navbar } from "../layout/Navbar";
import { Sidebar } from "../layout/Sidebar";
// import { useTheme, useMediaQuery } from "@mui/material";
import {
  MapContainer,
  TileLayer,
  LayersControl,
  ZoomControl,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";

const { BaseLayer } = LayersControl;

const Home = () => {
  const [openSidebar, setOpenSidebar] = useState(false);

  const position: [number, number] = [-7.7956, 110.3695]; // Yogyakarta

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
      {/* NAVBAR */}
      <Navbar
        onMenuClick={() => setOpenSidebar(!openSidebar)}
        sidebarOpen={openSidebar}
      />

      {/* CONTENT WRAPPER */}
      <Box
        sx={{
          display: "flex",
          flex: 1,
          overflow: "hidden",
        }}
      >
        {/* SIDEBAR */}
        <Sidebar
          open={openSidebar}
          onClose={() => setOpenSidebar(false)}
          
        />

        {/* MAP AREA */}
       <Box
  sx={{
    flex: 1,
    transition: "all 0.3s ease",
    position: "relative",
  }}
>
<MapContainer
  center={position}
  zoom={13}
  style={{ width: "100%", height: "100%" }}
  zoomControl={false} // matikan default zoom control
>
  {/* Hanya satu zoom control di kanan atas */}
  <ZoomControl position="topright" />

  <LayersControl position="topright">
    {/* NORMAL MAP */}
    <BaseLayer checked name="Peta">
      <TileLayer
        attribution="&copy; OpenStreetMap contributors"
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
    </BaseLayer>

    {/* SATELLITE */}
    <BaseLayer name="Satelit">
      <TileLayer
        attribution="Tiles © Esri"
        url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
      />
    </BaseLayer>

    {/* HYBRID */}
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
