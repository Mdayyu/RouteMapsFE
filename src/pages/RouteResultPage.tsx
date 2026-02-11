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
  import { CircularProgress } from "@mui/material";


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



    useEffect(() => {
  if (!routeParams) return;

  let isMounted = true;

  const fetchData = async () => {
    try {
      if (isMounted) setLoading(true);

      const res = await fetch("http://127.0.0.1:8000/route", {
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
}, [routeParams]);


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
                      {loading || !routeResult ? (
                        <CircularProgress size={20} />
                      ) : (
                        `${routeResult.total_distance_km.toFixed(2)} km`
                      )}

                    </Typography>
                  </Box>

                  <Box>
                    <Typography variant="body2" color="text.secondary">
                      Total Waktu Tempuh
                    </Typography>
                    <Typography variant="h6" fontWeight={700}>
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
                )}
                </Box>
              </CardContent>
            </Card>
          </Stack>
        </Box>
      </Box>
    );
  }
