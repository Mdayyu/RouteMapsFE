import {
  Box,
  Drawer,
  IconButton,
  Typography,
  Divider,
  Button,
  Stack,
  Checkbox,
  TextField,
} from "@mui/material";
// import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import TwoWheelerIcon from "@mui/icons-material/TwoWheeler";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ClickAwayListener from "@mui/material/ClickAwayListener";


import { useState } from "react";

interface SidebarProps {
  open: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const campuses = [
  "Universitas Islam Indonesia (UII)",
  "Universitas Muhammadiyah Yogyakarta (UMY)",
  "Universitas Ahmad Dahlan (UAD)",
  "Universitas Sanata Dharma",
  "Universitas Atma Jaya Yogyakarta",
  "Universitas Kristen Duta Wacana (UKDW)",
  "Universitas AMIKOM Yogyakarta",
  "Universitas Mercu Buana Yogyakarta",
  "Universitas Widya Mataram",
  "Universitas Janabadra",
  "Universitas Cokroaminoto Yogyakarta",
  "Universitas Sarjanawiyata Tamansiswa",
  "Universitas Aisyiyah Yogyakarta",
  "Universitas Alma Ata",
  "Universitas PGRI Yogyakarta",
  "Universitas Teknologi Yogyakarta (UTY)",
  "Universitas Respati Yogyakarta",
  "Universitas Proklamasi 45",
  "Universitas Nahdlatul Ulama Yogyakarta",
  "Universitas Kristen Immanuel",
];


export function Sidebar({ open }: SidebarProps) {
  const [vehicle, setVehicle] = useState<"car" | "motor">("car");
  const [openCampus, setOpenCampus] = useState(false);
  const [selectedCampuses, setSelectedCampuses] = useState<string[]>([]);
  const [returnToStart, setReturnToStart] = useState(false);


  const toggleCampus = (campus: string) => {
    if (selectedCampuses.includes(campus)) {
      setSelectedCampuses(
        selectedCampuses.filter((c) => c !== campus)
      );
    } else {
      setSelectedCampuses([...selectedCampuses, campus]);
    }
  };

  const removeCampus = (campus: string) => {
    setSelectedCampuses(
      selectedCampuses.filter((c) => c !== campus)
    );
  };

  return (
    <>
  <Drawer
  variant="persistent"
  anchor="left"
  open={open}
  PaperProps={{
    sx: {
      width: 400,
      height: "100vh",
      bgcolor: "#cfe8e8",
      overflowY: "auto",
    },
  }}
>
      

        {/* LOGO */}
        <Box display="flex" justifyContent="center" mb={2} mt={2}>
          <Box component="img" src="/nameWeb.png" alt="Logo" sx={{ height: 60 }} />
        </Box>

        <Box sx={{ p: 2 }}>
          {/* Header */}
          <Stack direction="row" justifyContent="space-between">
            <Box>
              <Typography fontWeight="bold">
                Daftar Tujuan Kunjungan
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Pilih kampus yang akan dikunjungi
              </Typography>
            </Box>
          </Stack>

          <Divider sx={{ my: 2 }} />

        {/* TUJUAN KAMPUS */}
        <Typography fontWeight="bold" mb={1}>
          Tujuan Kampus
        </Typography>

        <Box sx={{ position: "relative" }}>
          {/* Button dropdown */}
          <Button
            variant="outlined"
            fullWidth
            size="small"
            onClick={() => setOpenCampus(!openCampus)}
            endIcon={openCampus ? <ExpandLessIcon /> : <ExpandMoreIcon />}
            sx={{
              justifyContent: "space-between",
            }}
          >
            Pilih Tujuan Kampus
          </Button>

          {/* Popup dropdown */}
        {openCampus && (
          <ClickAwayListener onClickAway={() => setOpenCampus(false)}>
            <Box
              sx={{
                position: "absolute",
                top: "110%",
                left: 0,
                width: "100%",
                bgcolor: "white",
                borderRadius: 2,
                boxShadow: 3,
                zIndex: 10,
                p: 1,

                /* ukuran & scroll */
                maxHeight: 200,
                overflowY: "auto",

                /* scroll styling */
                "&::-webkit-scrollbar": {
                  width: 6,
                },
                "&::-webkit-scrollbar-thumb": {
                  bgcolor: "#c1c1c1",
                  borderRadius: 3,
                },
              }}
            >
              {campuses.map((k) => (
                <Stack
                  key={k}
                  direction="row"
                  alignItems="center"
                  spacing={1}
                  sx={{
                    px: 1,
                    py: 0.5,
                    cursor: "pointer",
                    borderRadius: 1,
                    transition: "0.2s",
                    "&:hover": {
                      bgcolor: "#f5f5f5",
                    },
                  }}
                  onClick={() => toggleCampus(k)}
                >
                  <Checkbox
                    size="small"
                    checked={selectedCampuses.includes(k)}
                  />
                  <Typography variant="body2">{k}</Typography>
                </Stack>
              ))}
            </Box>
          </ClickAwayListener>
        )}

        </Box>

        {/* Selected campus */}
        <Stack spacing={1} mt={2}>
          {selectedCampuses.map((campus) => (
            <Stack
              key={campus}
              direction="row"
              spacing={1}
              alignItems="center"
            >
              <TextField
                size="small"
                fullWidth
                value={campus}
                disabled
              />
              <Button
                size="small"
                color="error"
                variant="contained"
                onClick={() => removeCampus(campus)}
              >
                Hapus
              </Button>
            </Stack>
          ))}
        </Stack>

          <Divider sx={{ my: 2 }} />

          {/* Kendaraan */}
          <Typography fontWeight="bold" mb={1}>
            Jenis Kendaraan
          </Typography>

          <Stack direction="row" spacing={2} mb={2}>
            <IconButton
              onClick={() => setVehicle("car")}
              sx={{
                bgcolor: vehicle === "car" ? "primary.main" : "white",
                color: vehicle === "car" ? "white" : "black",
              }}
            >
              <DirectionsCarIcon />
            </IconButton>

            <IconButton
              onClick={() => setVehicle("motor")}
              sx={{
                bgcolor: vehicle === "motor" ? "primary.main" : "white",
                color: vehicle === "motor" ? "white" : "black",
              }}
            >
              <TwoWheelerIcon />
            </IconButton>
          </Stack>
          
        <Stack direction="row" alignItems="center">
          <Checkbox
            size="small"
            checked={returnToStart}
            onChange={(e) => setReturnToStart(e.target.checked)}
          />
          <Typography variant="body2">
            Sertakan rute kembali ke titik awal
          </Typography>
        </Stack>

          <Divider sx={{ my: 2 }} />

          {/* Action */}
          <Stack direction="row" spacing={1}>
            <Button fullWidth variant="contained">
              Cari Rute
            </Button>
            <Button fullWidth variant="outlined" color="error">
              Reset
            </Button>
          </Stack>
        </Box>
      </Drawer>
    </>
  );
}
