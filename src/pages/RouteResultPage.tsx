import {
  Box,
  Card,
  CardContent,
  Typography,
  Chip,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Collapse,
} from "@mui/material";
// import MapIcon from "@mui/icons-material/Map";
import { useLocation } from "react-router-dom";
import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, Polyline, Marker, Popup } from "react-leaflet";
import { Navbar } from "../layout/Navbar";
import { Sidebar } from "../layout/Sidebar";
import { useEffect, useState } from "react";

interface Segment {
  from: string;
  to: string;
  distance_km: number;
  duration_min: number;
  route: [number, number][]; // array of [lat, lon]
}

interface RouteResult {
  total_distance_km: number;
  total_duration_min: number;
  segments: Segment[];
}

export default function RouteResultPage() {
  const [openSidebar, setOpenSidebar] = useState(false);
  const [showDetail, setShowDetail] = useState(false); // detail tabel
  const location = useLocation();
  const routeParams = location.state;
  const [routeResult, setRouteResult] = useState<RouteResult | null>(null);

  useEffect(() => {
    if (!routeParams) return;
    fetch("http://127.0.0.1:8000/route", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(routeParams),
    })
      .then((res) => res.json())
      .then((data) => setRouteResult(data))
      .catch(console.error);
  }, [routeParams]);

  if (!routeResult) return <div>Loading...</div>;

  return (
    <Box sx={{ width: "100vw", height: "100vh", color: "black" }}>
      <Navbar
        onMenuClick={() => setOpenSidebar(!openSidebar)}
        sidebarOpen={openSidebar}
      />

      <Sidebar
        open={openSidebar}
        onClose={() => setOpenSidebar(false)}
        onOpen={() => {}}
      />

      {/* MAIN CONTENT */}
      <Box
        sx={{
          ml: openSidebar ? "400px" : 0,
          mt: "64px",
          width: openSidebar ? "calc(100% - 400px)" : "100%",
          height: "calc(100vh - 64px)",
          transition: "all 0.3s ease",
          p: 3,
          bgcolor: "#f7f8fa",
          overflowY: "auto",
          overflowX: "hidden",
        }}
      >
        {/* CONTENT */}
        <Stack spacing={4}>
          {/* RINGKASAN */}
          <Card
            sx={{
              borderRadius: 3,
              width: "90%",
              mx: "auto",
            }}
          >
            <CardContent sx={{ px: 3, py: 2 }}>
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                mb={2}
              >
                <Typography fontWeight={600}>Ringkasan Kunjungan</Typography>
                <Chip
                  label={showDetail ? "Sembunyikan" : "Lihat Lebih Banyak"}
                  size="small"
                  color="success"
                  clickable
                  onClick={() => setShowDetail(!showDetail)}
                />
              </Box>

              {/* SUMMARY */}
              <Box display="flex" gap={40}>
                <Box>
                  <Typography variant="body2" color="text.secondary">
                    Total Jarak Tempuh
                  </Typography>
                  <Typography variant="h6" fontWeight={700}>
                    {routeResult.total_distance_km.toFixed(2)} km
                  </Typography>
                </Box>

                <Box>
                  <Typography variant="body2" color="text.secondary">
                    Total Waktu Tempuh
                  </Typography>
                  <Typography variant="h6" fontWeight={700}>
                    {Math.floor(routeResult.total_duration_min / 60)} jam{" "}
                    {Math.round(routeResult.total_duration_min % 60)} menit
                  </Typography>
                </Box>
              </Box>

              {/* DETAIL TABLE */}
              <Collapse in={showDetail} timeout="auto" unmountOnExit>
                <Box mt={4}>
                  <Typography fontWeight={600} mb={2}>
                    Detail Segmen Rute
                  </Typography>

                  <TableContainer sx={{ px: 1 }}>
                    <Table
                      size="small"
                      sx={{
                        borderCollapse: "separate",
                        borderSpacing: "0 10px",
                      }}
                    >
                      <TableHead>
                        <TableRow>
                          <TableCell sx={{ fontWeight: 600 }}>Asal</TableCell>
                          <TableCell sx={{ fontWeight: 600 }}>Tujuan</TableCell>
                          <TableCell align="center" sx={{ fontWeight: 600 }}>
                            Jarak (Km)
                          </TableCell>
                          <TableCell align="center" sx={{ fontWeight: 600 }}>
                            Waktu (Menit)
                          </TableCell>
                        </TableRow>
                      </TableHead>

                      <TableBody>
                        {routeResult.segments.map((seg, i) => (
                          <TableRow
                            key={i}
                            sx={{
                              backgroundColor: i % 2 === 0 ? "#f2f4f7" : "#ffffff",
                              "& td": {
                                borderBottom: "none",
                                py: 1.5,
                              },
                              "& td:first-of-type": {
                                borderTopLeftRadius: 12,
                                borderBottomLeftRadius: 12,
                              },
                              "& td:last-of-type": {
                                borderTopRightRadius: 12,
                                borderBottomRightRadius: 12,
                              },
                            }}
                          >
                            <TableCell>{seg.from}</TableCell>
                            <TableCell>{seg.to}</TableCell>
                            <TableCell align="center">
                              {seg.distance_km.toFixed(2)} KM
                            </TableCell>
                            <TableCell align="center">
                              {Math.round(seg.duration_min)} menit
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Box>
              </Collapse>
            </CardContent>
          </Card>

          {/* MAP */}
          <Card
            sx={{
              borderRadius: 3,
              width: "90%",
              mx: "auto",
            }}
          >
            <CardContent>
              <Box
                sx={{
                  height: 320,
                  borderRadius: 2,
                  bgcolor: "#e0e0e0",
                }}
              >
                <MapContainer
                  center={[
                    routeResult.segments[0].route[0][0],
                    routeResult.segments[0].route[0][1],
                  ]}
                  zoom={13}
                  style={{ height: "100%", width: "100%" }}
                >
                  <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  />

                  {routeResult.segments.map((seg, idx) => (
                    <Polyline
                      key={idx}
                      positions={seg.route.map(([lat, lon]) => [lat, lon])}
                      color="blue"
                    />
                  ))}

                  {routeResult.segments.map((seg, idx) => (
                    <Marker key={`start-${idx}`} position={seg.route[0]}>
                      <Popup>{seg.from}</Popup>
                    </Marker>
                  ))}
                  <Marker
                    position={
                      routeResult.segments[
                        routeResult.segments.length - 1
                      ].route.slice(-1)[0]
                    }
                  >
                    <Popup>
                      {routeResult.segments[routeResult.segments.length - 1].to}
                    </Popup>
                  </Marker>
                </MapContainer>
              </Box>
            </CardContent>
          </Card>
        </Stack>
      </Box>
    </Box>
  );
}
