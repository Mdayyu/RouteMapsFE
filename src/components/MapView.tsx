import {
  MapContainer,
  TileLayer,
  ZoomControl,
  LayersControl,
} from "react-leaflet";
import { Box } from "@mui/material";
import "leaflet/dist/leaflet.css";

const jogjaCenter: [number, number] = [-7.7956, 110.3695];
const { BaseLayer } = LayersControl;


export default function MapView() {
  return (
    <Box
      sx={{
        flex: 1,
        width: "100%",
        height: "100%",
        "& .leaflet-container": {
          width: "100%",
          height: "100%",
        },
      }}
    >
      <MapContainer
        center={jogjaCenter}
        zoom={12}
        zoomControl={false} // penting
      >
        {/* ===== LAYER CONTROL ===== */}
        <LayersControl position="topright">
          <BaseLayer checked name="Map">
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
          </BaseLayer>

          <BaseLayer name="Satellite">
            <TileLayer
              url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
            />
          </BaseLayer>
        </LayersControl>

        {/* ===== ZOOM BUTTON ===== */}
        <ZoomControl position="bottomright" />
      </MapContainer>
    </Box>
  );
}
