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
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import LoadingButton from "@mui/lab/LoadingButton";
import { useTheme, useMediaQuery } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";







interface SidebarProps {
  open: boolean;
  onClose: () => void;
}


// const campuses = [
//   "Universitas Islam Indonesia (UII)",
//   "Universitas Muhammadiyah Yogyakarta (UMY)",
//   "Universitas Ahmad Dahlan (UAD)",
//   "Universitas Sanata Dharma",
//   "Universitas Atma Jaya Yogyakarta",
//   "Universitas Kristen Duta Wacana (UKDW)",
//   "Universitas AMIKOM Yogyakarta",
//   "Universitas Mercu Buana Yogyakarta",
//   "Universitas Widya Mataram",
//   "Universitas Janabadra",
//   "Universitas Cokroaminoto Yogyakarta",
//   "Universitas Sarjanawiyata Tamansiswa",
//   "Universitas Aisyiyah Yogyakarta",
//   "Universitas Alma Ata",
//   "Universitas PGRI Yogyakarta",
//   "Universitas Teknologi Yogyakarta (UTY)",
//   "Universitas Respati Yogyakarta",
//   "Universitas Proklamasi 45",
//   "Universitas Nahdlatul Ulama Yogyakarta",
//   "Universitas Kristen Immanuel",
// ];


export function Sidebar({ open, onClose }: SidebarProps){
  const [vehicle, setVehicle] = useState<"car" | "motor">("car");
  const [openCampus, setOpenCampus] = useState(false);
  const [selectedCampuses, setSelectedCampuses] = useState<string[]>([]);
  const [returnToStart, setReturnToStart] = useState(false);
  const navigate = useNavigate();
  const [campuses, setCampuses] = useState<{ key: string; lat: number; lon: number }[]>([]);
  const [loading, setLoading] = useState(false);
  const theme = useTheme();
  // const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isMobile = useMediaQuery("(max-width:600px)");
   // HP
  const isTablet = useMediaQuery(theme.breakpoints.down("md"));   // Tablet
  


  

 const handleCariRute = async () => {
  if (selectedCampuses.length === 0) {
    alert("Pilih minimal satu kampus tujuan");
    return;
  }

  setLoading(true);

  // kasih delay kecil biar efek loading terlihat (opsional)
  setTimeout(() => {
    navigate("/route", {
      state: { campuses: selectedCampuses, vehicle, returnToStart },
    });
  }, 800);
};




useEffect(() => {
  fetch("http://127.0.0.1:8000/campuses")
    .then((res) => res.json())
    .then((data) => setCampuses(data))
    .catch((err) => console.error("Failed to fetch campuses", err));
}, []);






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

  const handleReset = () => {
  setLoading(true);

  setTimeout(() => {
    setSelectedCampuses([]);
    setVehicle("car");
    setReturnToStart(false);
    setOpenCampus(false);
    setLoading(false);
  }, 800);
};



  return (
    <>
 <Drawer
  variant={isTablet ? "temporary" : isMobile ? "temporary": "persistent"}
  anchor="left"
  open={open}
  onClose={onClose}
  ModalProps={{
    keepMounted: true,
  }}
  PaperProps={{
    sx: {
      width: isMobile ? "100%" : 400,
      height: "100%",
      bgcolor: "#cfe8e8",
      overflowY: "auto",
    },
  }}
>

      

        {/* LOGO */}
        <Box
  display="flex"
  alignItems="center"
  justifyContent={isMobile ? "space-between" : "center"}
  px={2}
  mb={2}
  mt={2}
>
  {isMobile && (
    <IconButton onClick={onClose}>
      <CloseIcon />
    </IconButton>
  )}

  <Box
    component="img"
    src="/nameWeb.png"
    alt="Logo"
    sx={{ height: 60 }}
  />

  {/* Spacer agar logo tetap tengah saat mobile */}
  {isMobile && <Box sx={{ width: 40 }} />}
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
              outline: "none",
              "&:focus": {
                outline: "none",
              },
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
              {campuses.map((campus) => (
  <Stack
    key={campus.key}
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
    onClick={() => toggleCampus(campus.key)}
  >
    <Checkbox size="small" checked={selectedCampuses.includes(campus.key)} />
    <Typography variant="body2">{campus.key}</Typography>
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
                sx={{
                    outline: "none",
                    "&:focus": {
                      outline: "none",
                    },
                  }}
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
                 outline: "none",
                "&:focus": {
                  outline: "none",
                },
              }}
            >
              <DirectionsCarIcon />
            </IconButton>

            <IconButton
              onClick={() => setVehicle("motor")}
              sx={{
                bgcolor: vehicle === "motor" ? "primary.main" : "white",
                color: vehicle === "motor" ? "white" : "black",
                outline: "none",
                "&:focus": {
                  outline: "none",
                },
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
            <LoadingButton
                fullWidth
                variant="contained"
                onClick={handleCariRute}
                loading={loading}
                disabled={selectedCampuses.length === 0}
                sx={{
                  outline: "none",
                  "&:focus": {
                    outline: "none",
                  },
                }}
              >
                Cari Rute
              </LoadingButton>
            <Button 
            fullWidth 
            variant="contained" 
            color="error" 
            onClick={handleReset} 
            disabled={selectedCampuses.length === 0}
            sx={{
                outline: "none",
                "&:focus": {
                  outline: "none",
                },
              }}
              >
              Reset
            </Button>
          </Stack>
        </Box>
      </Drawer>
    </>
  );
}
