import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
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
import { useState } from "react";
import MapIcon from "@mui/icons-material/Map";

import { Navbar } from "../layout/Navbar";
import { Sidebar } from "../layout/Sidebar";



export default function RouteResultPage() {
   const [openSidebar, setOpenSidebar] = useState(false);
  const [showDetail, setShowDetail] = useState(false); // detail tabel

  return (
     <Box sx={{ width: "100vw", height: "100vh", color: "black"}}>

    <Navbar
      onMenuClick={() => setOpenSidebar(!openSidebar)}
      sidebarOpen={openSidebar}
    />

    <Sidebar
        open={openSidebar}
        onClose={() => setOpenSidebar(false)} onOpen={function (): void {
          throw new Error("Function not implemented.");
        } }    />

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

          <Stack spacing={4} >
            {/* RINGKASAN */}
            <Card  
            sx={{
                borderRadius: 3,
                 width: "90%",     
                mx: "auto",        
              }}>
                <CardContent sx={{ px: 3, py: 2 }}>
                <Box
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                  mb={2}
                >
                  <Typography fontWeight={600}>
                    Ringkasan Kunjungan
                  </Typography>
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
                      24 km
                    </Typography>
                  </Box>

                  <Box>
                    <Typography variant="body2" color="text.secondary">
                      Total Waktu Tempuh
                    </Typography>
                    <Typography variant="h6" fontWeight={700}>
                      2 jam 24 menit
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
                        {[
                          { from: "LLDIKTI", to: "UAJY", dist: 7, time: 30 },
                          { from: "UAJY", to: "USD", dist: 7, time: 30 },
                          { from: "USD", to: "UMY", dist: 7, time: 30 },
                          { from: "UMY", to: "UII", dist: 7, time: 30 },
                          { from: "UII", to: "LLDIKTI", dist: 7, time: 30 },
                        ].map((row, i) => (
                          <TableRow
                            key={i}
                            sx={{
                              backgroundColor:
                                i % 2 === 0 ? "#f2f4f7" : "#ffffff",
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
                            <TableCell>{row.from}</TableCell>
                            <TableCell>{row.to}</TableCell>
                            <TableCell align="center">{row.dist} KM</TableCell>
                            <TableCell align="center">
                              {row.time} menit
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
              }}>
              <CardContent>
                <Box
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                  mb={2}
                >
                  <Typography fontWeight={600}>Lihat Maps</Typography>
                  <Button
                    size="small"
                    variant="outlined"
                    startIcon={<MapIcon />}
                  >
                    Buka 
                  </Button>
                </Box>

                <Box
                  sx={{
                    height: 320,
                    borderRadius: 2,
                    bgcolor: "#e0e0e0",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Typography color="text.secondary">
                    Map hasil rute ditampilkan di sini
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Stack>
        </Box>
      </Box>
  );
}
