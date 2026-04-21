
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
//    declare module "leaflet" {
//   namespace Control {
//     class Fullscreen extends Control {
//       constructor(options?: {
//         position?: string;
//         title?: string;
//       });
//     }
//   }
// }
  // import MapIcon from "@mui/icons-material/Map";
  import { useLocation } from "react-router-dom";
  import "leaflet/dist/leaflet.css";
  import { MapContainer, TileLayer, Polyline, Marker, Popup } from "react-leaflet";
  import { Navbar } from "../layout/Navbar";
  import { Sidebar } from "../layout/Sidebar";
  import { useEffect, useState } from "react";
  import { CircularProgress } from "@mui/material";
  import "leaflet-fullscreen/dist/leaflet.fullscreen.css";
  import { useMap } from "react-leaflet";
  import L from "leaflet";
  import { LayersControl } from "react-leaflet";
 import RouteIcon from "@mui/icons-material/Route";
 import AccessTimeRoundedIcon from '@mui/icons-material/AccessTimeRounded';
 import "leaflet-fullscreen";
 import { useMediaQuery } from "@mui/material";




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
    const API = import.meta.env.VITE_API_URL;
    const [openSidebar, setOpenSidebar] = useState(false);
    const [showDetail, setShowDetail] = useState(false); // detail tabel
    const location = useLocation();
    const routeParams = location.state;
    const [routeResult, setRouteResult] = useState<RouteResult | null>(null);
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);
    const rowsPerPage = 5;
    const totalData = routeResult?.segments?.length || 0;
    const totalPages = Math.ceil(totalData / rowsPerPage);
    const startIndex = (page - 1) * rowsPerPage;
    const endIndex = startIndex + rowsPerPage;
    const currentData = routeResult?.segments?.slice(startIndex, endIndex) ?? [];
    const startDisplay = totalData === 0 ? 0 : startIndex + 1;
    const endDisplay = Math.min(endIndex, totalData);
    const { BaseLayer } = LayersControl;
    const isMobile = useMediaQuery("(max-width:600px)");
    const isTablet = useMediaQuery("(max-width:1024px)");


    useEffect(() => {
  console.log("📦 DATA DITERIMA DI ROUTE PAGE:", routeParams);
}, [routeParams]);


    const createNumberedIcon = (number: number) =>
      L.divIcon({
        className: "",
        html: `
          <div style="
            background:#1976d2;
            color:white;
            width:32px;
            height:32px;
            border-radius:50%;
            display:flex;
            align-items:center;
            justify-content:center;
            font-weight:bold;
            font-size:14px;
            border:3px solid white;
            box-shadow: 0 0 4px rgba(0,0,0,0.4);
          ">
            ${number}
          </div>
        `,
        iconSize: [32, 32],
        iconAnchor: [16, 16],
      });



    function FullscreenControl() {
      const map = useMap();

      useEffect(() => {
      //  const fullscreenControl = new L.Control.Fullscreen();
       const fullscreenControl = new L.Control.Fullscreen();
        map.addControl(fullscreenControl);

        return () => {
          map.removeControl(fullscreenControl);
        };
      }, [map]);

      return null;
    }


    useEffect(() => {
      if (!routeParams) return;

      let isMounted = true;

  const fetchData = async () => {
    try {
      if (isMounted) setLoading(true);

     const res = await fetch(`${API}/route`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(routeParams), 
      });

      const data = await res.json();
      if (isMounted) setRouteResult(data);
    } catch (err) {
      console.error(err);
    } finally {
      if (isMounted) setLoading(false);
    }
  };

  fetchData();

  return () => {
    isMounted = false;
  };
}, [routeParams, API]);


const paginationBtn = {
  width: 36,
  height: 36,
  borderRadius: "50%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: 14,
  cursor: "pointer",
  transition: "all 0.2s ease",
};


    


    return (
      <Box 
      sx={{
        width: isMobile ?  "100%" : "106vw", 
        height: "100vh", 
        color: "black" 
      }}>
        <Navbar
          onMenuClick={() => setOpenSidebar(!openSidebar)}
          sidebarOpen={openSidebar}
        />

        <Sidebar
          open={openSidebar}
          onClose={() => setOpenSidebar(false)}
          
        />

        {/* MAIN CONTENT */}
      <Box
        sx={{
          mt: "64px",

          // 💻 Desktop → geser konten kalau sidebar buka
          ml: !isTablet && openSidebar ? "400px" : 0,
          width: !isTablet && openSidebar
            ? "calc(100% - 400px)"
            : "100%",

          height: "calc(100vh - 64px)",
          transition: "all 0.3s ease",
          p: isMobile ? 1.5 : 3,
          boxSizing: "border-box",
          bgcolor: "#f7f8fa",
          overflowY: "auto",
          overflowX: "hidden",
        }}
      >


          {/* CONTENT */}
          {/* <Stack spacing={4} > */}
          <Stack
            spacing={3}
            sx={{
              width: "100%",
              maxWidth: "2000px",
              mx: "auto",
              px: 3,
              py: 3,
            }}
          >

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

                <Stack
                    direction={{ xs: "column", md: "row" }}
                    spacing={3}
                    sx={{ 
                      width: "100%",
                     }}
                  >
                  {/* ================= CARD TOTAL JARAK ================= */}
                  <Card
                    sx={{
                      width: "100%",
                     maxWidth: isMobile ? 250 : 360,
                      borderRadius: 4,
                      p: 3,
                      background: "linear-gradient(135deg, #fae5e0, #dfbab2)",
                      boxShadow: "0 8px 20px rgba(0,0,0,0.08)",
                    }}
                  >
                    <Stack direction="row" justifyContent="space-between" alignItems="center">
                      <Box>
                        <Typography
                          fontSize={13}
                          fontWeight={600}
                          color="#691300"
                          gutterBottom
                        >
                          TOTAL JARAK
                        </Typography>

                        <Typography variant="h5" fontWeight={700}>
                          {loading || !routeResult ? (
                            <CircularProgress size={20} />
                          ) : (
                            `${routeResult.total_distance_km.toFixed(2)} km`
                          )}
                        </Typography>
                      </Box>

                      <Box
                        sx={{
                          width: 50,
                          height: 50,
                          borderRadius: 3,
                          bgcolor: "#cb8080",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <RouteIcon sx={{ color: "white" }} />
                      </Box>
                    </Stack>
                  </Card>

                  {/* ================= CARD TOTAL WAKTU ================= */}
                  <Card
                    sx={{
                      width: "100%",
                      maxWidth: isMobile ? 250 : 360,
                      borderRadius: 4,
                      p: 3,
                      background: "linear-gradient(135deg, #e8f5e9, #c8e6c9)",
                      boxShadow: "0 8px 20px rgba(0,0,0,0.08)",
                    }}
                  >
                    <Stack direction="row" justifyContent="space-between" alignItems="center">
                      <Box>
                        <Typography
                          fontSize={13}
                          fontWeight={600}
                          color="#2e7d32"
                          gutterBottom
                        >
                          TOTAL WAKTU
                        </Typography>

                        <Typography variant="h5" fontWeight={700}>
                          {loading || !routeResult ? (
                            <CircularProgress size={20} />
                          ) : (
                            <>
                              {Math.floor(routeResult.total_duration_min / 60)} jam{" "}
                              {Math.round(routeResult.total_duration_min % 60)} menit
                            </>
                          )}
                        </Typography>
                      </Box>

                      <Box
                        sx={{
                          width: 50,
                          height: 50,
                          borderRadius: 3,
                          bgcolor: "#81c784",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <AccessTimeRoundedIcon sx={{ color: "white" }} />
                      </Box>
                    </Stack>
                  </Card>
                </Stack>


                {/* DETAIL TABLE */}
                <Collapse in={showDetail} timeout="auto" unmountOnExit>
                  <Box mt={4}>
                    <Typography fontWeight={600} mb={2}>
                      Detail Segmen Rute
                    </Typography>

                   <TableContainer sx={{ px: 1 }}>
                    <Table
                      size="small"
                      stickyHeader
                      sx={{
                        borderCollapse: "separate",
                        borderSpacing: "0 12px",
                      }}
                    >
                      <TableHead>
                        <TableRow>
                          <TableCell
                            sx={{
                              fontWeight: 600,
                              borderBottom: "none",
                              color: "#6b7280",
                            }}
                          >
                            Asal
                          </TableCell>
                          <TableCell
                            sx={{
                              fontWeight: 600,
                              borderBottom: "none",
                              color: "#6b7280",
                            }}
                          >
                            Tujuan
                          </TableCell>
                          <TableCell
                            align="center"
                            sx={{
                              fontWeight: 600,
                              borderBottom: "none",
                              color: "#6b7280",
                            }}
                          >
                            Jarak (Km)
                          </TableCell>
                          <TableCell
                            align="center"
                            sx={{
                              fontWeight: 600,
                              borderBottom: "none",
                              color: "#6b7280",
                            }}
                          >
                            Waktu (Menit)
                          </TableCell>
                        </TableRow>
                      </TableHead>

                     <TableBody>
                      {loading ? (
                        <TableRow>
                          <TableCell colSpan={4} align="center">
                            <CircularProgress size={24} />
                          </TableCell>
                        </TableRow>
                      ) : currentData?.length > 0 ? (
                        currentData.map((seg, i) => (
                          <TableRow
                            key={i}
                            sx={{
                              backgroundColor: "#e0efef",
                              transition: "0.2s",
                              "&:hover": {
                                backgroundColor: "#cfe8e8",
                              },
                              "& td": {
                                borderBottom: "none",
                                py: 2,
                                color: "#111",
                              },
                              "& td:first-of-type": {
                                borderTopLeftRadius: 12,
                                borderBottomLeftRadius: 12,
                                fontWeight: 600,
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
                        ))
                      ) : (
                        <TableRow>
                          <TableCell colSpan={4} align="center">
                            Tidak ada data
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>

                    </Table>
                  </TableContainer>
                  {routeResult && (
                    <Box
                      mt={2}
                      display="flex"
                      justifyContent="space-between"
                      alignItems="center"
                    >
                      <Typography variant="body2" color="text.secondary">
                        Menampilkan {startDisplay} hingga {endDisplay} dari {totalData} entri
                      </Typography>

                    <Stack direction="row" spacing={1} alignItems="center">
                      {/* Prev */}
                      {page > 1 && (
                        <Box
                          onClick={() => setPage(page - 1)}
                          sx={paginationBtn}
                        >
                          {"<"}
                        </Box>
                      )}

                      {/* Page Numbers */}
                      {[...Array(totalPages)].map((_, index) => {
                        const pageNumber = index + 1;

                        if (
                          pageNumber === 1 ||
                          pageNumber === totalPages ||
                          (pageNumber >= page && pageNumber < page + 5)
                        ) {
                          return (
                            <Box
                              key={pageNumber}
                              onClick={() => setPage(pageNumber)}
                              sx={{
                                ...paginationBtn,
                                bgcolor: page === pageNumber ? "#689e9e" : "transparent",
                                color: page === pageNumber ? "white" : "black",
                              }}
                            >
                              {pageNumber}
                            </Box>
                          );
                        }

                        if (pageNumber === page + 5) {
                          return <Typography key={pageNumber}>...</Typography>;
                        }

                        return null;
                      })}

                      {/* Next */}
                      {page < totalPages && (
                        <Box
                          onClick={() => setPage(page + 1)}
                          sx={paginationBtn}
                        >
                          {">"}
                        </Box>
                      )}
                    </Stack>


                    </Box>
                  )}
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
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                {loading || !routeResult ? (
                  <CircularProgress />
                ) : (
                  <MapContainer
                    center={[
                      routeResult.segments[0].route[0][0],
                      routeResult.segments[0].route[0][1],
                    ]}
                    zoom={13}
                    style={{ height: "100%", width: "100%" }}
                    
                  >
                     <FullscreenControl />
                     <LayersControl position="topright">
                    {/* Normal Map */}
                    <BaseLayer checked name="Peta">
                      <TileLayer
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        attribution='&copy; OpenStreetMap contributors'
                      />
                    </BaseLayer>
                                  {/* Satellite */}
                    <BaseLayer name="Satelit">
                      <TileLayer
                        url="https://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}"
                        subdomains={["mt0", "mt1", "mt2", "mt3"]}
                      />
                    </BaseLayer>

                    {/* Hybrid */}
                    <BaseLayer name="Hybrid">
                      <TileLayer
                        url="https://{s}.google.com/vt/lyrs=y&x={x}&y={y}&z={z}"
                        subdomains={["mt0", "mt1", "mt2", "mt3"]}
                      />
                    </BaseLayer>
                  </LayersControl>

                    {routeResult.segments.map((seg, idx) => (
                      <Polyline
                        key={idx}
                        positions={seg.route.map(([lat, lon]) => [lat, lon])}
                        color="blue"
                      />
                    ))}

                   {routeResult.segments.map((seg, idx) => {
                    const isStartPoint = idx === 0;

                    return (
                      <Marker
                        key={`start-${idx}`}
                        position={seg.route[0]}
                        icon={
                          isStartPoint
                            ? new L.Icon.Default()   // LLDIKTI pakai marker biasa
                            : createNumberedIcon(idx) // mulai nomor dari 1
                        }
                      >
                        <Popup>
                          {isStartPoint ? "LLDIKTI" : `${idx}. ${seg.from}`}
                        </Popup>
                      </Marker>
                    );
                  })}


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
                )}
                </Box>
              </CardContent>
            </Card>
          </Stack>
        </Box>
      </Box>
    );
  }
