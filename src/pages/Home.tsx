import { Box } from "@mui/material";
import { useEffect, useState } from "react";
import { Navbar } from "./../layout/Navbar";
import { Sidebar } from "./../layout/Sidebar";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";
import axios from "axios";

interface Campus {
  key: string;
  lat: number;
  lon: number;
}


// Fix default marker
const DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});
L.Marker.prototype.options.icon = DefaultIcon;

const apiBaseUrl = 'http://127.0.0.1:8000/';

const Home = () => { // State untuk menyimpan data kampus
  const [openSidebar, setOpenSidebar] = useState(false);
  
const [campuses, setCampuses] = useState<Campus[]>([]);


  const position: [number, number] = [-7.7956, 110.3695]; // Koordinat pusat Yogyakarta

  // Mengambil data kampus saat komponen pertama kali dimuat
  useEffect(() => {
    const fetchCampuses = async () => {
      try {
        const response = await axios.get(`${apiBaseUrl}/campuses`);
        setCampuses(response.data); // Menyimpan data kampus ke state
      } catch (error) {
        console.error('Error fetching campuses:', error);
      }
    };

    fetchCampuses();
  }, []);

  return (
    <Box sx={{ width: "100vw", height: "100vh" }}>

      <Navbar
        onMenuClick={() => setOpenSidebar(!openSidebar)}
        sidebarOpen={openSidebar}
      />

      <Sidebar
        open={openSidebar}
        onClose={() => setOpenSidebar(false)}
        onOpen={() => {}}
      />

      {/* MAP */}
      <Box
        sx={{
          ml: openSidebar ? "400px" : 0,
          mt: "64px",
          width: openSidebar ? "calc(100% - 400px)" : "100%",
          height: "calc(100vh - 64px)",
          transition: "all 0.3s ease",
        }}
      >

        <MapContainer
          center={position}
          zoom={13}
          style={{ width: "100%", height: "100%" }}
        >
          <TileLayer
            attribution='&copy; OpenStreetMap contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {/* Menambahkan marker untuk masing-masing kampus */}
          {campuses.map((campus) => (
            <Marker
              key={campus.key}
              position={[campus.lat, campus.lon]}
            >
              <Popup>
                {campus.key} <br /> Latitude: {campus.lat} <br /> Longitude: {campus.lon}
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </Box>

    </Box>
  );
};

export default Home;
